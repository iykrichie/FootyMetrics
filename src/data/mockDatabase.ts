import { buildFixtureInfluencingFactors, computeMatchMetrics } from '../services/analyticsEngine';
import { Fixture, H2HSummary, League, ModelPerformanceMetrics, SystemJobLog, Team } from '../types';
import { TEAMS as COMPREHENSIVE_TEAMS, getSafeTeam } from './teamsData';
import { getRawFixturesSchedule } from './fixturesSchedule';
import { REAL_H2H_DATABASE } from './realH2HData';

export const LEAGUES: League[] = [
  {
    id: 'epl',
    name: 'Premier League',
    code: 'EPL',
    country: 'England',
    flag: '🇬🇧',
    badge: '🏆',
    teamCount: 20,
    matchesAnalyzed: 380,
    averageGoals: 2.84,
    season: '2025/2026'
  },
  {
    id: 'laliga',
    name: 'La Liga EA Sports',
    code: 'LIGA',
    country: 'Spain',
    flag: '🇪🇸',
    badge: '⚽',
    teamCount: 20,
    matchesAnalyzed: 380,
    averageGoals: 2.62,
    season: '2025/2026'
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    code: 'BL',
    country: 'Germany',
    flag: '🇩🇪',
    badge: '🛡️',
    teamCount: 18,
    matchesAnalyzed: 306,
    averageGoals: 3.12,
    season: '2025/2026'
  },
  {
    id: 'seriea',
    name: 'Serie A Enilive',
    code: 'SA',
    country: 'Italy',
    flag: '🇮🇹',
    badge: '🇮🇹',
    teamCount: 20,
    matchesAnalyzed: 380,
    averageGoals: 2.58,
    season: '2025/2026'
  },
  {
    id: 'ligue1',
    name: 'Ligue 1 McDonald\'s',
    code: 'L1',
    country: 'France',
    flag: '🇫🇷',
    badge: '🐓',
    teamCount: 18,
    matchesAnalyzed: 306,
    averageGoals: 2.71,
    season: '2025/2026'
  },
  {
    id: 'eredivisie',
    name: 'Eredivisie',
    code: 'ERE',
    country: 'Netherlands',
    flag: '🇳🇱',
    badge: '🦁',
    teamCount: 18,
    matchesAnalyzed: 306,
    averageGoals: 3.15,
    season: '2025/2026'
  },
  {
    id: 'ligaportugal',
    name: 'Liga Portugal Betclic',
    code: 'LP',
    country: 'Portugal',
    flag: '🇵🇹',
    badge: '🛡️',
    teamCount: 18,
    matchesAnalyzed: 306,
    averageGoals: 2.78,
    season: '2025/2026'
  }
];

export const TEAMS: Record<string, Team> = COMPREHENSIVE_TEAMS;

