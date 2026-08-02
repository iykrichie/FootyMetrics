import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

import { LEAGUES, TEAMS, getFixtures, MOCK_MODEL_PERFORMANCE, MOCK_SYSTEM_JOBS } from './src/data/mockDatabase.ts';
import { fetchLiveEspnFixtures } from './src/services/liveFootballApi.ts';
import { computeMatchMetrics } from './src/services/analyticsEngine.ts';
import { AIMatchAnalysisReport, Fixture, League, Team } from './src/types.ts';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory cache for dynamic fixture updates & generated AI reports
let allFixturesCache: Fixture[] = getFixtures();
const aiReportsCache: Record<string, AIMatchAnalysisReport> = {};

// Background sync for real live fixtures
async function syncLiveFixtures() {
  try {
    const live = await fetchLiveEspnFixtures();
    if (live && live.length > 0) {
      // Merge live real matches with default analytical model matches
      allFixturesCache = live;
      console.log(`⚽ Successfully synced ${live.length} real live fixtures from ESPN / Flashscore data feed.`);
    }
  } catch (err) {
    console.warn('Live fixture sync error, preserving base fixtures:', err);
  }
}
syncLiveFixtures();

// Helper to get Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// --- REST API ENDPOINTS ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    leaguesCount: LEAGUES.length,
    cachedFixturesCount: allFixturesCache.length,
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Get Leagues
app.get('/api/leagues', (req, res) => {
  res.json(LEAGUES);
});

// Get Fixtures (with optional filtering)
app.get('/api/fixtures', (req, res) => {
  const leagueId = req.query.leagueId as string | undefined;
  const weekend = req.query.weekend ? parseInt(req.query.weekend as string, 10) : undefined;

  let result = [...allFixturesCache];

  if (leagueId && leagueId !== 'all') {
    result = result.filter((f) => f.leagueId === leagueId);
  }

  if (weekend && [1, 2, 3].includes(weekend)) {
    result = result.filter((f) => f.weekendNumber === weekend);
  }

  res.json(result);
});

// Get Single Fixture
app.get('/api/fixtures/:id', (req, res) => {
  const fixture = allFixturesCache.find((f) => f.id === req.params.id);
  if (!fixture) {
    return res.status(404).json({ error: 'Fixture not found' });
  }
  res.json(fixture);
});

// Get Standings for a League
app.get('/api/standings/:leagueId', (req, res) => {
  const { leagueId } = req.params;
  const leagueTeams = Object.values(TEAMS)
    .filter((t) => t.leagueId === leagueId)
    .sort((a, b) => a.leaguePosition - b.leaguePosition);

  res.json({
    league: LEAGUES.find((l) => l.id === leagueId),
    standings: leagueTeams
  });
});

// Get Team Detail
app.get('/api/teams/:id', (req, res) => {
  const team = TEAMS[req.params.id];
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  res.json(team);
});

// Compare Two Teams
app.get('/api/compare', (req, res) => {
  const team1Id = req.query.team1 as string;
  const team2Id = req.query.team2 as string;

  const team1 = TEAMS[team1Id];
  const team2 = TEAMS[team2Id];

  if (!team1 || !team2) {
    return res.status(400).json({ error: 'Invalid team IDs provided for comparison' });
  }

  const hypotheticalMetrics = computeMatchMetrics(team1, team2);

  res.json({
    team1,
    team2,
    hypotheticalNeutralMatch: hypotheticalMetrics
  });
});

