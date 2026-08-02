import { Fixture, LeagueId, Team } from '../types';
import { TEAMS } from '../data/mockDatabase';
import { computeMatchMetrics, buildFixtureInfluencingFactors } from './analyticsEngine';

const ESPN_LEAGUE_MAP: Record<string, { leagueId: LeagueId; defaultVenue: string }> = {
  'eng.1': { leagueId: 'epl', defaultVenue: 'Premier League Stadium' },
  'esp.1': { leagueId: 'laliga', defaultVenue: 'Estadio de La Liga' },
  'ger.1': { leagueId: 'bundesliga', defaultVenue: 'Bundesliga Arena' },
  'ita.1': { leagueId: 'seriea', defaultVenue: 'Stadio Serie A' },
  'fra.1': { leagueId: 'ligue1', defaultVenue: 'Stade de Ligue 1' },
  'uefa.champions': { leagueId: 'epl', defaultVenue: 'UEFA Champions Arena' }
};

interface EspnCompetitor {
  id: string;
  homeAway: 'home' | 'away';
  team: {
    id: string;
    name?: string;
    displayName?: string;
    shortDisplayName?: string;
    abbreviation?: string;
    logo?: string;
  };
  score?: string;
}

interface EspnCompetition {
  id: string;
  date: string;
  venue?: {
    fullName?: string;
    address?: { city?: string; country?: string };
  };
  competitors: EspnCompetitor[];
  status?: {
    type?: {
      name?: string;
      state?: string; // "pre" | "in" | "post"
      completed?: boolean;
      description?: string;
      detail?: string;
    };
  };
}

interface EspnEvent {
  id: string;
  date: string;
  name: string;
  shortName: string;
  competitions: EspnCompetition[];
}

function findOrCreateTeam(espnTeam: EspnCompetitor['team'], leagueId: LeagueId): Team {
  const teamName = espnTeam.displayName || espnTeam.name || 'Team';
  const shortName = espnTeam.shortDisplayName || espnTeam.abbreviation || teamName.slice(0, 3).toUpperCase();

  // Check if we have preset statistics in mockDatabase
  const matchInDb = Object.values(TEAMS).find(
    (t) => t.name.toLowerCase().includes(teamName.toLowerCase()) || teamName.toLowerCase().includes(t.name.toLowerCase()) || t.shortName.toLowerCase() === shortName.toLowerCase()
  );

  const logoUrl = espnTeam.logo || (matchInDb ? matchInDb.logo : '⚽');

  if (matchInDb) {
    return {
      ...matchInDb,
      name: teamName,
      logo: logoUrl
    };
  }

  // Generate dynamic team baseline stats if team is not in hardcoded dict
  const hash = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const position = (hash % 16) + 1;
  const offRating = Math.min(95, Math.max(65, 92 - position * 1.8));
  const defRating = Math.min(95, Math.max(60, 90 - position * 1.7));
  const xG = Number((1.1 + (offRating - 60) * 0.02).toFixed(2));
  const xGA = Number((1.4 - (defRating - 60) * 0.015).toFixed(2));

  return {
    id: `espn_${espnTeam.id || hash}`,
    name: teamName,
    shortName,
    leagueId,
    logo: logoUrl,
    color: '#059669',
    leaguePosition: position,
    played: 24,
    won: Math.max(2, 18 - position),
    drawn: 5,
    lost: Math.min(18, position + 2),
    goalsScored: Math.round(xG * 24),
    goalsConceded: Math.round(xGA * 24),
    points: Math.max(10, (18 - position) * 3 + 5),
    xG,
    xGA,
    formLast5: [
      { result: 'W', opponent: 'Opponent A', score: '2-1', isHome: true, date: '2026-07-25' },
      { result: 'D', opponent: 'Opponent B', score: '1-1', isHome: false, date: '2026-07-20' },
      { result: 'W', opponent: 'Opponent C', score: '3-0', isHome: true, date: '2026-07-15' }
    ],
    formLast10Score: Math.min(95, Math.max(45, Math.round(offRating * 0.6 + defRating * 0.4))),
    homeFormScore: offRating,
    awayFormScore: defRating,
    offensiveRating: Math.round(offRating),
    defensiveRating: Math.round(defRating),
    possessionAvg: Number((45 + (offRating - 60) * 0.4).toFixed(1)),
    finishingEfficiency: 1.05,
    cleanSheetRate: Number((0.2 + (defRating - 60) * 0.008).toFixed(2)),
    bttsRate: 0.55,
    restDays: 6
  };
}