// Head to Head records
export const MOCK_H2H: Record<string, H2HSummary> = {
  ...REAL_H2H_DATABASE,
  'new_mci': {
    totalMatches: 10,
    homeWins: 1,
    awayWins: 7,
    draws: 2,
    avgGoals: 3.1,
    recentMeetings: [
      { id: '1', date: '2026-01-13', competition: 'Premier League', homeTeamName: 'Newcastle', awayTeamName: 'Man City', homeGoals: 2, awayGoals: 3 },
      { id: '2', date: '2025-09-28', competition: 'Premier League', homeTeamName: 'Newcastle', awayTeamName: 'Man City', homeGoals: 1, awayGoals: 1 }
    ]
  },
  'bay_lev': {
    totalMatches: 10,
    homeWins: 4,
    awayWins: 3,
    draws: 3,
    avgGoals: 3.4,
    recentMeetings: [
      { id: '1', date: '2026-02-10', competition: 'Bundesliga', homeTeamName: 'Leverkusen', awayTeamName: 'Bayern', homeGoals: 3, awayGoals: 0 },
      { id: '2', date: '2025-09-28', competition: 'Bundesliga', homeTeamName: 'Bayern', awayTeamName: 'Leverkusen', homeGoals: 1, awayGoals: 1 }
    ]
  },
  'atm_rma': {
    totalMatches: 12,
    homeWins: 4,
    awayWins: 5,
    draws: 3,
    avgGoals: 2.8,
    recentMeetings: [
      { id: '1', date: '2026-02-04', competition: 'La Liga', homeTeamName: 'Real Madrid', awayTeamName: 'Atlético', homeGoals: 1, awayGoals: 1 },
      { id: '2', date: '2025-09-29', competition: 'La Liga', homeTeamName: 'Atlético', awayTeamName: 'Real Madrid', homeGoals: 1, awayGoals: 1 }
    ]
  },
  'mun_tot': {
    totalMatches: 10,
    homeWins: 4,
    awayWins: 4,
    draws: 2,
    avgGoals: 3.2,
    recentMeetings: [
      { id: '1', date: '2026-01-14', competition: 'Premier League', homeTeamName: 'Man United', awayTeamName: 'Tottenham', homeGoals: 2, awayGoals: 2 },
      { id: '2', date: '2025-08-19', competition: 'Premier League', homeTeamName: 'Tottenham', awayTeamName: 'Man United', homeGoals: 2, awayGoals: 0 }
    ]
  },
  'liv_che': {
    totalMatches: 12,
    homeWins: 4,
    awayWins: 2,
    draws: 6,
    avgGoals: 2.4,
    recentMeetings: [
      { id: '1', date: '2026-02-25', competition: 'Carabao Cup Final', homeTeamName: 'Chelsea', awayTeamName: 'Liverpool', homeGoals: 0, awayGoals: 1 },
      { id: '2', date: '2026-01-31', competition: 'Premier League', homeTeamName: 'Liverpool', awayTeamName: 'Chelsea', homeGoals: 4, awayGoals: 1 }
    ]
  },
  'ars_mci': {
    totalMatches: 10,
    homeWins: 4,
    awayWins: 4,
    draws: 2,
    avgGoals: 2.7,
    recentMeetings: [
      { id: '1', date: '2026-03-15', competition: 'Premier League', homeTeamName: 'Arsenal', awayTeamName: 'Man City', homeGoals: 2, awayGoals: 1 },
      { id: '2', date: '2025-09-22', competition: 'Premier League', homeTeamName: 'Man City', awayTeamName: 'Arsenal', homeGoals: 2, awayGoals: 2 }
    ]
  },
  'rma_bar': {
    totalMatches: 12,
    homeWins: 6,
    awayWins: 4,
    draws: 2,
    avgGoals: 3.4,
    recentMeetings: [
      { id: '1', date: '2026-04-21', competition: 'La Liga', homeTeamName: 'Real Madrid', awayTeamName: 'Barcelona', homeGoals: 3, awayGoals: 2 },
      { id: '2', date: '2025-10-28', competition: 'La Liga', homeTeamName: 'Barcelona', awayTeamName: 'Real Madrid', homeGoals: 1, awayGoals: 2 }
    ]
  }
};

// Generate Fixtures for 3 Weekly Cycles strictly Monday - Sunday:
// Monday = D0, Sunday = D7
export function getFixtures(): Fixture[] {
  const rawFixtures = getRawFixturesSchedule();

  return rawFixtures.map((rf) => {
    const homeTeam = getSafeTeam(rf.homeTeamId, rf.leagueId);
    const awayTeam = getSafeTeam(rf.awayTeamId, rf.leagueId);
    const h2hKey = `${rf.homeTeamId}_${rf.awayTeamId}`;
    const h2hAltKey = `${rf.awayTeamId}_${rf.homeTeamId}`;
    const h2h = MOCK_H2H[h2hKey] || MOCK_H2H[h2hAltKey] || {
      totalMatches: 6,
      homeWins: 2,
      awayWins: 2,
      draws: 2,
      avgGoals: 2.5,
      recentMeetings: [
        {
          id: `h2h_${rf.id}_1`,
          date: '2025-12-10',
          competition: LEAGUES.find(l => l.id === rf.leagueId)?.name || 'League',
          homeTeamName: homeTeam.name,
          awayTeamName: awayTeam.name,
          homeGoals: 1,
          awayGoals: 1
        }
      ]
    };

    const metrics = computeMatchMetrics(homeTeam, awayTeam, h2h, rf.weekendNumber);
    const influencingFactors = buildFixtureInfluencingFactors(homeTeam, awayTeam, rf.weekendNumber);

    return {
      id: rf.id,
      leagueId: rf.leagueId,
      weekendNumber: rf.weekendNumber,
      kickoffDate: rf.kickoffDate,
      kickoffTime: rf.kickoffTime,
      venue: rf.venue,
      referee: rf.referee,
      round: rf.round,
      isOfficialFixture: rf.isOfficialFixture,
      source: rf.source,
      homeTeamId: rf.homeTeamId,
      awayTeamId: rf.awayTeamId,
      homeTeam,
      awayTeam,
      h2h,
      metrics,
      influencingFactors,
      status: 'upcoming' as const
    };
  });
}

