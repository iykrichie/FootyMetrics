import { LeagueId } from '../types';

export interface RawFixtureConfig {
  id: string;
  leagueId: LeagueId;
  weekendNumber: 1 | 2 | 3;
  kickoffDate: string;
  kickoffTime: string;
  venue: string;
  referee: string;
  homeTeamId: string;
  awayTeamId: string;
  round: string;
  isOfficialFixture: boolean;
  source: string;
}

/**
 * Strict Data Integrity Policy:
 * Match fixtures must never be fabricated, inferred, or generated.
 * This function returns an empty array because fixtures MUST be ingested
 * dynamically and verified independently from official football data feeds (ESPN).
 */
export function getRawFixturesSchedule(): RawFixtureConfig[] {
  return [];
}