export async function fetchLiveEspnFixtures(): Promise<Fixture[]> {
  const espnCodes = ['eng.1', 'esp.1', 'ger.1', 'ita.1', 'fra.1'];
  const fetchedFixtures: Fixture[] = [];

  for (const code of espnCodes) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${code}/scoreboard`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      }).finally(() => clearTimeout(timeoutId));

      if (!response.ok) continue;

      const data = await response.json();
      const events: EspnEvent[] = data.events || [];
      const leagueConfig = ESPN_LEAGUE_MAP[code];

      events.forEach((evt) => {
        const comp = evt.competitions[0];
        if (!comp || comp.competitors.length < 2) return;

        const homeComp = comp.competitors.find((c) => c.homeAway === 'home') || comp.competitors[0];
        const awayComp = comp.competitors.find((c) => c.homeAway === 'away') || comp.competitors[1];

        const homeTeam = findOrCreateTeam(homeComp.team, leagueConfig.leagueId);
        const awayTeam = findOrCreateTeam(awayComp.team, leagueConfig.leagueId);

        // Date and Kickoff formatting
        const rawDate = new Date(evt.date);
        const kickoffDate = rawDate.toISOString().split('T')[0];
        const hours = String(rawDate.getUTCHours()).padStart(2, '0');
        const minutes = String(rawDate.getUTCMinutes()).padStart(2, '0');
        const kickoffTime = `${hours}:${minutes} UTC`;

        const venueName = comp.venue?.fullName
          ? `${comp.venue.fullName}${comp.venue.address?.city ? ', ' + comp.venue.address.city : ''}`
          : leagueConfig.defaultVenue;

        // Match status handling
        const stateName = comp.status?.type?.state; // "pre", "in", "post"
        const isCompleted = stateName === 'post' || comp.status?.type?.completed === true;

        const homeGoals = homeComp.score !== undefined ? parseInt(homeComp.score, 10) : 0;
        const awayGoals = awayComp.score !== undefined ? parseInt(awayComp.score, 10) : 0;

        // H2H default summary
        const h2h = {
          totalMatches: 6,
          homeWins: 3,
          awayWins: 2,
          draws: 1,
          avgGoals: 2.8,
          recentMeetings: [
            {
              id: `h2h_${evt.id}_1`,
              date: '2025-12-10',
              competition: leagueConfig.leagueId.toUpperCase(),
              homeTeamName: homeTeam.name,
              awayTeamName: awayTeam.name,
              homeGoals: 2,
              awayGoals: 1
            }
          ]
        };

        const metrics = computeMatchMetrics(homeTeam, awayTeam, h2h, 1);
        const influencingFactors = buildFixtureInfluencingFactors(homeTeam, awayTeam, 1);

        fetchedFixtures.push({
          id: `espn_fix_${evt.id}`,
          leagueId: leagueConfig.leagueId,
          weekendNumber: 1,
          kickoffDate,
          kickoffTime,
          venue: venueName,
          referee: 'FIFA Referee',
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          homeTeam,
          awayTeam,
          h2h,
          metrics,
          influencingFactors,
          status: isCompleted ? 'completed' : 'upcoming',
          result: isCompleted || stateName === 'in' ? { homeGoals, awayGoals } : undefined
        });
      });
    } catch (error) {
      console.warn(`Could not fetch live fixtures for ${code}:`, error);
    }
  }

  return fetchedFixtures;
}