export const MOCK_MODEL_PERFORMANCE: ModelPerformanceMetrics = {
  modelName: 'DixonColes-XGBoost Hybrid Ensemble v4.2',
  lastRetrained: '2026-08-01 04:00 UTC',
  accuracy: 69.4,
  logLoss: 0.842,
  brierScore: 0.178,
  calibrationScore: 0.952,
  testedMatchesCount: 4850,
  featureImportances: [
    { feature: 'Rolling 10-Match Form Index', importance: 0.24 },
    { feature: 'Expected Goals (xG vs xGA) Differential', importance: 0.21 },
    { feature: 'Home Advantage / Venue Modifier', importance: 0.16 },
    { feature: 'Head-to-Head 5-Match History', importance: 0.14 },
    { feature: 'Defensive Clean Sheet & Efficiency Rate', importance: 0.13 },
    { feature: 'Rest Days & Squad Rotation Factor', importance: 0.08 },
    { feature: 'Referee & Disciplinary Trends', importance: 0.04 }
  ],
  calibrationPoints: [
    { predictedProb: 10, actualFreq: 9.8 },
    { predictedProb: 20, actualFreq: 21.2 },
    { predictedProb: 30, actualFreq: 29.5 },
    { predictedProb: 40, actualFreq: 41.1 },
    { predictedProb: 50, actualFreq: 49.8 },
    { predictedProb: 60, actualFreq: 61.4 },
    { predictedProb: 70, actualFreq: 68.9 },
    { predictedProb: 80, actualFreq: 81.3 },
    { predictedProb: 90, actualFreq: 89.1 }
  ],
  historicalAccuracyBySeason: [
    { season: '2022/2023', accuracy: 66.2, brierScore: 0.194 },
    { season: '2023/2024', accuracy: 67.8, brierScore: 0.187 },
    { season: '2024/2025', accuracy: 68.5, brierScore: 0.181 },
    { season: '2025/2026 (YTD)', accuracy: 69.4, brierScore: 0.178 }
  ]
};

export const MOCK_SYSTEM_JOBS: SystemJobLog[] = [
  {
    jobId: 'job-01-fixtures',
    name: 'Football Data Ingestion Pipeline (Top 5 Leagues)',
    lastRun: '2026-08-02 06:00 UTC',
    status: 'SUCCESS',
    recordsProcessed: 1820,
    executionTimeMs: 1240,
    nextScheduledRun: '2026-08-02 12:00 UTC'
  },
  {
    jobId: 'job-02-xg-metrics',
    name: 'Rolling xG / xGA & Form Re-calculation',
    lastRun: '2026-08-02 06:01 UTC',
    status: 'SUCCESS',
    recordsProcessed: 98,
    executionTimeMs: 820,
    nextScheduledRun: '2026-08-02 12:01 UTC'
  },
  {
    jobId: 'job-03-ml-inference',
    name: 'Poisson Dixon-Coles Monte Carlo Probability Generator',
    lastRun: '2026-08-02 06:02 UTC',
    status: 'SUCCESS',
    recordsProcessed: 45,
    executionTimeMs: 3100,
    nextScheduledRun: '2026-08-02 12:02 UTC'
  },
  {
    jobId: 'job-04-gemini-reports',
    name: 'AI Match Analysis & Upset Watch Compiler',
    lastRun: '2026-08-02 06:03 UTC',
    status: 'SUCCESS',
    recordsProcessed: 15,
    executionTimeMs: 4500,
    nextScheduledRun: '2026-08-02 12:03 UTC'
  }
];
