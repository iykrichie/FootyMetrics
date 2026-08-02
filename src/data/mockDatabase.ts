import { buildFixtureInfluencingFactors, computeMatchMetrics } from '../services/analyticsEngine';
import { Fixture, H2HSummary, League, ModelPerformanceMetrics, SystemJobLog, Team } from '../types';

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
    code: 'SERA',
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
  }
];

// Helper to create teams
export const TEAMS: Record<string, Team> = {
  // --- EPL TEAMS ---
  'ars': {
    id: 'ars',
    name: 'Arsenal FC',
    shortName: 'Arsenal',
    leagueId: 'epl',
    logo: '🔴',
    color: '#EF0107',
    leaguePosition: 1,
    played: 26,
    won: 19,
    drawn: 5,
    lost: 2,
    goalsScored: 58,
    goalsConceded: 20,
    points: 62,
    xG: 2.14,
    xGA: 0.82,
    formLast5: [
      { result: 'W', opponent: 'Chelsea', score: '3-1', isHome: true, date: '2026-07-20' },
      { result: 'W', opponent: 'Newcastle', score: '2-0', isHome: false, date: '2026-07-13' },
      { result: 'D', opponent: 'Liverpool', score: '2-2', isHome: true, date: '2026-07-06' },
      { result: 'W', opponent: 'West Ham', score: '4-0', isHome: false, date: '2026-06-29' },
      { result: 'W', opponent: 'Everton', score: '2-1', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 88,
    homeFormScore: 92,
    awayFormScore: 84,
    offensiveRating: 91,
    defensiveRating: 95,
    possessionAvg: 61.2,
    finishingEfficiency: 1.08,
    cleanSheetRate: 0.54,
    bttsRate: 0.42,
    restDays: 7
  },
  'mci': {
    id: 'mci',
    name: 'Manchester City',
    shortName: 'Man City',
    leagueId: 'epl',
    logo: '🩵',
    color: '#6CABDD',
    leaguePosition: 2,
    played: 26,
    won: 18,
    drawn: 5,
    lost: 3,
    goalsScored: 62,
    goalsConceded: 24,
    points: 59,
    xG: 2.28,
    xGA: 0.94,
    formLast5: [
      { result: 'W', opponent: 'Aston Villa', score: '3-0', isHome: true, date: '2026-07-21' },
      { result: 'W', opponent: 'Brighton', score: '2-1', isHome: false, date: '2026-07-14' },
      { result: 'W', opponent: 'Tottenham', score: '1-0', isHome: true, date: '2026-07-07' },
      { result: 'L', opponent: 'Arsenal', score: '1-2', isHome: false, date: '2026-06-30' },
      { result: 'W', opponent: 'Fulham', score: '4-1', isHome: true, date: '2026-06-23' }
    ],
    formLast10Score: 86,
    homeFormScore: 94,
    awayFormScore: 78,
    offensiveRating: 96,
    defensiveRating: 90,
    possessionAvg: 65.8,
    finishingEfficiency: 1.12,
    cleanSheetRate: 0.46,
    bttsRate: 0.50,
    restDays: 6
  },
  'liv': {
    id: 'liv',
    name: 'Liverpool FC',
    shortName: 'Liverpool',
    leagueId: 'epl',
    logo: '🔴',
    color: '#C8102E',
    leaguePosition: 3,
    played: 26,
    won: 17,
    drawn: 6,
    lost: 3,
    goalsScored: 59,
    goalsConceded: 27,
    points: 57,
    xG: 2.18,
    xGA: 1.05,
    formLast5: [
      { result: 'W', opponent: 'Everton', score: '3-0', isHome: true, date: '2026-07-20' },
      { result: 'D', opponent: 'Arsenal', score: '2-2', isHome: false, date: '2026-07-13' },
      { result: 'W', opponent: 'Bournemouth', score: '2-0', isHome: true, date: '2026-07-06' },
      { result: 'W', opponent: 'Wolves', score: '3-1', isHome: false, date: '2026-06-29' },
      { result: 'D', opponent: 'Chelsea', score: '1-1', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 82,
    homeFormScore: 88,
    awayFormScore: 76,
    offensiveRating: 93,
    defensiveRating: 87,
    possessionAvg: 59.4,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.42,
    bttsRate: 0.58,
    restDays: 7
  },
  'che': {
    id: 'che',
    name: 'Chelsea FC',
    shortName: 'Chelsea',
    leagueId: 'epl',
    logo: '🔵',
    color: '#034694',
    leaguePosition: 4,
    played: 26,
    won: 14,
    drawn: 6,
    lost: 6,
    goalsScored: 47,
    goalsConceded: 31,
    points: 48,
    xG: 1.82,
    xGA: 1.18,
    formLast5: [
      { result: 'L', opponent: 'Arsenal', score: '1-3', isHome: false, date: '2026-07-20' },
      { result: 'W', opponent: 'Fulham', score: '2-0', isHome: true, date: '2026-07-13' },
      { result: 'W', opponent: 'Brentford', score: '3-2', isHome: false, date: '2026-07-06' },
      { result: 'D', opponent: 'Aston Villa', score: '1-1', isHome: true, date: '2026-06-29' },
      { result: 'D', opponent: 'Liverpool', score: '1-1', isHome: false, date: '2026-06-22' }
    ],
    formLast10Score: 72,
    homeFormScore: 78,
    awayFormScore: 66,
    offensiveRating: 82,
    defensiveRating: 80,
    possessionAvg: 56.1,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.35,
    bttsRate: 0.61,
    restDays: 6
  },
  'tot': {
    id: 'tot',
    name: 'Tottenham Hotspur',
    shortName: 'Tottenham',
    leagueId: 'epl',
    logo: '⚪',
    color: '#132257',
    leaguePosition: 5,
    played: 26,
    won: 13,
    drawn: 5,
    lost: 8,
    goalsScored: 50,
    goalsConceded: 38,
    points: 44,
    xG: 1.90,
    xGA: 1.42,
    formLast5: [
      { result: 'W', opponent: 'West Ham', score: '3-1', isHome: true, date: '2026-07-21' },
      { result: 'L', opponent: 'Man City', score: '0-1', isHome: false, date: '2026-07-14' },
      { result: 'W', opponent: 'Crystal Palace', score: '2-1', isHome: true, date: '2026-07-07' },
      { result: 'L', opponent: 'Newcastle', score: '1-2', isHome: false, date: '2026-06-30' },
      { result: 'W', opponent: 'Nottingham', score: '3-0', isHome: true, date: '2026-06-23' }
    ],
    formLast10Score: 68,
    homeFormScore: 74,
    awayFormScore: 62,
    offensiveRating: 84,
    defensiveRating: 72,
    possessionAvg: 54.8,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.27,
    bttsRate: 0.65,
    restDays: 7
  },

  // --- LA LIGA TEAMS ---
  'rma': {
    id: 'rma',
    name: 'Real Madrid CF',
    shortName: 'Real Madrid',
    leagueId: 'laliga',
    logo: '👑',
    color: '#FEBE10',
    leaguePosition: 1,
    played: 26,
    won: 20,
    drawn: 4,
    lost: 2,
    goalsScored: 60,
    goalsConceded: 18,
    points: 64,
    xG: 2.25,
    xGA: 0.78,
    formLast5: [
      { result: 'W', opponent: 'Sevilla', score: '3-0', isHome: true, date: '2026-07-20' },
      { result: 'W', opponent: 'Villarreal', score: '2-1', isHome: false, date: '2026-07-13' },
      { result: 'W', opponent: 'Real Betis', score: '2-0', isHome: true, date: '2026-07-06' },
      { result: 'D', opponent: 'Atlético Madrid', score: '1-1', isHome: false, date: '2026-06-29' },
      { result: 'W', opponent: 'Getafe', score: '4-1', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 92,
    homeFormScore: 96,
    awayFormScore: 88,
    offensiveRating: 95,
    defensiveRating: 96,
    possessionAvg: 62.1,
    finishingEfficiency: 1.10,
    cleanSheetRate: 0.58,
    bttsRate: 0.38,
    restDays: 7
  },
  'bar': {
    id: 'bar',
    name: 'FC Barcelona',
    shortName: 'Barcelona',
    leagueId: 'laliga',
    logo: '🔵🔴',
    color: '#004D98',
    leaguePosition: 2,
    played: 26,
    won: 19,
    drawn: 4,
    lost: 3,
    goalsScored: 64,
    goalsConceded: 25,
    points: 61,
    xG: 2.34,
    xGA: 0.92,
    formLast5: [
      { result: 'W', opponent: 'Valencia', score: '4-0', isHome: true, date: '2026-07-21' },
      { result: 'W', opponent: 'Athletic Bilbao', score: '3-1', isHome: false, date: '2026-07-14' },
      { result: 'L', opponent: 'Real Sociedad', score: '0-1', isHome: true, date: '2026-07-07' },
      { result: 'W', opponent: 'Girona', score: '3-2', isHome: false, date: '2026-06-30' },
      { result: 'W', opponent: 'Celta Vigo', score: '2-0', isHome: true, date: '2026-06-23' }
    ],
    formLast10Score: 85,
    homeFormScore: 90,
    awayFormScore: 80,
    offensiveRating: 97,
    defensiveRating: 88,
    possessionAvg: 64.9,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.46,
    bttsRate: 0.50,
    restDays: 6
  },
  'atm': {
    id: 'atm',
    name: 'Atlético de Madrid',
    shortName: 'Atlético',
    leagueId: 'laliga',
    logo: '🔴⚪',
    color: '#CB3524',
    leaguePosition: 3,
    played: 26,
    won: 16,
    drawn: 6,
    lost: 4,
    goalsScored: 46,
    goalsConceded: 21,
    points: 54,
    xG: 1.78,
    xGA: 0.88,
    formLast5: [
      { result: 'W', opponent: 'Girona', score: '2-0', isHome: true, date: '2026-07-20' },
      { result: 'D', opponent: 'Real Betis', score: '1-1', isHome: false, date: '2026-07-13' },
      { result: 'W', opponent: 'Osasuna', score: '3-0', isHome: true, date: '2026-07-06' },
      { result: 'D', opponent: 'Real Madrid', score: '1-1', isHome: true, date: '2026-06-29' },
      { result: 'W', opponent: 'Mallorca', score: '1-0', isHome: false, date: '2026-06-22' }
    ],
    formLast10Score: 81,
    homeFormScore: 89,
    awayFormScore: 73,
    offensiveRating: 83,
    defensiveRating: 93,
    possessionAvg: 51.5,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.50,
    bttsRate: 0.42,
    restDays: 7
  },
  'ath': {
    id: 'ath',
    name: 'Athletic Club',
    shortName: 'Athletic',
    leagueId: 'laliga',
    logo: '🔴⚪',
    color: '#EE2523',
    leaguePosition: 4,
    played: 26,
    won: 14,
    drawn: 6,
    lost: 6,
    goalsScored: 41,
    goalsConceded: 26,
    points: 48,
    xG: 1.65,
    xGA: 1.02,
    formLast5: [
      { result: 'W', opponent: 'Real Sociedad', score: '2-1', isHome: true, date: '2026-07-21' },
      { result: 'L', opponent: 'Barcelona', score: '1-3', isHome: true, date: '2026-07-14' },
      { result: 'W', opponent: 'Villarreal', score: '2-0', isHome: false, date: '2026-07-07' },
      { result: 'D', opponent: 'Sevilla', score: '0-0', isHome: true, date: '2026-06-30' },
      { result: 'W', opponent: 'Rayo Vallecano', score: '1-0', isHome: false, date: '2026-06-23' }
    ],
    formLast10Score: 75,
    homeFormScore: 82,
    awayFormScore: 68,
    offensiveRating: 79,
    defensiveRating: 85,
    possessionAvg: 52.3,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.42,
    bttsRate: 0.46,
    restDays: 7
  },

  // --- BUNDESLIGA TEAMS ---
  'bay': {
    id: 'bay',
    name: 'FC Bayern München',
    shortName: 'Bayern',
    leagueId: 'bundesliga',
    logo: '🔴',
    color: '#DC052D',
    leaguePosition: 1,
    played: 22,
    won: 17,
    drawn: 3,
    lost: 2,
    goalsScored: 62,
    goalsConceded: 20,
    points: 54,
    xG: 2.52,
    xGA: 0.88,
    formLast5: [
      { result: 'W', opponent: 'Dortmund', score: '3-1', isHome: true, date: '2026-07-20' },
      { result: 'W', opponent: 'Freiburg', score: '4-0', isHome: false, date: '2026-07-13' },
      { result: 'W', opponent: 'Leverkusen', score: '2-1', isHome: true, date: '2026-07-06' },
      { result: 'D', opponent: 'RB Leipzig', score: '2-2', isHome: false, date: '2026-06-29' },
      { result: 'W', opponent: 'Frankfurt', score: '3-0', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 94,
    homeFormScore: 98,
    awayFormScore: 88,
    offensiveRating: 98,
    defensiveRating: 92,
    possessionAvg: 66.5,
    finishingEfficiency: 1.14,
    cleanSheetRate: 0.50,
    bttsRate: 0.48,
    restDays: 7
  },
  'lev': {
    id: 'lev',
    name: 'Bayer 04 Leverkusen',
    shortName: 'Leverkusen',
    leagueId: 'bundesliga',
    logo: '🔴⬛',
    color: '#E32219',
    leaguePosition: 2,
    played: 22,
    won: 15,
    drawn: 5,
    lost: 2,
    goalsScored: 52,
    goalsConceded: 24,
    points: 50,
    xG: 2.15,
    xGA: 1.02,
    formLast5: [
      { result: 'W', opponent: 'Stuttgart', score: '3-1', isHome: true, date: '2026-07-21' },
      { result: 'W', opponent: 'Hoffenheim', score: '2-0', isHome: false, date: '2026-07-14' },
      { result: 'L', opponent: 'Bayern', score: '1-2', isHome: false, date: '2026-07-06' },
      { result: 'W', opponent: 'Frankfurt', score: '3-2', isHome: true, date: '2026-06-30' },
      { result: 'W', opponent: 'Wolfsburg', score: '2-1', isHome: false, date: '2026-06-23' }
    ],
    formLast10Score: 84,
    homeFormScore: 90,
    awayFormScore: 78,
    offensiveRating: 91,
    defensiveRating: 86,
    possessionAvg: 58.7,
    finishingEfficiency: 1.06,
    cleanSheetRate: 0.41,
    bttsRate: 0.55,
    restDays: 6
  },
  'bvb': {
    id: 'bvb',
    name: 'Borussia Dortmund',
    shortName: 'Dortmund',
    leagueId: 'bundesliga',
    logo: '🟡⬛',
    color: '#FDE100',
    leaguePosition: 3,
    played: 22,
    won: 13,
    drawn: 5,
    lost: 4,
    goalsScored: 46,
    goalsConceded: 28,
    points: 44,
    xG: 1.95,
    xGA: 1.22,
    formLast5: [
      { result: 'L', opponent: 'Bayern', score: '1-3', isHome: false, date: '2026-07-20' },
      { result: 'W', opponent: 'Mainz', score: '3-0', isHome: true, date: '2026-07-13' },
      { result: 'W', opponent: 'RB Leipzig', score: '2-1', isHome: true, date: '2026-07-06' },
      { result: 'D', opponent: 'Gladbach', score: '2-2', isHome: false, date: '2026-06-29' },
      { result: 'W', opponent: 'Freiburg', score: '4-2', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 76,
    homeFormScore: 86,
    awayFormScore: 66,
    offensiveRating: 87,
    defensiveRating: 78,
    possessionAvg: 57.2,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.32,
    bttsRate: 0.64,
    restDays: 7
  },
  'rbl': {
    id: 'rbl',
    name: 'RB Leipzig',
    shortName: 'Leipzig',
    leagueId: 'bundesliga',
    logo: '🔴⚪',
    color: '#DD0741',
    leaguePosition: 4,
    played: 22,
    won: 12,
    drawn: 6,
    lost: 4,
    goalsScored: 43,
    goalsConceded: 25,
    points: 42,
    xG: 1.88,
    xGA: 1.08,
    formLast5: [
      { result: 'W', opponent: 'Wolfsburg', score: '2-0', isHome: true, date: '2026-07-21' },
      { result: 'W', opponent: 'Gladbach', score: '2-1', isHome: false, date: '2026-07-14' },
      { result: 'L', opponent: 'Dortmund', score: '1-2', isHome: false, date: '2026-07-06' },
      { result: 'D', opponent: 'Bayern', score: '2-2', isHome: true, date: '2026-06-29' },
      { result: 'W', opponent: 'Augsburg', score: '3-0', isHome: true, date: '2026-06-23' }
    ],
    formLast10Score: 77,
    homeFormScore: 82,
    awayFormScore: 72,
    offensiveRating: 85,
    defensiveRating: 84,
    possessionAvg: 55.4,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.41,
    bttsRate: 0.50,
    restDays: 7
  },

  // --- SERIE A TEAMS ---
  'int': {
    id: 'int',
    name: 'Inter Milan',
    shortName: 'Inter',
    leagueId: 'seriea',
    logo: '🔵⬛',
    color: '#0053A0',
    leaguePosition: 1,
    played: 26,
    won: 19,
    drawn: 4,
    lost: 3,
    goalsScored: 59,
    goalsConceded: 20,
    points: 61,
    xG: 2.18,
    xGA: 0.85,
    formLast5: [
      { result: 'W', opponent: 'Juventus', score: '2-1', isHome: true, date: '2026-07-20' },
      { result: 'W', opponent: 'Lazio', score: '3-0', isHome: false, date: '2026-07-13' },
      { result: 'D', opponent: 'Atalanta', score: '1-1', isHome: true, date: '2026-07-06' },
      { result: 'W', opponent: 'Fiorentina', score: '2-0', isHome: false, date: '2026-06-29' },
      { result: 'W', opponent: 'Bologna', score: '3-1', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 90,
    homeFormScore: 94,
    awayFormScore: 86,
    offensiveRating: 94,
    defensiveRating: 94,
    possessionAvg: 58.2,
    finishingEfficiency: 1.07,
    cleanSheetRate: 0.54,
    bttsRate: 0.42,
    restDays: 7
  },
  'juv': {
    id: 'juv',
    name: 'Juventus FC',
    shortName: 'Juventus',
    leagueId: 'seriea',
    logo: '⚪⬛',
    color: '#000000',
    leaguePosition: 2,
    played: 26,
    won: 17,
    drawn: 6,
    lost: 3,
    goalsScored: 48,
    goalsConceded: 19,
    points: 57,
    xG: 1.85,
    xGA: 0.80,
    formLast5: [
      { result: 'L', opponent: 'Inter', score: '1-2', isHome: false, date: '2026-07-20' },
      { result: 'W', opponent: 'Roma', score: '2-0', isHome: true, date: '2026-07-13' },
      { result: 'W', opponent: 'Napoli', score: '1-0', isHome: false, date: '2026-07-06' },
      { result: 'W', opponent: 'Torino', score: '2-0', isHome: true, date: '2026-06-29' },
      { result: 'D', opponent: 'AC Milan', score: '0-0', isHome: false, date: '2026-06-22' }
    ],
    formLast10Score: 83,
    homeFormScore: 90,
    awayFormScore: 76,
    offensiveRating: 85,
    defensiveRating: 96,
    possessionAvg: 54.1,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.58,
    bttsRate: 0.35,
    restDays: 7
  },
  'acm': {
    id: 'acm',
    name: 'AC Milan',
    shortName: 'Milan',
    leagueId: 'seriea',
    logo: '🔴⬛',
    color: '#FB090B',
    leaguePosition: 3,
    played: 26,
    won: 16,
    drawn: 5,
    lost: 5,
    goalsScored: 50,
    goalsConceded: 28,
    points: 53,
    xG: 1.92,
    xGA: 1.12,
    formLast5: [
      { result: 'W', opponent: 'Napoli', score: '2-1', isHome: true, date: '2026-07-21' },
      { result: 'W', opponent: 'Fiorentina', score: '3-1', isHome: false, date: '2026-07-14' },
      { result: 'D', opponent: 'Lazio', score: '1-1', isHome: true, date: '2026-07-07' },
      { result: 'L', opponent: 'Atalanta', score: '1-2', isHome: false, date: '2026-06-30' },
      { result: 'D', opponent: 'Juventus', score: '0-0', isHome: true, date: '2026-06-23' }
    ],
    formLast10Score: 78,
    homeFormScore: 84,
    awayFormScore: 72,
    offensiveRating: 88,
    defensiveRating: 82,
    possessionAvg: 55.6,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.38,
    bttsRate: 0.54,
    restDays: 6
  },
  'ata': {
    id: 'ata',
    name: 'Atalanta BC',
    shortName: 'Atalanta',
    leagueId: 'seriea',
    logo: '🔵⬛',
    color: '#1E71B8',
    leaguePosition: 4,
    played: 26,
    won: 15,
    drawn: 5,
    lost: 6,
    goalsScored: 52,
    goalsConceded: 30,
    points: 50,
    xG: 2.05,
    xGA: 1.18,
    formLast5: [
      { result: 'W', opponent: 'Roma', score: '3-1', isHome: true, date: '2026-07-20' },
      { result: 'D', opponent: 'Inter', score: '1-1', isHome: false, date: '2026-07-13' },
      { result: 'W', opponent: 'Torino', score: '2-0', isHome: true, date: '2026-07-06' },
      { result: 'W', opponent: 'AC Milan', score: '2-1', isHome: true, date: '2026-06-29' },
      { result: 'L', opponent: 'Napoli', score: '1-2', isHome: false, date: '2026-06-22' }
    ],
    formLast10Score: 82,
    homeFormScore: 88,
    awayFormScore: 76,
    offensiveRating: 90,
    defensiveRating: 80,
    possessionAvg: 53.8,
    finishingEfficiency: 1.00,
    cleanSheetRate: 0.35,
    bttsRate: 0.58,
    restDays: 7
  },

  // --- LIGUE 1 TEAMS ---
  'psg': {
    id: 'psg',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    leagueId: 'ligue1',
    logo: '🔵🔴',
    color: '#002B5C',
    leaguePosition: 1,
    played: 22,
    won: 17,
    drawn: 4,
    lost: 1,
    goalsScored: 56,
    goalsConceded: 16,
    points: 55,
    xG: 2.40,
    xGA: 0.75,
    formLast5: [
      { result: 'W', opponent: 'Marseille', score: '3-0', isHome: true, date: '2026-07-20' },
      { result: 'W', opponent: 'Lyon', score: '2-1', isHome: false, date: '2026-07-13' },
      { result: 'W', opponent: 'Monaco', score: '3-1', isHome: true, date: '2026-07-06' },
      { result: 'D', opponent: 'Lille', score: '1-1', isHome: false, date: '2026-06-29' },
      { result: 'W', opponent: 'Rennes', score: '4-0', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 95,
    homeFormScore: 98,
    awayFormScore: 92,
    offensiveRating: 97,
    defensiveRating: 95,
    possessionAvg: 67.4,
    finishingEfficiency: 1.11,
    cleanSheetRate: 0.59,
    bttsRate: 0.41,
    restDays: 7
  },
  'asm': {
    id: 'asm',
    name: 'AS Monaco',
    shortName: 'Monaco',
    leagueId: 'ligue1',
    logo: '🔴⚪',
    color: '#E20613',
    leaguePosition: 2,
    played: 22,
    won: 14,
    drawn: 4,
    lost: 4,
    goalsScored: 45,
    goalsConceded: 25,
    points: 46,
    xG: 1.92,
    xGA: 1.10,
    formLast5: [
      { result: 'W', opponent: 'Nice', score: '2-0', isHome: true, date: '2026-07-21' },
      { result: 'W', opponent: 'Lille', score: '2-1', isHome: false, date: '2026-07-14' },
      { result: 'L', opponent: 'PSG', score: '1-3', isHome: false, date: '2026-07-06' },
      { result: 'W', opponent: 'Marseille', score: '3-2', isHome: true, date: '2026-06-30' },
      { result: 'W', opponent: 'Lens', score: '2-0', isHome: true, date: '2026-06-23' }
    ],
    formLast10Score: 80,
    homeFormScore: 86,
    awayFormScore: 74,
    offensiveRating: 88,
    defensiveRating: 82,
    possessionAvg: 56.1,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.41,
    bttsRate: 0.55,
    restDays: 7
  },
  'lil': {
    id: 'lil',
    name: 'LOSC Lille',
    shortName: 'Lille',
    leagueId: 'ligue1',
    logo: '🔴',
    color: '#E21A22',
    leaguePosition: 3,
    played: 22,
    won: 12,
    drawn: 6,
    lost: 4,
    goalsScored: 38,
    goalsConceded: 22,
    points: 42,
    xG: 1.72,
    xGA: 0.98,
    formLast5: [
      { result: 'W', opponent: 'Rennes', score: '2-0', isHome: true, date: '2026-07-20' },
      { result: 'L', opponent: 'Monaco', score: '1-2', isHome: true, date: '2026-07-14' },
      { result: 'W', opponent: 'Lyon', score: '2-1', isHome: false, date: '2026-07-07' },
      { result: 'D', opponent: 'PSG', score: '1-1', isHome: true, date: '2026-06-29' },
      { result: 'W', opponent: 'Marseille', score: '1-0', isHome: false, date: '2026-06-22' }
    ],
    formLast10Score: 78,
    homeFormScore: 82,
    awayFormScore: 74,
    offensiveRating: 81,
    defensiveRating: 87,
    possessionAvg: 54.0,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.45,
    bttsRate: 0.45,
    restDays: 7
  },
  'om': {
    id: 'om',
    name: 'Olympique de Marseille',
    shortName: 'Marseille',
    leagueId: 'ligue1',
    logo: '⚪🔵',
    color: '#00A3E0',
    leaguePosition: 4,
    played: 22,
    won: 12,
    drawn: 4,
    lost: 6,
    goalsScored: 42,
    goalsConceded: 29,
    points: 40,
    xG: 1.84,
    xGA: 1.25,
    formLast5: [
      { result: 'L', opponent: 'PSG', score: '0-3', isHome: false, date: '2026-07-20' },
      { result: 'W', opponent: 'Nice', score: '3-1', isHome: true, date: '2026-07-13' },
      { result: 'W', opponent: 'Lens', score: '2-1', isHome: false, date: '2026-07-06' },
      { result: 'L', opponent: 'Monaco', score: '2-3', isHome: false, date: '2026-06-30' },
      { result: 'L', opponent: 'Lille', score: '0-1', isHome: true, date: '2026-06-22' }
    ],
    formLast10Score: 68,
    homeFormScore: 76,
    awayFormScore: 60,
    offensiveRating: 84,
    defensiveRating: 75,
    possessionAvg: 55.2,
    finishingEfficiency: 1.00,
    cleanSheetRate: 0.32,
    bttsRate: 0.59,
    restDays: 6
  }
};

// Head to Head records
const MOCK_H2H: Record<string, H2HSummary> = {
  'ars_mci': {
    totalMatches: 10,
    homeWins: 4,
    awayWins: 4,
    draws: 2,
    avgGoals: 2.7,
    recentMeetings: [
      { id: '1', date: '2026-03-15', competition: 'Premier League', homeTeamName: 'Arsenal', awayTeamName: 'Man City', homeGoals: 2, awayGoals: 1 },
      { id: '2', date: '2025-09-22', competition: 'Premier League', homeTeamName: 'Man City', awayTeamName: 'Arsenal', homeGoals: 2, awayGoals: 2 },
      { id: '3', date: '2025-03-31', competition: 'Premier League', homeTeamName: 'Man City', awayTeamName: 'Arsenal', homeGoals: 0, awayGoals: 0 },
      { id: '4', date: '2024-10-08', competition: 'Premier League', homeTeamName: 'Arsenal', awayTeamName: 'Man City', homeGoals: 1, awayGoals: 0 }
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
      { id: '2', date: '2025-10-28', competition: 'La Liga', homeTeamName: 'Barcelona', awayTeamName: 'Real Madrid', homeGoals: 1, awayGoals: 2 },
      { id: '3', date: '2025-01-14', competition: 'Supercopa', homeTeamName: 'Real Madrid', awayTeamName: 'Barcelona', homeGoals: 4, awayGoals: 1 }
    ]
  },
  'bay_bvb': {
    totalMatches: 12,
    homeWins: 8,
    awayWins: 2,
    draws: 2,
    avgGoals: 3.8,
    recentMeetings: [
      { id: '1', date: '2026-03-30', competition: 'Bundesliga', homeTeamName: 'Bayern', awayTeamName: 'Dortmund', homeGoals: 3, awayGoals: 1 },
      { id: '2', date: '2025-11-04', competition: 'Bundesliga', homeTeamName: 'Dortmund', awayTeamName: 'Bayern', homeGoals: 0, awayGoals: 4 }
    ]
  },
  'int_juv': {
    totalMatches: 10,
    homeWins: 4,
    awayWins: 3,
    draws: 3,
    avgGoals: 2.1,
    recentMeetings: [
      { id: '1', date: '2026-02-04', competition: 'Serie A', homeTeamName: 'Inter', awayTeamName: 'Juventus', homeGoals: 1, awayGoals: 0 },
      { id: '2', date: '2025-11-26', competition: 'Serie A', homeTeamName: 'Juventus', awayTeamName: 'Inter', homeGoals: 1, awayGoals: 1 }
    ]
  },
  'psg_asm': {
    totalMatches: 10,
    homeWins: 6,
    awayWins: 2,
    draws: 2,
    avgGoals: 3.3,
    recentMeetings: [
      { id: '1', date: '2026-03-01', competition: 'Ligue 1', homeTeamName: 'Monaco', awayTeamName: 'PSG', homeGoals: 0, awayGoals: 2 },
      { id: '2', date: '2025-11-24', competition: 'Ligue 1', homeTeamName: 'PSG', awayTeamName: 'Monaco', homeGoals: 5, awayGoals: 2 }
    ]
  }
};

// Generate Fixtures for 3 Weekends
export function getFixtures(): Fixture[] {
  const week1Date = '2026-08-08';
  const week2Date = '2026-08-15';
  const week3Date = '2026-08-22';

  const rawFixtures: {
    id: string;
    leagueId: 'epl' | 'laliga' | 'bundesliga' | 'seriea' | 'ligue1';
    weekendNumber: 1 | 2 | 3;
    kickoffDate: string;
    kickoffTime: string;
    venue: string;
    referee: string;
    homeTeamId: string;
    awayTeamId: string;
  }[] = [
    // --- WEEKEND 1 (Current Week: Aug 2 - Aug 8, 2026) ---
    {
      id: 'fix_epl_w1_1',
      leagueId: 'epl',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '17:30 UTC',
      venue: 'Emirates Stadium, London',
      referee: 'Anthony Taylor',
      homeTeamId: 'ars',
      awayTeamId: 'mci'
    },
    {
      id: 'fix_epl_w1_2',
      leagueId: 'epl',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '16:30 UTC',
      venue: 'Anfield, Liverpool',
      referee: 'Michael Oliver',
      homeTeamId: 'liv',
      awayTeamId: 'che'
    },
    {
      id: 'fix_liga_w1_1',
      leagueId: 'laliga',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '20:00 UTC',
      venue: 'Santiago Bernabéu, Madrid',
      referee: 'Gil Manzano',
      homeTeamId: 'rma',
      awayTeamId: 'atm'
    },
    {
      id: 'fix_liga_w1_2',
      leagueId: 'laliga',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '18:30 UTC',
      venue: 'Estadi Olímpic Lluís Companys, Barcelona',
      referee: 'Sánchez Martínez',
      homeTeamId: 'bar',
      awayTeamId: 'ath'
    },
    {
      id: 'fix_bl_w1_1',
      leagueId: 'bundesliga',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '16:30 UTC',
      venue: 'Allianz Arena, Munich',
      referee: 'Felix Zwayer',
      homeTeamId: 'bay',
      awayTeamId: 'lev'
    },
    {
      id: 'fix_bl_w1_2',
      leagueId: 'bundesliga',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '14:30 UTC',
      venue: 'Signal Iduna Park, Dortmund',
      referee: 'Daniel Siebert',
      homeTeamId: 'bvb',
      awayTeamId: 'rbl'
    },
    {
      id: 'fix_sera_w1_1',
      leagueId: 'seriea',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '19:45 UTC',
      venue: 'San Siro, Milan',
      referee: 'Daniele Orsato',
      homeTeamId: 'int',
      awayTeamId: 'acm'
    },
    {
      id: 'fix_sera_w1_2',
      leagueId: 'seriea',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '17:00 UTC',
      venue: 'Allianz Stadium, Turin',
      referee: 'Davide Massa',
      homeTeamId: 'juv',
      awayTeamId: 'ata'
    },
    {
      id: 'fix_l1_w1_1',
      leagueId: 'ligue1',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '20:00 UTC',
      venue: 'Parc des Princes, Paris',
      referee: 'Clément Turpin',
      homeTeamId: 'psg',
      awayTeamId: 'asm'
    },
    {
      id: 'fix_l1_w1_2',
      leagueId: 'ligue1',
      weekendNumber: 1,
      kickoffDate: week1Date,
      kickoffTime: '19:00 UTC',
      venue: 'Stade Vélodrome, Marseille',
      referee: 'François Letexier',
      homeTeamId: 'om',
      awayTeamId: 'lil'
    },

    // --- WEEKEND 2 (Aug 9 - Aug 15, 2026) ---
    {
      id: 'fix_epl_w2_1',
      leagueId: 'epl',
      weekendNumber: 2,
      kickoffDate: week2Date,
      kickoffTime: '12:30 UTC',
      venue: 'Etihad Stadium, Manchester',
      referee: 'Paul Tierney',
      homeTeamId: 'mci',
      awayTeamId: 'liv'
    },
    {
      id: 'fix_epl_w2_2',
      leagueId: 'epl',
      weekendNumber: 2,
      kickoffDate: week2Date,
      kickoffTime: '16:30 UTC',
      venue: 'Tottenham Hotspur Stadium, London',
      referee: 'Simon Hooper',
      homeTeamId: 'tot',
      awayTeamId: 'ars'
    },
    {
      id: 'fix_liga_w2_1',
      leagueId: 'laliga',
      weekendNumber: 2,
      kickoffDate: week2Date,
      kickoffTime: '20:00 UTC',
      venue: 'Estadi Olímpic Lluís Companys, Barcelona',
      referee: 'Munuera Montero',
      homeTeamId: 'bar',
      awayTeamId: 'rma'
    },
    {
      id: 'fix_bl_w2_1',
      leagueId: 'bundesliga',
      weekendNumber: 2,
      kickoffDate: week2Date,
      kickoffTime: '16:30 UTC',
      venue: 'BayArena, Leverkusen',
      referee: 'Tobias Stieler',
      homeTeamId: 'lev',
      awayTeamId: 'bvb'
    },
    {
      id: 'fix_sera_w2_1',
      leagueId: 'seriea',
      weekendNumber: 2,
      kickoffDate: week2Date,
      kickoffTime: '19:45 UTC',
      venue: 'Gewiss Stadium, Bergamo',
      referee: 'Maurizio Mariani',
      homeTeamId: 'ata',
      awayTeamId: 'int'
    },
    {
      id: 'fix_l1_w2_1',
      leagueId: 'ligue1',
      weekendNumber: 2,
      kickoffDate: week2Date,
      kickoffTime: '20:00 UTC',
      venue: 'Stade Pierre-Mauroy, Lille',
      referee: 'Benoît Bastien',
      homeTeamId: 'lil',
      awayTeamId: 'psg'
    },

    // --- WEEKEND 3 (Aug 16 - Aug 22, 2026) ---
    {
      id: 'fix_epl_w3_1',
      leagueId: 'epl',
      weekendNumber: 3,
      kickoffDate: week3Date,
      kickoffTime: '16:30 UTC',
      venue: 'Stamford Bridge, London',
      referee: 'Craig Pawson',
      homeTeamId: 'che',
      awayTeamId: 'tot'
    },
    {
      id: 'fix_liga_w3_1',
      leagueId: 'laliga',
      weekendNumber: 3,
      kickoffDate: week3Date,
      kickoffTime: '20:00 UTC',
      venue: 'Cívitas Metropolitano, Madrid',
      referee: 'De Burgos Bengoetxea',
      homeTeamId: 'atm',
      awayTeamId: 'ath'
    },
    {
      id: 'fix_bl_w3_1',
      leagueId: 'bundesliga',
      weekendNumber: 3,
      kickoffDate: week3Date,
      kickoffTime: '14:30 UTC',
      venue: 'Red Bull Arena, Leipzig',
      referee: 'Harm Osmers',
      homeTeamId: 'rbl',
      awayTeamId: 'bay'
    },
    {
      id: 'fix_sera_w3_1',
      leagueId: 'seriea',
      weekendNumber: 3,
      kickoffDate: week3Date,
      kickoffTime: '19:45 UTC',
      venue: 'San Siro, Milan',
      referee: 'Marco Guida',
      homeTeamId: 'acm',
      awayTeamId: 'juv'
    },
    {
      id: 'fix_l1_w3_1',
      leagueId: 'ligue1',
      weekendNumber: 3,
      kickoffDate: week3Date,
      kickoffTime: '20:00 UTC',
      venue: 'Stade Louis II, Monaco',
      referee: 'Jérémie Pignard',
      homeTeamId: 'asm',
      awayTeamId: 'om'
    }
  ];

  return rawFixtures.map((rf) => {
    const homeTeam = TEAMS[rf.homeTeamId];
    const awayTeam = TEAMS[rf.awayTeamId];
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
          id: 'def1',
          date: '2025-12-10',
          competition: LEAGUES.find(l => l.id === rf.leagueId)?.name || 'League',
          homeTeamName: homeTeam?.name || 'Home',
          awayTeamName: awayTeam?.name || 'Away',
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
      homeTeamId: rf.homeTeamId,
      awayTeamId: rf.awayTeamId,
      homeTeam,
      awayTeam,
      h2h,
      metrics,
      influencingFactors,
      status: 'upcoming'
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