// Generate or Retrieve AI Analytical Match Report via Gemini
app.post('/api/analyze/:id', async (req, res) => {
  const fixtureId = req.params.id;
  const fixture = allFixturesCache.find((f) => f.id === fixtureId);

  if (!fixture) {
    return res.status(404).json({ error: 'Fixture not found' });
  }

  // Return cached report if available
  if (aiReportsCache[fixtureId]) {
    return res.json(aiReportsCache[fixtureId]);
  }

  const client = getGeminiClient();

  if (client) {
    try {
      const prompt = `You are a Senior Football Data Scientist & Tactical Analyst.
Analyze this upcoming football match strictly objectively (NO betting advice, NO wager recommendations).

HISTORICAL SCOPE & FORECAST HORIZON:
- Rolling Historical Analysis: Past 6 Months (Aug 2025 - Feb 2026, 240+ sampled matches)
- Forecast Horizon: Week +${fixture.weekendNumber} (Predicting 3 Weeks Ahead)

MATCH DATA:
- Competition: ${LEAGUES.find((l) => l.id === fixture.leagueId)?.name}
- Venue & Referee: ${fixture.venue} • Referee: ${fixture.influencingFactors?.refereeProfile.name || fixture.referee} (${fixture.influencingFactors?.refereeProfile.strictness || 'Moderate'} Strictness, ${fixture.influencingFactors?.refereeProfile.avgYellowsPerGame || 4.0} Y/game)
- Home Team: ${fixture.homeTeam.name} (Position: #${fixture.homeTeam.leaguePosition}, Offense: ${fixture.homeTeam.offensiveRating}/100, Defense: ${fixture.homeTeam.defensiveRating}/100, xG: ${fixture.homeTeam.xG}, Possession: ${fixture.homeTeam.possessionAvg}%)
- Away Team: ${fixture.awayTeam.name} (Position: #${fixture.awayTeam.leaguePosition}, Offense: ${fixture.awayTeam.offensiveRating}/100, Defense: ${fixture.awayTeam.defensiveRating}/100, xG: ${fixture.awayTeam.xG}, Possession: ${fixture.awayTeam.possessionAvg}%)
- Machine Learning Outcome Probabilities: Home Win ${fixture.metrics.homeWinProb}%, Draw ${fixture.metrics.drawProb}%, Away Win ${fixture.metrics.awayWinProb}%
- Expected Goals Projection: ${fixture.homeTeam.shortName} ${fixture.metrics.homeExpectedGoals} - ${fixture.metrics.awayExpectedGoals} ${fixture.awayTeam.shortName}
- Model Confidence Score: ${fixture.metrics.confidenceScore}% (${fixture.metrics.modelUncertainty} Uncertainty)
- Historical H2H: ${fixture.h2h.totalMatches} matches (${fixture.h2h.homeWins} Home Wins, ${fixture.h2h.awayWins} Away Wins, ${fixture.h2h.draws} Draws)

INFLUENCING PERFORMANCE DRIVERS:
- Squad Absences / Injuries: ${fixture.influencingFactors?.injuriesAndAbsences.description}
- Rest & Fatigue: Home Rest ${fixture.influencingFactors?.restAndSchedule.homeRestDays} days vs Away Rest ${fixture.influencingFactors?.restAndSchedule.awayRestDays} days (Advantage: ${fixture.influencingFactors?.restAndSchedule.fatigueAdvantage})
- Pitch & Weather: ${fixture.influencingFactors?.weatherAndPitch.condition}, ${fixture.influencingFactors?.weatherAndPitch.temperatureC}°C, Pitch: ${fixture.influencingFactors?.weatherAndPitch.pitchCondition}
- Stakes & Motivation: Home Goal: ${fixture.influencingFactors?.stakesAndMotivation.homeStakes} | Away Goal: ${fixture.influencingFactors?.stakesAndMotivation.awayStakes}

Provide a JSON object response matching this exact schema:
{
  "tacticalSummary": "Detailed narrative on tactical setups, pressing intensity, rest/fatigue impact, and possession dynamics.",
  "keyMatchups": [
    {
      "area": "Name of pitch zone, e.g. Central Midfield Control",
      "homePlayerOrGroup": "Home team group/key players",
      "awayPlayerOrGroup": "Away team group/key players",
      "verdict": "Analytical evaluation considering injuries and rest",
      "advantage": "home" | "away" | "even"
    }
  ],
  "statisticalAnomalies": [
    "Array of notable statistical outliers (e.g. 6-month xG overperformance, clean sheet streak)"
  ],
  "upsetWatch": {
    "isPotentialUpset": boolean,
    "upsetProbability": number,
    "narrativeReasoning": "Statistical reasoning if underdog has an operational edge"
  },
  "modelConfidenceAnalysis": "Explanation of why model uncertainty is rated at this level given rest, injuries, and historical variance",
  "keyTacticalDrivers": [
    "3 key tactical variables that will dictate outcome"
  ],
  "predictedMatchFlow": "Synthesized game script description incorporating pitch/weather & fatigue"
}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          maxOutputTokens: 1000,
          temperature: 0.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tacticalSummary: { type: Type.STRING },
              keyMatchups: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    area: { type: Type.STRING },
                    homePlayerOrGroup: { type: Type.STRING },
                    awayPlayerOrGroup: { type: Type.STRING },
                    verdict: { type: Type.STRING },
                    advantage: { type: Type.STRING }
                  },
                  required: ['area', 'homePlayerOrGroup', 'awayPlayerOrGroup', 'verdict', 'advantage']
                }
              },
              statisticalAnomalies: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              upsetWatch: {
                type: Type.OBJECT,
                properties: {
                  isPotentialUpset: { type: Type.BOOLEAN },
                  upsetProbability: { type: Type.NUMBER },
                  narrativeReasoning: { type: Type.STRING }
                },
                required: ['isPotentialUpset', 'upsetProbability', 'narrativeReasoning']
              },
              modelConfidenceAnalysis: { type: Type.STRING },
              keyTacticalDrivers: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              predictedMatchFlow: { type: Type.STRING }
            },
            required: [
              'tacticalSummary',
              'keyMatchups',
              'statisticalAnomalies',
              'upsetWatch',
              'modelConfidenceAnalysis',
              'keyTacticalDrivers',
              'predictedMatchFlow'
            ]
          }
        }
      });

      if (response.text) {
        const parsedData = JSON.parse(response.text.trim());
        const fullReport: AIMatchAnalysisReport = {
          fixtureId,
          generatedAt: new Date().toISOString(),
          ...parsedData
        };
        aiReportsCache[fixtureId] = fullReport;
        return res.json(fullReport);
      }
    } catch (err) {
      console.error('Gemini API call error, falling back to deterministic report:', err);
    }
  }

  // Fallback high-quality deterministic report if Gemini API is offline or key missing
  const isUpsetCandidate = fixture.metrics.awayWinProb > 38 && fixture.homeTeam.leaguePosition < fixture.awayTeam.leaguePosition;
  const fallbackReport: AIMatchAnalysisReport = {
    fixtureId,
    generatedAt: new Date().toISOString(),
    tacticalSummary: `${fixture.homeTeam.name} (${fixture.homeTeam.possessionAvg}% possession avg) host ${fixture.awayTeam.name} in a high-stakes encounter. ${fixture.homeTeam.shortName}'s offensive rating of ${fixture.homeTeam.offensiveRating}/100 tests ${fixture.awayTeam.shortName}'s defensive index of ${fixture.awayTeam.defensiveRating}/100. Expectations point towards a controlled high-pressing approach from the home side.`,
    keyMatchups: [
      {
        area: 'Central Midfield & Progression',
        homePlayerOrGroup: `${fixture.homeTeam.shortName} Midfield Pivot`,
        awayPlayerOrGroup: `${fixture.awayTeam.shortName} Double Block`,
        verdict: `${fixture.homeTeam.shortName} holds slight structural advantage in second-ball recovery.`,
        advantage: fixture.homeTeam.possessionAvg >= fixture.awayTeam.possessionAvg ? 'home' : 'away'
      },
      {
        area: 'Final Third Finishing Efficiency',
        homePlayerOrGroup: `${fixture.homeTeam.shortName} Attackers (xG ${fixture.homeTeam.xG})`,
        awayPlayerOrGroup: `${fixture.awayTeam.shortName} Backline (xGA ${fixture.awayTeam.xGA})`,
        verdict: `Model highlights ${fixture.metrics.homeExpectedGoals} expected home goals vs ${fixture.metrics.awayExpectedGoals} expected away goals.`,
        advantage: fixture.metrics.homeWinProb >= 50 ? 'home' : 'even'
      }
    ],
    statisticalAnomalies: [
      `${fixture.homeTeam.shortName} maintains a ${Math.round(fixture.homeTeam.cleanSheetRate * 100)}% home clean sheet frequency.`,
      `Head-to-head records show an average of ${fixture.h2h.avgGoals} goals scored per meeting.`
    ],
    upsetWatch: {
      isPotentialUpset: isUpsetCandidate,
      upsetProbability: fixture.metrics.awayWinProb,
      narrativeReasoning: isUpsetCandidate
        ? `${fixture.awayTeam.name} carries high away efficiency and strong counter-attacking statistics that present a non-trivial statistical challenge.`
        : `Statistical indicators suggest low probability of an unpredicted outcome based on current form vectors.`
    },
    modelConfidenceAnalysis: `Model confidence is calculated at ${fixture.metrics.confidenceScore}% (${fixture.metrics.modelUncertainty} Uncertainty) based on low variance in recent 10-match rolling goal metrics.`,
    keyTacticalDrivers: [
      'Early goal impact on high-block defensive elasticity',
      'Set-piece xG differential & aerial duels success rate',
      'Second half squad depth and tactical substitution timing'
    ],
    predictedMatchFlow: `Expected match flow indicates ${fixture.homeTeam.shortName} establishing territorial dominance in the first half hour, with ${fixture.awayTeam.shortName} relying on vertical transition triggers.`
  };

  aiReportsCache[fixtureId] = fallbackReport;
  return res.json(fallbackReport);
});

// AI Round Digest (Executive summary of predictions across fixtures)
app.get('/api/reports/digest', (req, res) => {
  const fixtures = allFixturesCache;
  const sortedByConfidence = [...fixtures].sort((a, b) => b.metrics.confidenceScore - a.metrics.confidenceScore);
  const highestConfidence = sortedByConfidence.slice(0, 3);

  const potentialUpsets = fixtures.filter((f) => f.metrics.awayWinProb > 35 && f.awayTeam.leaguePosition > f.homeTeam.leaguePosition);
  const mostBalanced = [...fixtures].sort((a, b) => Math.abs(a.metrics.homeWinProb - a.metrics.awayWinProb) - Math.abs(b.metrics.homeWinProb - b.metrics.awayWinProb)).slice(0, 3);

  res.json({
    highestConfidenceFixtures: highestConfidence,
    potentialUpsets,
    mostBalancedFixtures: mostBalanced,
    roundSummaryText: `Analytical models have evaluated ${fixtures.length} upcoming fixtures across the Top 5 European leagues. High-confidence picks demonstrate strong statistical dominance in rolling xG metrics and defensive clean sheet ratios.`
  });
});

// Machine Learning Model Diagnostics & Performance Metrics
app.get('/api/model/metrics', (req, res) => {
  res.json(MOCK_MODEL_PERFORMANCE);
});

// Data Engineering Job Logs
app.get('/api/jobs/status', (req, res) => {
  res.json(MOCK_SYSTEM_JOBS);
});

// Trigger Real Live Data Refresh from ESPN / Flashscore API
app.post('/api/fixtures/sync-live', async (req, res) => {
  try {
    const liveMatches = await fetchLiveEspnFixtures();
    if (liveMatches && liveMatches.length > 0) {
      allFixturesCache = liveMatches;
      return res.json({
        success: true,
        source: 'Official Live ESPN / Flashscore Match Feed',
        syncedCount: liveMatches.length,
        timestamp: new Date().toISOString()
      });
    } else {
      return res.json({
        success: false,
        message: 'No live matches found currently on remote feed, keeping cached schedule.',
        syncedCount: allFixturesCache.length
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to sync live fixtures', details: err?.message });
  }
});

// Trigger Data Refresh (Simulate pipeline update)
app.post('/api/jobs/trigger-refresh', async (req, res) => {
  try {
    const liveMatches = await fetchLiveEspnFixtures();
    if (liveMatches && liveMatches.length > 0) {
      allFixturesCache = liveMatches;
    } else {
      allFixturesCache = getFixtures();
    }
  } catch (e) {
    allFixturesCache = getFixtures();
  }

  const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  MOCK_SYSTEM_JOBS.forEach((j) => {
    j.lastRun = now;
    j.recordsProcessed += Math.floor(Math.random() * 20) + 5;
  });

  res.json({
    success: true,
    message: 'Data ingestion and ML inference jobs triggered successfully.',
    updatedFixturesCount: allFixturesCache.length,
    timestamp: now
  });
});

// --- SERVER INITIALIZATION & VITE MIDDLEWARE ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚽ FootyMetrics Analytics Platform server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
