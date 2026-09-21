import { LeagueId, MatchFormItem, Team } from '../types';
import { EXTRA_LEAGUES_TEAMS } from './extraLeaguesTeams';

export const BASE_TEAMS: Record<string, Team> = {
  'mci': {
    id: 'mci',
    name: "Manchester City FC",

    shortName: "MCI",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/mci.png',
    color: '#6CABDD',
    leaguePosition: 1,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 5,
    points: 16,
    xG: 2.25,
    xGA: 0.95,
    formLast5: [
      {
            "result": "W",
            "opponent": "Aston Villa",
            "score": "2-1",
            "isHome": true,
            "date": "2025-04-22"
      },
      {
            "result": "W",
            "opponent": "Wolverhampton Wanderers",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-02"
      },
      {
            "result": "D",
            "opponent": "Southampton",
            "score": "0-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "AFC Bournemouth",
            "score": "3-1",
            "isHome": true,
            "date": "2025-05-20"
      },
      {
            "result": "W",
            "opponent": "Fulham",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 98,
    homeFormScore: 95,
    awayFormScore: 88,
    offensiveRating: 95,
    defensiveRating: 88,
    possessionAvg: 56.2,
    finishingEfficiency: 1.07,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'ars': {
    id: 'ars',
    name: "Arsenal FC",

    shortName: "ARS",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ars.png',
    color: '#EF0107',
    leaguePosition: 2,
    played: 5,
    won: 5,
    drawn: 1,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 4,
    points: 14,
    xG: 2.15,
    xGA: 0.85,
    formLast5: [
      {
            "result": "D",
            "opponent": "Crystal Palace",
            "score": "2-2",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "L",
            "opponent": "AFC Bournemouth",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Liverpool",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Newcastle United",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-18"
      },
      {
            "result": "W",
            "opponent": "Southampton",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 98,
    homeFormScore: 94,
    awayFormScore: 92,
    offensiveRating: 94,
    defensiveRating: 92,
    possessionAvg: 55.8,
    finishingEfficiency: 1.07,
    cleanSheetRate: 0.38,
    bttsRate: 0.54,
    restDays: 6
  },
  'liv': {
    id: 'liv',
    name: "Liverpool FC",

    shortName: "LIV",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/liv.png',
    color: '#C8102E',
    leaguePosition: 3,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 4,
    points: 12,
    xG: 2.2,
    xGA: 0.9,
    formLast5: [
      {
            "result": "W",
            "opponent": "Tottenham Hotspur",
            "score": "5-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Chelsea",
            "score": "1-3",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "Arsenal",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Brighton & Hove Albion",
            "score": "2-3",
            "isHome": false,
            "date": "2025-05-19"
      },
      {
            "result": "D",
            "opponent": "Crystal Palace",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 98,
    homeFormScore: 93,
    awayFormScore: 89,
    offensiveRating: 93,
    defensiveRating: 89,
    possessionAvg: 55.4,
    finishingEfficiency: 1.06,
    cleanSheetRate: 0.35,
    bttsRate: 0.54,
    restDays: 6
  },
  'che': {
    id: 'che',
    name: "Chelsea FC",

    shortName: "CHE",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/che.png',
    color: '#034694',
    leaguePosition: 4,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 6,
    points: 10,
    xG: 1.95,
    xGA: 1.15,
    formLast5: [
      {
            "result": "W",
            "opponent": "Everton",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "Liverpool",
            "score": "3-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Newcastle United",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Manchester United",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-16"
      },
      {
            "result": "W",
            "opponent": "Nottingham Forest",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 90,
    homeFormScore: 88,
    awayFormScore: 82,
    offensiveRating: 88,
    defensiveRating: 82,
    possessionAvg: 53.1,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'tot': {
    id: 'tot',
    name: "Tottenham Hotspur FC",

    shortName: "TOT",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/tot.png',
    color: '#132257',
    leaguePosition: 5,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 6,
    points: 8,
    xG: 1.9,
    xGA: 1.25,
    formLast5: [
      {
            "result": "L",
            "opponent": "Liverpool",
            "score": "1-5",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "West Ham United",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Crystal Palace",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Aston Villa",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-16"
      },
      {
            "result": "L",
            "opponent": "Brighton & Hove Albion",
            "score": "1-4",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 87,
    homeFormScore: 87,
    awayFormScore: 80,
    offensiveRating: 87,
    defensiveRating: 80,
    possessionAvg: 52.6,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.28,
    bttsRate: 0.54,
    restDays: 6
  },
  'new': {
    id: 'new',
    name: "Newcastle United FC",

    shortName: "NEW",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/new.png',
    color: '#241F20',
    leaguePosition: 6,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 6,
    points: 6,
    xG: 1.8,
    xGA: 1.15,
    formLast5: [
      {
            "result": "W",
            "opponent": "Ipswich Town",
            "score": "3-0",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Brighton & Hove Albion",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Chelsea",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Arsenal",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-18"
      },
      {
            "result": "L",
            "opponent": "Everton",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 89,
    homeFormScore: 85,
    awayFormScore: 84,
    offensiveRating: 85,
    defensiveRating: 84,
    possessionAvg: 51.8,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.31,
    bttsRate: 0.54,
    restDays: 6
  },
  'avl': {
    id: 'avl',
    name: "Aston Villa FC",

    shortName: "AVL",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/avl.png',
    color: '#670E36',
    leaguePosition: 7,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 6,
    points: 4,
    xG: 1.85,
    xGA: 1.2,
    formLast5: [
      {
            "result": "L",
            "opponent": "Manchester City",
            "score": "1-2",
            "isHome": false,
            "date": "2025-04-22"
      },
      {
            "result": "W",
            "opponent": "Fulham",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "AFC Bournemouth",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Tottenham Hotspur",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-16"
      },
      {
            "result": "L",
            "opponent": "Manchester United",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 89,
    homeFormScore: 86,
    awayFormScore: 83,
    offensiveRating: 86,
    defensiveRating: 83,
    possessionAvg: 52.2,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'mun': {
    id: 'mun',
    name: "Manchester United FC",

    shortName: "MUN",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/mun.png',
    color: '#DA291C',
    leaguePosition: 8,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 7,
    points: 4,
    xG: 1.65,
    xGA: 1.35,
    formLast5: [
      {
            "result": "D",
            "opponent": "AFC Bournemouth",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Brentford",
            "score": "3-4",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "West Ham United",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Chelsea",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-16"
      },
      {
            "result": "W",
            "opponent": "Aston Villa",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 83,
    homeFormScore: 84,
    awayFormScore: 79,
    offensiveRating: 84,
    defensiveRating: 79,
    possessionAvg: 51.3,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'bha': {
    id: 'bha',
    name: "Brighton & Hove Albion FC",

    shortName: "BHA",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bha.png',
    color: '#0057B8',
    leaguePosition: 9,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 6,
    points: 4,
    xG: 1.7,
    xGA: 1.3,
    formLast5: [
      {
            "result": "W",
            "opponent": "West Ham United",
            "score": "3-2",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Newcastle United",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Wolverhampton Wanderers",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Liverpool",
            "score": "3-2",
            "isHome": true,
            "date": "2025-05-19"
      },
      {
            "result": "W",
            "opponent": "Tottenham Hotspur",
            "score": "4-1",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 81,
    homeFormScore: 83,
    awayFormScore: 78,
    offensiveRating: 83,
    defensiveRating: 78,
    possessionAvg: 50.9,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'ful': {
    id: 'ful',
    name: "Fulham FC",

    shortName: "FUL",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ful.png',
    color: '#000000',
    leaguePosition: 10,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 7,
    points: 4,
    xG: 1.5,
    xGA: 1.35,
    formLast5: [
      {
            "result": "W",
            "opponent": "Southampton",
            "score": "2-1",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Aston Villa",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Everton",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Brentford",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-18"
      },
      {
            "result": "L",
            "opponent": "Manchester City",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 80,
    homeFormScore: 80,
    awayFormScore: 80,
    offensiveRating: 80,
    defensiveRating: 80,
    possessionAvg: 49.5,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.28,
    bttsRate: 0.54,
    restDays: 6
  },
  'bou': {
    id: 'bou',
    name: "AFC Bournemouth",

    shortName: "BOU",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bou.png',
    color: '#DA291C',
    leaguePosition: 11,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.45,
    xGA: 1.4,
    formLast5: [
      {
            "result": "D",
            "opponent": "Manchester United",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "Arsenal",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Aston Villa",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Manchester City",
            "score": "1-3",
            "isHome": false,
            "date": "2025-05-20"
      },
      {
            "result": "W",
            "opponent": "Leicester City",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 76,
    homeFormScore: 79,
    awayFormScore: 77,
    offensiveRating: 79,
    defensiveRating: 77,
    possessionAvg: 49.0,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'bre': {
    id: 'bre',
    name: "Brentford FC",

    shortName: "BRE",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bre.png',
    color: '#D20000',
    leaguePosition: 12,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 8,
    goalsConceded: 8,
    points: 4,
    xG: 1.55,
    xGA: 1.5,
    formLast5: [
      {
            "result": "W",
            "opponent": "Nottingham Forest",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-01"
      },
      {
            "result": "W",
            "opponent": "Manchester United",
            "score": "4-3",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Ipswich Town",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Fulham",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-18"
      },
      {
            "result": "D",
            "opponent": "Wolverhampton Wanderers",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 75,
    homeFormScore: 80,
    awayFormScore: 75,
    offensiveRating: 80,
    defensiveRating: 75,
    possessionAvg: 49.5,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.24,
    bttsRate: 0.54,
    restDays: 6
  },
  'whu': {
    id: 'whu',
    name: "West Ham United FC",

    shortName: "WHU",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/whu.png',
    color: '#7A263A',
    leaguePosition: 13,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 8,
    points: 4,
    xG: 1.4,
    xGA: 1.55,
    formLast5: [
      {
            "result": "L",
            "opponent": "Brighton & Hove Albion",
            "score": "2-3",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Tottenham Hotspur",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Manchester United",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Nottingham Forest",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-18"
      },
      {
            "result": "W",
            "opponent": "Ipswich Town",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 72,
    homeFormScore: 78,
    awayFormScore: 74,
    offensiveRating: 78,
    defensiveRating: 74,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.23,
    bttsRate: 0.54,
    restDays: 6
  },
  'nfo': {
    id: 'nfo',
    name: "Nottingham Forest FC",

    shortName: "NFO",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/nfo.png',
    color: '#DD0000',
    leaguePosition: 14,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 6,
    points: 4,
    xG: 1.35,
    xGA: 1.25,
    formLast5: [
      {
            "result": "L",
            "opponent": "Brentford",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-01"
      },
      {
            "result": "D",
            "opponent": "Crystal Palace",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-05"
      },
      {
            "result": "D",
            "opponent": "Leicester City",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "West Ham United",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-18"
      },
      {
            "result": "L",
            "opponent": "Chelsea",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 78,
    homeFormScore: 77,
    awayFormScore: 81,
    offensiveRating: 77,
    defensiveRating: 81,
    possessionAvg: 48.1,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.29,
    bttsRate: 0.54,
    restDays: 6
  },
  'cry': {
    id: 'cry',
    name: "Crystal Palace FC",

    shortName: "CRY",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/cry.png',
    color: '#1B458F',
    leaguePosition: 15,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.3,
    xGA: 1.35,
    formLast5: [
      {
            "result": "D",
            "opponent": "Arsenal",
            "score": "2-2",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "Nottingham Forest",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-05"
      },
      {
            "result": "W",
            "opponent": "Tottenham Hotspur",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Wolverhampton Wanderers",
            "score": "4-2",
            "isHome": true,
            "date": "2025-05-20"
      },
      {
            "result": "D",
            "opponent": "Liverpool",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 74,
    homeFormScore: 76,
    awayFormScore: 78,
    offensiveRating: 76,
    defensiveRating: 78,
    possessionAvg: 47.7,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'eve': {
    id: 'eve',
    name: "Everton FC",

    shortName: "EVE",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/eve.png',
    color: '#003399',
    leaguePosition: 16,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.2,
    xGA: 1.45,
    formLast5: [
      {
            "result": "L",
            "opponent": "Chelsea",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Ipswich Town",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Fulham",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Southampton",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-18"
      },
      {
            "result": "W",
            "opponent": "Newcastle United",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 70,
    homeFormScore: 74,
    awayFormScore: 76,
    offensiveRating: 74,
    defensiveRating: 76,
    possessionAvg: 46.8,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'wol': {
    id: 'wol',
    name: "Wolverhampton Wanderers FC",

    shortName: "WOL",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/wol.png',
    color: '#FDB913',
    leaguePosition: 17,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.25,
    xGA: 1.65,
    formLast5: [
      {
            "result": "W",
            "opponent": "Leicester City",
            "score": "3-0",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Manchester City",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-02"
      },
      {
            "result": "L",
            "opponent": "Brighton & Hove Albion",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Crystal Palace",
            "score": "2-4",
            "isHome": false,
            "date": "2025-05-20"
      },
      {
            "result": "D",
            "opponent": "Brentford",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 67,
    homeFormScore: 75,
    awayFormScore: 72,
    offensiveRating: 75,
    defensiveRating: 72,
    possessionAvg: 47.2,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'lei': {
    id: 'lei',
    name: "Leicester City FC",

    shortName: "LEI",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/lei.png',
    color: '#003090',
    leaguePosition: 18,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.2,
    xGA: 1.7,
    formLast5: [
      {
            "result": "L",
            "opponent": "Wolverhampton Wanderers",
            "score": "0-3",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "Southampton",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Nottingham Forest",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Ipswich Town",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-18"
      },
      {
            "result": "L",
            "opponent": "AFC Bournemouth",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-25"
      }
],
    formLast10Score: 63,
    homeFormScore: 73,
    awayFormScore: 70,
    offensiveRating: 73,
    defensiveRating: 70,
    possessionAvg: 46.4,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.2,
    bttsRate: 0.54,
    restDays: 6
  },
  'ips': {
    id: 'ips',
    name: "Ipswich Town FC",

    shortName: "IPS",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ips.png',
    color: '#0053A0',
    leaguePosition: 19,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 9,
    points: 4,
    xG: 1.15,
    xGA: 1.75,
    formLast5: [
      {
            "result": "L",
            "opponent": "Newcastle United",
            "score": "0-3",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Everton",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Brentford",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Leicester City",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-18"
      },
      {
            "result": "L",
            "opponent": "West Ham United",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 61,
    homeFormScore: 72,
    awayFormScore: 69,
    offensiveRating: 72,
    defensiveRating: 69,
    possessionAvg: 45.9,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.19,
    bttsRate: 0.54,
    restDays: 6
  },
  'sou': {
    id: 'sou',
    name: "Southampton FC",

    shortName: "SOU",

    leagueId: 'epl',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/sou.png',
    color: '#D71920',
    leaguePosition: 20,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 4,
    goalsScored: 6,
    goalsConceded: 9,
    points: 4,
    xG: 1.1,
    xGA: 1.8,
    formLast5: [
      {
            "result": "L",
            "opponent": "Fulham",
            "score": "1-2",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Leicester City",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Manchester City",
            "score": "0-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Everton",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-18"
      },
      {
            "result": "L",
            "opponent": "Arsenal",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-25"
      }
],
    formLast10Score: 59,
    homeFormScore: 71,
    awayFormScore: 68,
    offensiveRating: 71,
    defensiveRating: 68,
    possessionAvg: 45.5,
    finishingEfficiency: 0.95,
    cleanSheetRate: 0.18,
    bttsRate: 0.54,
    restDays: 6
  },
  'rma': {
    id: 'rma',
    name: "Real Madrid CF",

    shortName: "RMA",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/rma.png',
    color: '#EEEEEF',
    leaguePosition: 1,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 12,
    goalsConceded: 4,
    points: 16,
    xG: 2.35,
    xGA: 0.85,
    formLast5: [
      {
            "result": "W",
            "opponent": "Getafe",
            "score": "1-0",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "W",
            "opponent": "RC Celta de Vigo",
            "score": "3-2",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "FC Barcelona",
            "score": "3-4",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "RCD Mallorca",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-14"
      },
      {
            "result": "W",
            "opponent": "Sevilla",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 98,
    homeFormScore: 96,
    awayFormScore: 91,
    offensiveRating: 96,
    defensiveRating: 91,
    possessionAvg: 56.7,
    finishingEfficiency: 1.08,
    cleanSheetRate: 0.37,
    bttsRate: 0.54,
    restDays: 6
  },
  'bar': {
    id: 'bar',
    name: "FC Barcelona",

    shortName: "BAR",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bar.png',
    color: '#004D98',
    leaguePosition: 2,
    played: 5,
    won: 5,
    drawn: 1,
    lost: 0,
    goalsScored: 12,
    goalsConceded: 5,
    points: 14,
    xG: 2.45,
    xGA: 0.95,
    formLast5: [
      {
            "result": "W",
            "opponent": "RCD Mallorca",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-22"
      },
      {
            "result": "W",
            "opponent": "Real Valladolid",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Real Madrid",
            "score": "4-3",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "RCD Espanyol de Barcelona",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-15"
      },
      {
            "result": "L",
            "opponent": "Villarreal",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 98,
    homeFormScore: 95,
    awayFormScore: 88,
    offensiveRating: 95,
    defensiveRating: 88,
    possessionAvg: 56.2,
    finishingEfficiency: 1.07,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'atm': {
    id: 'atm',
    name: "Club Atlético de Madrid",

    shortName: "ATM",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/atm.png',
    color: '#CB3524',
    leaguePosition: 3,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 4,
    points: 12,
    xG: 1.95,
    xGA: 0.75,
    formLast5: [
      {
            "result": "W",
            "opponent": "Rayo Vallecano de Madrid",
            "score": "3-0",
            "isHome": true,
            "date": "2025-04-24"
      },
      {
            "result": "D",
            "opponent": "Deportivo Alav\u00e9s",
            "score": "0-0",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Real Sociedad de F\u00fatbol",
            "score": "4-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "CA Osasuna",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-15"
      },
      {
            "result": "W",
            "opponent": "Real Betis Balompi\u00e9",
            "score": "4-1",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 98,
    homeFormScore: 89,
    awayFormScore: 93,
    offensiveRating: 89,
    defensiveRating: 93,
    possessionAvg: 53.5,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.38,
    bttsRate: 0.54,
    restDays: 6
  },
  'ath': {
    id: 'ath',
    name: "Athletic Club",

    shortName: "ATH",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ath.png',
    color: '#EE2524',
    leaguePosition: 4,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 5,
    points: 10,
    xG: 1.8,
    xGA: 0.95,
    formLast5: [
      {
            "result": "W",
            "opponent": "UD Las Palmas",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "Real Sociedad de F\u00fatbol",
            "score": "0-0",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Deportivo Alav\u00e9s",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Getafe",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-15"
      },
      {
            "result": "W",
            "opponent": "Valencia",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 94,
    homeFormScore: 87,
    awayFormScore: 87,
    offensiveRating: 87,
    defensiveRating: 87,
    possessionAvg: 52.6,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'vil': {
    id: 'vil',
    name: "Villarreal CF",

    shortName: "VIL",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/vil.png',
    color: '#FFE600',
    leaguePosition: 5,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 6,
    points: 8,
    xG: 1.85,
    xGA: 1.3,
    formLast5: [
      {
            "result": "W",
            "opponent": "RCD Espanyol de Barcelona",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "CA Osasuna",
            "score": "4-2",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Girona",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "CD Legan\u00e9s",
            "score": "3-0",
            "isHome": true,
            "date": "2025-05-14"
      },
      {
            "result": "W",
            "opponent": "FC Barcelona",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 86,
    homeFormScore: 86,
    awayFormScore: 80,
    offensiveRating: 86,
    defensiveRating: 80,
    possessionAvg: 52.2,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.28,
    bttsRate: 0.54,
    restDays: 6
  },
  'bet': {
    id: 'bet',
    name: "Real Betis Balompié",

    shortName: "BET",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bet.png',
    color: '#009540',
    leaguePosition: 6,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 8,
    goalsConceded: 6,
    points: 6,
    xG: 1.65,
    xGA: 1.15,
    formLast5: [
      {
            "result": "W",
            "opponent": "Real Valladolid",
            "score": "5-1",
            "isHome": true,
            "date": "2025-04-24"
      },
      {
            "result": "W",
            "opponent": "RCD Espanyol de Barcelona",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "CA Osasuna",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "D",
            "opponent": "Rayo Vallecano de Madrid",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-15"
      },
      {
            "result": "L",
            "opponent": "Club Atl\u00e9tico de Madrid",
            "score": "1-4",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 87,
    homeFormScore: 84,
    awayFormScore: 83,
    offensiveRating: 84,
    defensiveRating: 83,
    possessionAvg: 51.3,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'rso': {
    id: 'rso',
    name: "Real Sociedad de Fútbol",

    shortName: "RSO",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/rso.png',
    color: '#0067B1',
    leaguePosition: 7,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 8,
    goalsConceded: 5,
    points: 4,
    xG: 1.55,
    xGA: 1.05,
    formLast5: [
      {
            "result": "L",
            "opponent": "Deportivo Alav\u00e9s",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "Athletic Club",
            "score": "0-0",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Club Atl\u00e9tico de Madrid",
            "score": "0-4",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "RC Celta de Vigo",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-13"
      },
      {
            "result": "W",
            "opponent": "Girona",
            "score": "3-2",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 88,
    homeFormScore: 83,
    awayFormScore: 85,
    offensiveRating: 83,
    defensiveRating: 85,
    possessionAvg: 50.9,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.32,
    bttsRate: 0.54,
    restDays: 6
  },
  'osa': {
    id: 'osa',
    name: "CA Osasuna",

    shortName: "OSA",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/osa.png',
    color: '#D91A2A',
    leaguePosition: 8,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 6,
    points: 4,
    xG: 1.45,
    xGA: 1.25,
    formLast5: [
      {
            "result": "W",
            "opponent": "Sevilla",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-24"
      },
      {
            "result": "L",
            "opponent": "Villarreal",
            "score": "2-4",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Real Betis Balompi\u00e9",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Club Atl\u00e9tico de Madrid",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-15"
      },
      {
            "result": "W",
            "opponent": "RCD Espanyol de Barcelona",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 81,
    homeFormScore: 80,
    awayFormScore: 81,
    offensiveRating: 80,
    defensiveRating: 81,
    possessionAvg: 49.5,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.29,
    bttsRate: 0.54,
    restDays: 6
  },
  'sev': {
    id: 'sev',
    name: "Sevilla FC",

    shortName: "SEV",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/sev.png',
    color: '#D4001F',
    leaguePosition: 9,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 7,
    points: 4,
    xG: 1.5,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "CA Osasuna",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-24"
      },
      {
            "result": "D",
            "opponent": "CD Legan\u00e9s",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "RC Celta de Vigo",
            "score": "2-3",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "UD Las Palmas",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-13"
      },
      {
            "result": "L",
            "opponent": "Real Madrid",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 80,
    homeFormScore: 81,
    awayFormScore: 79,
    offensiveRating: 81,
    defensiveRating: 79,
    possessionAvg: 50.0,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'mal': {
    id: 'mal',
    name: "RCD Mallorca",

    shortName: "MAL",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/mal.png',
    color: '#E20613',
    leaguePosition: 10,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.25,
    xGA: 1.1,
    formLast5: [
      {
            "result": "L",
            "opponent": "FC Barcelona",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-22"
      },
      {
            "result": "L",
            "opponent": "Girona",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-05"
      },
      {
            "result": "W",
            "opponent": "Real Valladolid",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Real Madrid",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-14"
      },
      {
            "result": "L",
            "opponent": "Getafe",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 81,
    homeFormScore: 78,
    awayFormScore: 83,
    offensiveRating: 78,
    defensiveRating: 83,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'ray': {
    id: 'ray',
    name: "Rayo Vallecano de Madrid",

    shortName: "RAY",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ray.png',
    color: '#E11B22',
    leaguePosition: 11,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.35,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "Club Atl\u00e9tico de Madrid",
            "score": "0-3",
            "isHome": false,
            "date": "2025-04-24"
      },
      {
            "result": "W",
            "opponent": "Getafe",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-02"
      },
      {
            "result": "W",
            "opponent": "UD Las Palmas",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-09"
      },
      {
            "result": "D",
            "opponent": "Real Betis Balompi\u00e9",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-15"
      },
      {
            "result": "W",
            "opponent": "RC Celta de Vigo",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 77,
    homeFormScore: 79,
    awayFormScore: 78,
    offensiveRating: 79,
    defensiveRating: 78,
    possessionAvg: 49.0,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'cel': {
    id: 'cel',
    name: "RC Celta de Vigo",

    shortName: "CEL",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/cel.png',
    color: '#8AC3EE',
    leaguePosition: 12,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 8,
    goalsConceded: 8,
    points: 4,
    xG: 1.65,
    xGA: 1.55,
    formLast5: [
      {
            "result": "W",
            "opponent": "Villarreal",
            "score": "3-0",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "L",
            "opponent": "Real Madrid",
            "score": "2-3",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Sevilla",
            "score": "3-2",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Real Sociedad de F\u00fatbol",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-13"
      },
      {
            "result": "L",
            "opponent": "Rayo Vallecano de Madrid",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 77,
    homeFormScore: 82,
    awayFormScore: 75,
    offensiveRating: 82,
    defensiveRating: 75,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.24,
    bttsRate: 0.54,
    restDays: 6
  },
  'ala': {
    id: 'ala',
    name: "Deportivo Alavés",

    shortName: "ALA",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ala.png',
    color: '#003CA6',
    leaguePosition: 13,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.3,
    xGA: 1.3,
    formLast5: [
      {
            "result": "W",
            "opponent": "Real Sociedad de F\u00fatbol",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "Club Atl\u00e9tico de Madrid",
            "score": "0-0",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Athletic Club",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Valencia",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-14"
      },
      {
            "result": "W",
            "opponent": "Real Valladolid",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 76,
    homeFormScore: 77,
    awayFormScore: 79,
    offensiveRating: 77,
    defensiveRating: 79,
    possessionAvg: 48.1,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'esp': {
    id: 'esp',
    name: "RCD Espanyol de Barcelona",

    shortName: "ESP",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/esp.png',
    color: '#007FC8',
    leaguePosition: 14,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.25,
    xGA: 1.45,
    formLast5: [
      {
            "result": "L",
            "opponent": "Villarreal",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Real Betis Balompi\u00e9",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "CD Legan\u00e9s",
            "score": "2-3",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "FC Barcelona",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-15"
      },
      {
            "result": "L",
            "opponent": "CA Osasuna",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 71,
    homeFormScore: 76,
    awayFormScore: 75,
    offensiveRating: 76,
    defensiveRating: 75,
    possessionAvg: 47.7,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.24,
    bttsRate: 0.54,
    restDays: 6
  },
  'leg': {
    id: 'leg',
    name: "CD Leganés",

    shortName: "LEG",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/leg.png',
    color: '#00529F',
    leaguePosition: 15,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.1,
    xGA: 1.25,
    formLast5: [
      {
            "result": "D",
            "opponent": "Girona",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-24"
      },
      {
            "result": "D",
            "opponent": "Sevilla",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "RCD Espanyol de Barcelona",
            "score": "3-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Villarreal",
            "score": "0-3",
            "isHome": false,
            "date": "2025-05-14"
      },
      {
            "result": "W",
            "opponent": "UD Las Palmas",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 72,
    homeFormScore: 73,
    awayFormScore: 79,
    offensiveRating: 73,
    defensiveRating: 79,
    possessionAvg: 46.4,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'lpa': {
    id: 'lpa',
    name: "UD Las Palmas",

    shortName: "LPA",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/lpa.png',
    color: '#FFD100',
    leaguePosition: 16,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.25,
    xGA: 1.6,
    formLast5: [
      {
            "result": "L",
            "opponent": "Athletic Club",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "L",
            "opponent": "Valencia",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Rayo Vallecano de Madrid",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-09"
      },
      {
            "result": "L",
            "opponent": "Sevilla",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-13"
      },
      {
            "result": "L",
            "opponent": "CD Legan\u00e9s",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 68,
    homeFormScore: 75,
    awayFormScore: 73,
    offensiveRating: 75,
    defensiveRating: 73,
    possessionAvg: 47.2,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'val': {
    id: 'val',
    name: "Valencia CF",

    shortName: "VAL",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/val.png',
    color: '#FFFFFF',
    leaguePosition: 17,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.25,
    xGA: 1.5,
    formLast5: [
      {
            "result": "D",
            "opponent": "RCD Espanyol de Barcelona",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-22"
      },
      {
            "result": "W",
            "opponent": "UD Las Palmas",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Getafe",
            "score": "3-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Deportivo Alav\u00e9s",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-14"
      },
      {
            "result": "L",
            "opponent": "Athletic Club",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 70,
    homeFormScore: 76,
    awayFormScore: 74,
    offensiveRating: 76,
    defensiveRating: 74,
    possessionAvg: 47.7,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.23,
    bttsRate: 0.54,
    restDays: 6
  },
  'gir': {
    id: 'gir',
    name: "Girona FC",

    shortName: "GIR",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/gir.png',
    color: '#CD1318',
    leaguePosition: 18,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 8,
    goalsConceded: 7,
    points: 4,
    xG: 1.6,
    xGA: 1.4,
    formLast5: [
      {
            "result": "D",
            "opponent": "CD Legan\u00e9s",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-24"
      },
      {
            "result": "W",
            "opponent": "RCD Mallorca",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-05"
      },
      {
            "result": "L",
            "opponent": "Villarreal",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Real Valladolid",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-13"
      },
      {
            "result": "L",
            "opponent": "Real Sociedad de F\u00fatbol",
            "score": "2-3",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 79,
    homeFormScore: 82,
    awayFormScore: 77,
    offensiveRating: 82,
    defensiveRating: 77,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'get': {
    id: 'get',
    name: "Getafe CF",

    shortName: "GET",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/get.png',
    color: '#005CA9',
    leaguePosition: 19,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.15,
    xGA: 1.15,
    formLast5: [
      {
            "result": "L",
            "opponent": "Real Madrid",
            "score": "0-1",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "L",
            "opponent": "Rayo Vallecano de Madrid",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-02"
      },
      {
            "result": "L",
            "opponent": "Valencia",
            "score": "0-3",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Athletic Club",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-15"
      },
      {
            "result": "W",
            "opponent": "RCD Mallorca",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 76,
    homeFormScore: 74,
    awayFormScore: 82,
    offensiveRating: 74,
    defensiveRating: 82,
    possessionAvg: 46.8,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'vld': {
    id: 'vld',
    name: "Real Valladolid CF",

    shortName: "VLD",

    leagueId: 'laliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/vld.png',
    color: '#5C2D91',
    leaguePosition: 20,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 4,
    goalsScored: 5,
    goalsConceded: 9,
    points: 4,
    xG: 1.05,
    xGA: 1.8,
    formLast5: [
      {
            "result": "L",
            "opponent": "Real Betis Balompi\u00e9",
            "score": "1-5",
            "isHome": false,
            "date": "2025-04-24"
      },
      {
            "result": "L",
            "opponent": "FC Barcelona",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "RCD Mallorca",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Girona",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-13"
      },
      {
            "result": "L",
            "opponent": "Deportivo Alav\u00e9s",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 62,
    homeFormScore: 71,
    awayFormScore: 71,
    offensiveRating: 71,
    defensiveRating: 71,
    possessionAvg: 45.5,
    finishingEfficiency: 0.95,
    cleanSheetRate: 0.21,
    bttsRate: 0.54,
    restDays: 6
  },
  'bay': {
    id: 'bay',
    name: "FC Bayern München",

    shortName: "BAY",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bay.png',
    color: '#DC052D',
    leaguePosition: 1,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 13,
    goalsConceded: 5,
    points: 16,
    xG: 2.65,
    xGA: 0.95,
    formLast5: [
      {
            "result": "W",
            "opponent": "1. Heidenheim 1846",
            "score": "4-0",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "1. FSV Mainz 05",
            "score": "3-0",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "RB Leipzig",
            "score": "3-3",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Borussia M\u00f6nchengladbach",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "TSG 1899 Hoffenheim",
            "score": "4-0",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 98,
    homeFormScore: 96,
    awayFormScore: 89,
    offensiveRating: 96,
    defensiveRating: 89,
    possessionAvg: 56.7,
    finishingEfficiency: 1.08,
    cleanSheetRate: 0.35,
    bttsRate: 0.54,
    restDays: 6
  },
  'lev': {
    id: 'lev',
    name: "Bayer 04 Leverkusen",

    shortName: "LEV",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/lev.png',
    color: '#E32221',
    leaguePosition: 2,
    played: 5,
    won: 5,
    drawn: 1,
    lost: 0,
    goalsScored: 12,
    goalsConceded: 5,
    points: 14,
    xG: 2.45,
    xGA: 1.05,
    formLast5: [
      {
            "result": "D",
            "opponent": "FC St. Pauli 1910",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "FC Augsburg",
            "score": "2-0",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "SC Freiburg",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Borussia Dortmund",
            "score": "2-4",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "D",
            "opponent": "1. FSV Mainz 05",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 98,
    homeFormScore: 94,
    awayFormScore: 88,
    offensiveRating: 94,
    defensiveRating: 88,
    possessionAvg: 55.8,
    finishingEfficiency: 1.07,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'bvb': {
    id: 'bvb',
    name: "Borussia Dortmund",

    shortName: "BVB",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bvb.png',
    color: '#FDE100',
    leaguePosition: 3,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 6,
    points: 12,
    xG: 2.15,
    xGA: 1.25,
    formLast5: [
      {
            "result": "W",
            "opponent": "Borussia M\u00f6nchengladbach",
            "score": "3-2",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "TSG 1899 Hoffenheim",
            "score": "3-2",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "VfL Wolfsburg",
            "score": "4-0",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Bayer 04 Leverkusen",
            "score": "4-2",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Holstein Kiel",
            "score": "3-0",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 94,
    homeFormScore: 90,
    awayFormScore: 84,
    offensiveRating: 90,
    defensiveRating: 84,
    possessionAvg: 54.0,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.31,
    bttsRate: 0.54,
    restDays: 6
  },
  'rbl': {
    id: 'rbl',
    name: "RB Leipzig",

    shortName: "RBL",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/rbl.png',
    color: '#DA020E',
    leaguePosition: 4,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 5,
    points: 10,
    xG: 2.05,
    xGA: 1.0,
    formLast5: [
      {
            "result": "D",
            "opponent": "Holstein Kiel",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "Eintracht Frankfurt",
            "score": "0-4",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "FC Bayern M\u00fcnchen",
            "score": "3-3",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "SV Werder Bremen",
            "score": "0-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "VfB Stuttgart",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 96,
    homeFormScore: 89,
    awayFormScore: 87,
    offensiveRating: 89,
    defensiveRating: 87,
    possessionAvg: 53.5,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'sge': {
    id: 'sge',
    name: "Eintracht Frankfurt",

    shortName: "SGE",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/sge.png',
    color: '#E1000F',
    leaguePosition: 5,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 7,
    points: 8,
    xG: 1.95,
    xGA: 1.35,
    formLast5: [
      {
            "result": "D",
            "opponent": "FC Augsburg",
            "score": "0-0",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "RB Leipzig",
            "score": "4-0",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "1. FSV Mainz 05",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "FC St. Pauli 1910",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "SC Freiburg",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 88,
    homeFormScore: 87,
    awayFormScore: 81,
    offensiveRating: 87,
    defensiveRating: 81,
    possessionAvg: 52.6,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.29,
    bttsRate: 0.54,
    restDays: 6
  },
  'stu': {
    id: 'stu',
    name: "VfB Stuttgart",

    shortName: "STU",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/stu.png',
    color: '#E32219',
    leaguePosition: 6,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 7,
    points: 6,
    xG: 2.1,
    xGA: 1.4,
    formLast5: [
      {
            "result": "D",
            "opponent": "1. Union Berlin",
            "score": "4-4",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "1. Heidenheim 1846",
            "score": "0-1",
            "isHome": true,
            "date": "2025-04-25"
      },
      {
            "result": "W",
            "opponent": "FC St. Pauli 1910",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "FC Augsburg",
            "score": "4-0",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "RB Leipzig",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 88,
    homeFormScore: 88,
    awayFormScore: 80,
    offensiveRating: 88,
    defensiveRating: 80,
    possessionAvg: 53.1,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.28,
    bttsRate: 0.54,
    restDays: 6
  },
  'scf': {
    id: 'scf',
    name: "SC Freiburg",

    shortName: "SCF",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/scf.png',
    color: '#000000',
    leaguePosition: 7,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 8,
    goalsConceded: 6,
    points: 4,
    xG: 1.55,
    xGA: 1.25,
    formLast5: [
      {
            "result": "W",
            "opponent": "TSG 1899 Hoffenheim",
            "score": "3-2",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "VfL Wolfsburg",
            "score": "1-0",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Bayer 04 Leverkusen",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Holstein Kiel",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Eintracht Frankfurt",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 85,
    homeFormScore: 82,
    awayFormScore: 83,
    offensiveRating: 82,
    defensiveRating: 83,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'uni': {
    id: 'uni',
    name: "1. FC Union Berlin",

    shortName: "UNI",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/uni.png',
    color: '#ED1C24',
    leaguePosition: 8,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.3,
    xGA: 1.1,
    formLast5: [
      {
            "result": "D",
            "opponent": "VfB Stuttgart",
            "score": "4-4",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "VfL Bochum 1848",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "SV Werder Bremen",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "1. Heidenheim 1846",
            "score": "0-3",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "FC Augsburg",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 84,
    homeFormScore: 79,
    awayFormScore: 85,
    offensiveRating: 79,
    defensiveRating: 85,
    possessionAvg: 49.0,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.32,
    bttsRate: 0.54,
    restDays: 6
  },
  'wer': {
    id: 'wer',
    name: "SV Werder Bremen",

    shortName: "WER",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/wer.png',
    color: '#1D9053',
    leaguePosition: 9,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 7,
    points: 4,
    xG: 1.5,
    xGA: 1.45,
    formLast5: [
      {
            "result": "W",
            "opponent": "VfL Bochum 1848",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "FC St. Pauli 1910",
            "score": "0-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "1. Union Berlin",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "RB Leipzig",
            "score": "0-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "1. Heidenheim 1846",
            "score": "4-1",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 79,
    homeFormScore: 81,
    awayFormScore: 78,
    offensiveRating: 81,
    defensiveRating: 78,
    possessionAvg: 50.0,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'fca': {
    id: 'fca',
    name: "FC Augsburg",

    shortName: "FCA",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/fca.png',
    color: '#BA3733',
    leaguePosition: 10,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 8,
    points: 4,
    xG: 1.4,
    xGA: 1.55,
    formLast5: [
      {
            "result": "D",
            "opponent": "Eintracht Frankfurt",
            "score": "0-0",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "Bayer 04 Leverkusen",
            "score": "0-2",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Holstein Kiel",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "VfB Stuttgart",
            "score": "0-4",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "1. Union Berlin",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 74,
    homeFormScore: 78,
    awayFormScore: 76,
    offensiveRating: 78,
    defensiveRating: 76,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'bmg': {
    id: 'bmg',
    name: "Borussia Mönchengladbach",

    shortName: "BMG",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bmg.png',
    color: '#000000',
    leaguePosition: 11,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 8,
    points: 4,
    xG: 1.55,
    xGA: 1.6,
    formLast5: [
      {
            "result": "L",
            "opponent": "Borussia Dortmund",
            "score": "2-3",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "Holstein Kiel",
            "score": "3-4",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "TSG 1899 Hoffenheim",
            "score": "4-4",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "FC Bayern M\u00fcnchen",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "VfL Wolfsburg",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 75,
    homeFormScore: 80,
    awayFormScore: 75,
    offensiveRating: 80,
    defensiveRating: 75,
    possessionAvg: 49.5,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.24,
    bttsRate: 0.54,
    restDays: 6
  },
  'tsg': {
    id: 'tsg',
    name: "TSG 1899 Hoffenheim",

    shortName: "TSG",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/tsg.png',
    color: '#1961B5',
    leaguePosition: 12,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 8,
    goalsConceded: 9,
    points: 4,
    xG: 1.7,
    xGA: 1.8,
    formLast5: [
      {
            "result": "L",
            "opponent": "SC Freiburg",
            "score": "2-3",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "Borussia Dortmund",
            "score": "2-3",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Borussia M\u00f6nchengladbach",
            "score": "4-4",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "VfL Wolfsburg",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-09"
      },
      {
            "result": "L",
            "opponent": "FC Bayern M\u00fcnchen",
            "score": "0-4",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 74,
    homeFormScore: 82,
    awayFormScore: 72,
    offensiveRating: 82,
    defensiveRating: 72,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'wob': {
    id: 'wob',
    name: "VfL Wolfsburg",

    shortName: "WOB",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/wob.png',
    color: '#65B32E',
    leaguePosition: 13,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 8,
    goalsConceded: 8,
    points: 4,
    xG: 1.5,
    xGA: 1.5,
    formLast5: [
      {
            "result": "D",
            "opponent": "1. FSV Mainz 05",
            "score": "2-2",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "SC Freiburg",
            "score": "0-1",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Borussia Dortmund",
            "score": "0-4",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "TSG 1899 Hoffenheim",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-09"
      },
      {
            "result": "W",
            "opponent": "Borussia M\u00f6nchengladbach",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 76,
    homeFormScore: 80,
    awayFormScore: 76,
    offensiveRating: 80,
    defensiveRating: 76,
    possessionAvg: 49.5,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'm05': {
    id: 'm05',
    name: "1. FSV Mainz 05",

    shortName: "M05",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/m05.png',
    color: '#ED1C24',
    leaguePosition: 14,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.4,
    xGA: 1.45,
    formLast5: [
      {
            "result": "D",
            "opponent": "VfL Wolfsburg",
            "score": "2-2",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "FC Bayern M\u00fcnchen",
            "score": "0-3",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "D",
            "opponent": "Eintracht Frankfurt",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "VfL Bochum 1848",
            "score": "4-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "D",
            "opponent": "Bayer 04 Leverkusen",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 75,
    homeFormScore: 78,
    awayFormScore: 77,
    offensiveRating: 78,
    defensiveRating: 77,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'fch': {
    id: 'fch',
    name: "1. FC Heidenheim 1846",

    shortName: "FCH",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/fch.png',
    color: '#E2001A',
    leaguePosition: 15,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.35,
    xGA: 1.4,
    formLast5: [
      {
            "result": "L",
            "opponent": "FC Bayern M\u00fcnchen",
            "score": "0-4",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "VfB Stuttgart",
            "score": "1-0",
            "isHome": false,
            "date": "2025-04-25"
      },
      {
            "result": "D",
            "opponent": "VfL Bochum 1848",
            "score": "0-0",
            "isHome": true,
            "date": "2025-05-02"
      },
      {
            "result": "W",
            "opponent": "1. Union Berlin",
            "score": "3-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "SV Werder Bremen",
            "score": "1-4",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 75,
    homeFormScore: 77,
    awayFormScore: 78,
    offensiveRating: 77,
    defensiveRating: 78,
    possessionAvg: 48.1,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'boc': {
    id: 'boc',
    name: "VfL Bochum 1848",

    shortName: "BOC",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/boc.png',
    color: '#005CA9',
    leaguePosition: 16,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 9,
    points: 4,
    xG: 1.25,
    xGA: 1.8,
    formLast5: [
      {
            "result": "L",
            "opponent": "SV Werder Bremen",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "1. Union Berlin",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "1. Heidenheim 1846",
            "score": "0-0",
            "isHome": false,
            "date": "2025-05-02"
      },
      {
            "result": "L",
            "opponent": "1. FSV Mainz 05",
            "score": "1-4",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "FC St. Pauli 1910",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 65,
    homeFormScore: 74,
    awayFormScore: 71,
    offensiveRating: 74,
    defensiveRating: 71,
    possessionAvg: 46.8,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.21,
    bttsRate: 0.54,
    restDays: 6
  },
  'stp': {
    id: 'stp',
    name: "FC St. Pauli 1910",

    shortName: "STP",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/stp.png',
    color: '#584538',
    leaguePosition: 17,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.15,
    xGA: 1.45,
    formLast5: [
      {
            "result": "D",
            "opponent": "Bayer 04 Leverkusen",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "D",
            "opponent": "SV Werder Bremen",
            "score": "0-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "VfB Stuttgart",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Eintracht Frankfurt",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "VfL Bochum 1848",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 69,
    homeFormScore: 73,
    awayFormScore: 76,
    offensiveRating: 73,
    defensiveRating: 76,
    possessionAvg: 46.4,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'kie': {
    id: 'kie',
    name: "Holstein Kiel",

    shortName: "KIE",

    leagueId: 'bundesliga',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/kie.png',
    color: '#004B93',
    leaguePosition: 18,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 10,
    points: 4,
    xG: 1.2,
    xGA: 2.05,
    formLast5: [
      {
            "result": "D",
            "opponent": "RB Leipzig",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "Borussia M\u00f6nchengladbach",
            "score": "4-3",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "FC Augsburg",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "SC Freiburg",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Borussia Dortmund",
            "score": "0-3",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 61,
    homeFormScore: 72,
    awayFormScore: 69,
    offensiveRating: 72,
    defensiveRating: 69,
    possessionAvg: 45.9,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.19,
    bttsRate: 0.54,
    restDays: 6
  },
  'int': {
    id: 'int',
    name: "FC Internazionale Milano",

    shortName: "INT",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/int.png',
    color: '#010E80',
    leaguePosition: 1,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 4,
    points: 16,
    xG: 2.25,
    xGA: 0.85,
    formLast5: [
      {
            "result": "L",
            "opponent": "Bologna 1909",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "AS Roma",
            "score": "0-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "Hellas Verona",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Torino",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "D",
            "opponent": "SS Lazio",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 98,
    homeFormScore: 95,
    awayFormScore: 92,
    offensiveRating: 95,
    defensiveRating: 92,
    possessionAvg: 56.2,
    finishingEfficiency: 1.07,
    cleanSheetRate: 0.38,
    bttsRate: 0.54,
    restDays: 6
  },
  'juv': {
    id: 'juv',
    name: "Juventus FC",

    shortName: "JUV",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/juv.png',
    color: '#000000',
    leaguePosition: 2,
    played: 5,
    won: 5,
    drawn: 1,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 3,
    points: 14,
    xG: 1.85,
    xGA: 0.65,
    formLast5: [
      {
            "result": "L",
            "opponent": "Parma Calcio 1913",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "W",
            "opponent": "AC Monza",
            "score": "2-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "Bologna 1909",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "SS Lazio",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Udinese Calcio",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 98,
    homeFormScore: 91,
    awayFormScore: 94,
    offensiveRating: 91,
    defensiveRating: 94,
    possessionAvg: 54.5,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.39,
    bttsRate: 0.54,
    restDays: 6
  },
  'acm': {
    id: 'acm',
    name: "AC Milan",

    shortName: "ACM",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/acm.png',
    color: '#FB090B',
    leaguePosition: 3,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 6,
    points: 12,
    xG: 2.05,
    xGA: 1.25,
    formLast5: [
      {
            "result": "L",
            "opponent": "Atalanta BC",
            "score": "0-1",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "Venezia",
            "score": "2-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "GenoaC",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-05"
      },
      {
            "result": "W",
            "opponent": "Bologna 1909",
            "score": "3-1",
            "isHome": true,
            "date": "2025-05-09"
      },
      {
            "result": "L",
            "opponent": "AS Roma",
            "score": "1-3",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 93,
    homeFormScore: 90,
    awayFormScore: 83,
    offensiveRating: 90,
    defensiveRating: 83,
    possessionAvg: 54.0,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'ata': {
    id: 'ata',
    name: "Atalanta BC",

    shortName: "ATA",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ata.png',
    color: '#1E71B8',
    leaguePosition: 4,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 6,
    points: 10,
    xG: 2.15,
    xGA: 1.2,
    formLast5: [
      {
            "result": "W",
            "opponent": "AC Milan",
            "score": "1-0",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "D",
            "opponent": "US Lecce",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "AC Monza",
            "score": "4-0",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "AS Roma",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-12"
      },
      {
            "result": "W",
            "opponent": "GenoaC",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 96,
    homeFormScore: 91,
    awayFormScore: 85,
    offensiveRating: 91,
    defensiveRating: 85,
    possessionAvg: 54.5,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.32,
    bttsRate: 0.54,
    restDays: 6
  },
  'nap': {
    id: 'nap',
    name: "SSC Napoli",

    shortName: "NAP",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/nap.png',
    color: '#12A0DC',
    leaguePosition: 5,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 10,
    goalsConceded: 5,
    points: 8,
    xG: 1.95,
    xGA: 0.95,
    formLast5: [
      {
            "result": "W",
            "opponent": "AC Monza",
            "score": "1-0",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "Torino",
            "score": "2-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "US Lecce",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "GenoaC",
            "score": "2-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "D",
            "opponent": "Parma Calcio 1913",
            "score": "0-0",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 97,
    homeFormScore: 89,
    awayFormScore: 88,
    offensiveRating: 89,
    defensiveRating: 88,
    possessionAvg: 53.5,
    finishingEfficiency: 1.04,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'laz': {
    id: 'laz',
    name: "SS Lazio",

    shortName: "LAZ",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/laz.png',
    color: '#87D8F7',
    leaguePosition: 6,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 6,
    points: 6,
    xG: 1.75,
    xGA: 1.15,
    formLast5: [
      {
            "result": "W",
            "opponent": "GenoaC",
            "score": "2-0",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "Parma Calcio 1913",
            "score": "2-2",
            "isHome": true,
            "date": "2025-04-28"
      },
      {
            "result": "W",
            "opponent": "Empoli",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "Juventus",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "D",
            "opponent": "FC Internazionale Milano",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 90,
    homeFormScore: 86,
    awayFormScore: 84,
    offensiveRating: 86,
    defensiveRating: 84,
    possessionAvg: 52.2,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.31,
    bttsRate: 0.54,
    restDays: 6
  },
  'fio': {
    id: 'fio',
    name: "ACF Fiorentina",

    shortName: "FIO",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/fio.png',
    color: '#4F2374',
    leaguePosition: 7,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 8,
    goalsConceded: 6,
    points: 4,
    xG: 1.7,
    xGA: 1.2,
    formLast5: [
      {
            "result": "W",
            "opponent": "Cagliari Calcio",
            "score": "2-1",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "W",
            "opponent": "Empoli",
            "score": "2-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "AS Roma",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Venezia",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-12"
      },
      {
            "result": "W",
            "opponent": "Bologna 1909",
            "score": "3-2",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 88,
    homeFormScore: 85,
    awayFormScore: 83,
    offensiveRating: 85,
    defensiveRating: 83,
    possessionAvg: 51.8,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'asr': {
    id: 'asr',
    name: "AS Roma",

    shortName: "ASR",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/asr.png',
    color: '#8E1F2F',
    leaguePosition: 8,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 6,
    points: 4,
    xG: 1.65,
    xGA: 1.15,
    formLast5: [
      {
            "result": "W",
            "opponent": "Hellas Verona",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "FC Internazionale Milano",
            "score": "1-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "ACF Fiorentina",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Atalanta BC",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-12"
      },
      {
            "result": "W",
            "opponent": "AC Milan",
            "score": "3-1",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 88,
    homeFormScore: 84,
    awayFormScore: 84,
    offensiveRating: 84,
    defensiveRating: 84,
    possessionAvg: 51.3,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.31,
    bttsRate: 0.54,
    restDays: 6
  },
  'tor': {
    id: 'tor',
    name: "Torino FC",

    shortName: "TOR",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/tor.png',
    color: '#8B1538',
    leaguePosition: 9,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 6,
    points: 4,
    xG: 1.35,
    xGA: 1.1,
    formLast5: [
      {
            "result": "W",
            "opponent": "Udinese Calcio",
            "score": "2-0",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "L",
            "opponent": "SSC Napoli",
            "score": "0-2",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "Venezia",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-02"
      },
      {
            "result": "L",
            "opponent": "FC Internazionale Milano",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "US Lecce",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 86,
    homeFormScore: 81,
    awayFormScore: 85,
    offensiveRating: 81,
    defensiveRating: 85,
    possessionAvg: 50.0,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.32,
    bttsRate: 0.54,
    restDays: 6
  },
  'bol': {
    id: 'bol',
    name: "Bologna FC 1909",

    shortName: "BOL",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/bol.png',
    color: '#1A2F50',
    leaguePosition: 10,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 6,
    points: 4,
    xG: 1.45,
    xGA: 1.15,
    formLast5: [
      {
            "result": "W",
            "opponent": "FC Internazionale Milano",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "D",
            "opponent": "Udinese Calcio",
            "score": "0-0",
            "isHome": false,
            "date": "2025-04-28"
      },
      {
            "result": "D",
            "opponent": "Juventus",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "AC Milan",
            "score": "1-3",
            "isHome": false,
            "date": "2025-05-09"
      },
      {
            "result": "L",
            "opponent": "ACF Fiorentina",
            "score": "2-3",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 86,
    homeFormScore: 82,
    awayFormScore: 84,
    offensiveRating: 82,
    defensiveRating: 84,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.31,
    bttsRate: 0.54,
    restDays: 6
  },
  'com': {
    id: 'com',
    name: "Como 1907",

    shortName: "COM",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/com.png',
    color: '#0A3B7B',
    leaguePosition: 11,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.4,
    xGA: 1.45,
    formLast5: [
      {
            "result": "W",
            "opponent": "US Lecce",
            "score": "3-0",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "GenoaC",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "Parma Calcio 1913",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Cagliari Calcio",
            "score": "3-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "D",
            "opponent": "Hellas Verona",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 75,
    homeFormScore: 79,
    awayFormScore: 76,
    offensiveRating: 79,
    defensiveRating: 76,
    possessionAvg: 49.0,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'gen': {
    id: 'gen',
    name: "Genoa CFC",

    shortName: "GEN",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/gen.png',
    color: '#AC1323',
    leaguePosition: 12,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.3,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "SS Lazio",
            "score": "0-2",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "L",
            "opponent": "Como 1907",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "AC Milan",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-05"
      },
      {
            "result": "D",
            "opponent": "SSC Napoli",
            "score": "2-2",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Atalanta BC",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 78,
    homeFormScore: 78,
    awayFormScore: 80,
    offensiveRating: 78,
    defensiveRating: 80,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.28,
    bttsRate: 0.54,
    restDays: 6
  },
  'udi': {
    id: 'udi',
    name: "Udinese Calcio",

    shortName: "UDI",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/udi.png',
    color: '#000000',
    leaguePosition: 13,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.4,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "Torino",
            "score": "0-2",
            "isHome": false,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "Bologna 1909",
            "score": "0-0",
            "isHome": true,
            "date": "2025-04-28"
      },
      {
            "result": "W",
            "opponent": "Cagliari Calcio",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "AC Monza",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Juventus",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 79,
    homeFormScore: 80,
    awayFormScore: 79,
    offensiveRating: 80,
    defensiveRating: 79,
    possessionAvg: 49.5,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'mon': {
    id: 'mon',
    name: "AC Monza",

    shortName: "MON",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/mon.png',
    color: '#E30613',
    leaguePosition: 14,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.2,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "SSC Napoli",
            "score": "0-1",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "Juventus",
            "score": "0-2",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Atalanta BC",
            "score": "0-4",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Udinese Calcio",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "L",
            "opponent": "Empoli",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 75,
    homeFormScore: 76,
    awayFormScore: 79,
    offensiveRating: 76,
    defensiveRating: 79,
    possessionAvg: 47.7,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'lec': {
    id: 'lec',
    name: "US Lecce",

    shortName: "LEC",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/lec.png',
    color: '#FFE600',
    leaguePosition: 15,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.15,
    xGA: 1.4,
    formLast5: [
      {
            "result": "L",
            "opponent": "Como 1907",
            "score": "0-3",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "Atalanta BC",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "SSC Napoli",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Hellas Verona",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-11"
      },
      {
            "result": "W",
            "opponent": "Torino",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 73,
    homeFormScore: 75,
    awayFormScore: 78,
    offensiveRating: 75,
    defensiveRating: 78,
    possessionAvg: 47.2,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'emp': {
    id: 'emp',
    name: "Empoli FC",

    shortName: "EMP",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/emp.png',
    color: '#005CA9',
    leaguePosition: 16,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.15,
    xGA: 1.2,
    formLast5: [
      {
            "result": "D",
            "opponent": "Venezia",
            "score": "2-2",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "ACF Fiorentina",
            "score": "1-2",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "SS Lazio",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Parma Calcio 1913",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "AC Monza",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 76,
    homeFormScore: 74,
    awayFormScore: 82,
    offensiveRating: 74,
    defensiveRating: 82,
    possessionAvg: 46.8,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'cag': {
    id: 'cag',
    name: "Cagliari Calcio",

    shortName: "CAG",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/cag.png',
    color: '#002B49',
    leaguePosition: 17,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.2,
    xGA: 1.5,
    formLast5: [
      {
            "result": "L",
            "opponent": "ACF Fiorentina",
            "score": "1-2",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "W",
            "opponent": "Hellas Verona",
            "score": "2-0",
            "isHome": false,
            "date": "2025-04-28"
      },
      {
            "result": "L",
            "opponent": "Udinese Calcio",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Como 1907",
            "score": "1-3",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Venezia",
            "score": "3-0",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 71,
    homeFormScore: 75,
    awayFormScore: 76,
    offensiveRating: 75,
    defensiveRating: 76,
    possessionAvg: 47.2,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'ver': {
    id: 'ver',
    name: "Hellas Verona FC",

    shortName: "VER",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ver.png',
    color: '#FED100',
    leaguePosition: 18,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.25,
    xGA: 1.55,
    formLast5: [
      {
            "result": "L",
            "opponent": "AS Roma",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "L",
            "opponent": "Cagliari Calcio",
            "score": "0-2",
            "isHome": true,
            "date": "2025-04-28"
      },
      {
            "result": "L",
            "opponent": "FC Internazionale Milano",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "US Lecce",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-11"
      },
      {
            "result": "D",
            "opponent": "Como 1907",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 70,
    homeFormScore: 76,
    awayFormScore: 74,
    offensiveRating: 76,
    defensiveRating: 74,
    possessionAvg: 47.7,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.23,
    bttsRate: 0.54,
    restDays: 6
  },
  'par': {
    id: 'par',
    name: "Parma Calcio 1913",

    shortName: "PAR",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/par.png',
    color: '#FFE500',
    leaguePosition: 19,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 7,
    goalsConceded: 8,
    points: 4,
    xG: 1.4,
    xGA: 1.65,
    formLast5: [
      {
            "result": "W",
            "opponent": "Juventus",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-23"
      },
      {
            "result": "D",
            "opponent": "SS Lazio",
            "score": "2-2",
            "isHome": false,
            "date": "2025-04-28"
      },
      {
            "result": "L",
            "opponent": "Como 1907",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Empoli",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "D",
            "opponent": "SSC Napoli",
            "score": "0-0",
            "isHome": true,
            "date": "2025-05-18"
      }
],
    formLast10Score: 71,
    homeFormScore: 78,
    awayFormScore: 73,
    offensiveRating: 78,
    defensiveRating: 73,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'ven': {
    id: 'ven',
    name: "Venezia FC",

    shortName: "VEN",

    leagueId: 'seriea',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ven.png',
    color: '#D9A74A',
    leaguePosition: 20,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 4,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.15,
    xGA: 1.65,
    formLast5: [
      {
            "result": "D",
            "opponent": "Empoli",
            "score": "2-2",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "AC Milan",
            "score": "0-2",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "Torino",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-02"
      },
      {
            "result": "W",
            "opponent": "ACF Fiorentina",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-12"
      },
      {
            "result": "L",
            "opponent": "Cagliari Calcio",
            "score": "0-3",
            "isHome": false,
            "date": "2025-05-18"
      }
],
    formLast10Score: 66,
    homeFormScore: 73,
    awayFormScore: 73,
    offensiveRating: 73,
    defensiveRating: 73,
    possessionAvg: 46.4,
    finishingEfficiency: 0.96,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'psg': {
    id: 'psg',
    name: "Paris Saint-Germain FC",

    shortName: "PSG",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/psg.png',
    color: '#004170',
    leaguePosition: 1,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 13,
    goalsConceded: 4,
    points: 16,
    xG: 2.55,
    xGA: 0.9,
    formLast5: [
      {
            "result": "D",
            "opponent": "FC Nantes",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-22"
      },
      {
            "result": "L",
            "opponent": "OGC Nice",
            "score": "1-3",
            "isHome": true,
            "date": "2025-04-25"
      },
      {
            "result": "L",
            "opponent": "RC Strasbourg Alsace",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Montpellier HSC",
            "score": "4-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "AJ Auxerre",
            "score": "3-1",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 98,
    homeFormScore: 96,
    awayFormScore: 89,
    offensiveRating: 96,
    defensiveRating: 89,
    possessionAvg: 56.7,
    finishingEfficiency: 1.08,
    cleanSheetRate: 0.35,
    bttsRate: 0.54,
    restDays: 6
  },
  'asm': {
    id: 'asm',
    name: "AS Monaco FC",

    shortName: "ASM",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/asm.png',
    color: '#E41B13',
    leaguePosition: 2,
    played: 5,
    won: 5,
    drawn: 1,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 5,
    points: 14,
    xG: 2.15,
    xGA: 1.05,
    formLast5: [
      {
            "result": "D",
            "opponent": "RC Strasbourg Alsace",
            "score": "0-0",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "Le Havre AC",
            "score": "1-1",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "AS Saint-\u00c9tienne",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Olympique Lyonnais",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Racing Club de Lens",
            "score": "0-4",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 98,
    homeFormScore: 91,
    awayFormScore: 87,
    offensiveRating: 91,
    defensiveRating: 87,
    possessionAvg: 54.5,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'om': {
    id: 'om',
    name: "Olympique de Marseille",

    shortName: "OM",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/om.png',
    color: '#009CD8',
    leaguePosition: 3,
    played: 5,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsScored: 11,
    goalsConceded: 6,
    points: 12,
    xG: 2.2,
    xGA: 1.25,
    formLast5: [
      {
            "result": "W",
            "opponent": "Montpellier HSC",
            "score": "5-1",
            "isHome": true,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "Stade Brestois 29",
            "score": "4-1",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "Lille OSC",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Le Havre AC",
            "score": "3-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Stade Rennais",
            "score": "4-2",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 93,
    homeFormScore: 90,
    awayFormScore: 83,
    offensiveRating: 90,
    defensiveRating: 83,
    possessionAvg: 54.0,
    finishingEfficiency: 1.05,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'lil': {
    id: 'lil',
    name: "Lille OSC",

    shortName: "LIL",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/lil.png',
    color: '#D01026',
    leaguePosition: 4,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 5,
    points: 10,
    xG: 1.85,
    xGA: 1.0,
    formLast5: [
      {
            "result": "W",
            "opponent": "AJ Auxerre",
            "score": "3-1",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "Angers SCO",
            "score": "2-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "D",
            "opponent": "Olympique de Marseille",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Stade Brestois 29",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Stade de Reims",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 95,
    homeFormScore: 87,
    awayFormScore: 88,
    offensiveRating: 87,
    defensiveRating: 88,
    possessionAvg: 52.6,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'nic': {
    id: 'nic',
    name: "OGC Nice",

    shortName: "NIC",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/nic.png',
    color: '#000000',
    leaguePosition: 5,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 5,
    points: 8,
    xG: 1.8,
    xGA: 1.0,
    formLast5: [
      {
            "result": "W",
            "opponent": "Angers SCO",
            "score": "2-1",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "Paris Saint-Germain",
            "score": "3-1",
            "isHome": false,
            "date": "2025-04-25"
      },
      {
            "result": "W",
            "opponent": "Stade de Reims",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-02"
      },
      {
            "result": "L",
            "opponent": "Stade Rennais",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Stade Brestois 29",
            "score": "6-0",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 93,
    homeFormScore: 86,
    awayFormScore: 87,
    offensiveRating: 86,
    defensiveRating: 87,
    possessionAvg: 52.2,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.34,
    bttsRate: 0.54,
    restDays: 6
  },
  'ol': {
    id: 'ol',
    name: "Olympique Lyonnais",

    shortName: "OL",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ol.png',
    color: '#002F6C',
    leaguePosition: 6,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    goalsScored: 9,
    goalsConceded: 7,
    points: 6,
    xG: 1.85,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "AS Saint-\u00c9tienne",
            "score": "1-2",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "Stade Rennais",
            "score": "4-1",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Racing Club de Lens",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "AS Monaco",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Angers SCO",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 87,
    homeFormScore: 86,
    awayFormScore: 81,
    offensiveRating: 86,
    defensiveRating: 81,
    possessionAvg: 52.2,
    finishingEfficiency: 1.03,
    cleanSheetRate: 0.29,
    bttsRate: 0.54,
    restDays: 6
  },
  'ren': {
    id: 'ren',
    name: "Stade Rennais FC 1901",

    shortName: "REN",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ren.png',
    color: '#E2001A',
    leaguePosition: 7,
    played: 5,
    won: 4,
    drawn: 2,
    lost: 0,
    goalsScored: 8,
    goalsConceded: 6,
    points: 4,
    xG: 1.7,
    xGA: 1.25,
    formLast5: [
      {
            "result": "W",
            "opponent": "FC Nantes",
            "score": "2-1",
            "isHome": true,
            "date": "2025-04-18"
      },
      {
            "result": "L",
            "opponent": "Olympique Lyonnais",
            "score": "1-4",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "Toulouse",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "OGC Nice",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Olympique de Marseille",
            "score": "2-4",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 86,
    homeFormScore: 84,
    awayFormScore: 82,
    offensiveRating: 84,
    defensiveRating: 82,
    possessionAvg: 51.3,
    finishingEfficiency: 1.02,
    cleanSheetRate: 0.3,
    bttsRate: 0.54,
    restDays: 6
  },
  'rcl': {
    id: 'rcl',
    name: "Racing Club de Lens",

    shortName: "RCL",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/rcl.png',
    color: '#ED1C24',
    leaguePosition: 8,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 5,
    points: 4,
    xG: 1.55,
    xGA: 1.0,
    formLast5: [
      {
            "result": "W",
            "opponent": "Stade Brestois 29",
            "score": "3-1",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "AJ Auxerre",
            "score": "0-4",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "Olympique Lyonnais",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "Toulouse",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "AS Monaco",
            "score": "4-0",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 89,
    homeFormScore: 83,
    awayFormScore: 86,
    offensiveRating: 83,
    defensiveRating: 86,
    possessionAvg: 50.9,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.33,
    bttsRate: 0.54,
    restDays: 6
  },
  'sdr': {
    id: 'sdr',
    name: "Stade de Reims",

    shortName: "SDR",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/sdr.png',
    color: '#D21530',
    leaguePosition: 9,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 7,
    points: 4,
    xG: 1.55,
    xGA: 1.35,
    formLast5: [
      {
            "result": "W",
            "opponent": "Toulouse",
            "score": "1-0",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "D",
            "opponent": "Montpellier HSC",
            "score": "0-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "OGC Nice",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-02"
      },
      {
            "result": "L",
            "opponent": "AS Saint-\u00c9tienne",
            "score": "0-2",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Lille OSC",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 82,
    homeFormScore: 82,
    awayFormScore: 80,
    offensiveRating: 82,
    defensiveRating: 80,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.28,
    bttsRate: 0.54,
    restDays: 6
  },
  'sb29': {
    id: 'sb29',
    name: "Stade Brestois 29",

    shortName: "SB29",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/sb29.png',
    color: '#ED1C24',
    leaguePosition: 10,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 6,
    points: 4,
    xG: 1.5,
    xGA: 1.2,
    formLast5: [
      {
            "result": "L",
            "opponent": "Racing Club de Lens",
            "score": "1-3",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "Olympique de Marseille",
            "score": "1-4",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "Montpellier HSC",
            "score": "1-0",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "Lille OSC",
            "score": "2-0",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "OGC Nice",
            "score": "0-6",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 85,
    homeFormScore: 81,
    awayFormScore: 84,
    offensiveRating: 81,
    defensiveRating: 84,
    possessionAvg: 50.0,
    finishingEfficiency: 1.0,
    cleanSheetRate: 0.31,
    bttsRate: 0.54,
    restDays: 6
  },
  'str': {
    id: 'str',
    name: "RC Strasbourg Alsace",

    shortName: "STR",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/str.png',
    color: '#009FE3',
    leaguePosition: 11,
    played: 5,
    won: 3,
    drawn: 2,
    lost: 1,
    goalsScored: 8,
    goalsConceded: 8,
    points: 4,
    xG: 1.65,
    xGA: 1.5,
    formLast5: [
      {
            "result": "D",
            "opponent": "AS Monaco",
            "score": "0-0",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "W",
            "opponent": "AS Saint-\u00c9tienne",
            "score": "3-1",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "Paris Saint-Germain",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "L",
            "opponent": "Angers SCO",
            "score": "1-2",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Le Havre AC",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 80,
    homeFormScore: 82,
    awayFormScore: 78,
    offensiveRating: 82,
    defensiveRating: 78,
    possessionAvg: 50.4,
    finishingEfficiency: 1.01,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
  'fcn': {
    id: 'fcn',
    name: "FC Nantes",

    shortName: "FCN",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/fcn.png',
    color: '#FFF200',
    leaguePosition: 12,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 6,
    points: 4,
    xG: 1.3,
    xGA: 1.25,
    formLast5: [
      {
            "result": "D",
            "opponent": "Paris Saint-Germain",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-22"
      },
      {
            "result": "D",
            "opponent": "Toulouse",
            "score": "0-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Angers SCO",
            "score": "0-1",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "AJ Auxerre",
            "score": "1-1",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "Montpellier HSC",
            "score": "3-0",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 79,
    homeFormScore: 78,
    awayFormScore: 81,
    offensiveRating: 78,
    defensiveRating: 81,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.29,
    bttsRate: 0.54,
    restDays: 6
  },
  'tfc': {
    id: 'tfc',
    name: "Toulouse FC",

    shortName: "TFC",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/tfc.png',
    color: '#4B2582',
    leaguePosition: 13,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 7,
    points: 4,
    xG: 1.35,
    xGA: 1.35,
    formLast5: [
      {
            "result": "L",
            "opponent": "Stade de Reims",
            "score": "0-1",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "D",
            "opponent": "FC Nantes",
            "score": "0-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "Stade Rennais",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "D",
            "opponent": "Racing Club de Lens",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "AS Saint-\u00c9tienne",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 78,
    homeFormScore: 79,
    awayFormScore: 79,
    offensiveRating: 79,
    defensiveRating: 79,
    possessionAvg: 49.0,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.27,
    bttsRate: 0.54,
    restDays: 6
  },
  'mon1': {
    id: 'mon1',
    name: "Montpellier HSC",

    shortName: "MON",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/mon1.png',
    color: '#002B49',
    leaguePosition: 14,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    goalsScored: 7,
    goalsConceded: 9,
    points: 4,
    xG: 1.35,
    xGA: 1.75,
    formLast5: [
      {
            "result": "L",
            "opponent": "Olympique de Marseille",
            "score": "1-5",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "Stade de Reims",
            "score": "0-0",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Stade Brestois 29",
            "score": "0-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Paris Saint-Germain",
            "score": "1-4",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "FC Nantes",
            "score": "0-3",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 71,
    homeFormScore: 78,
    awayFormScore: 73,
    offensiveRating: 78,
    defensiveRating: 73,
    possessionAvg: 48.6,
    finishingEfficiency: 0.99,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'aja': {
    id: 'aja',
    name: "AJ Auxerre",

    shortName: "AJA",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/aja.png',
    color: '#0055A5',
    leaguePosition: 15,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 2,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.3,
    xGA: 1.55,
    formLast5: [
      {
            "result": "L",
            "opponent": "Lille OSC",
            "score": "1-3",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "W",
            "opponent": "Racing Club de Lens",
            "score": "4-0",
            "isHome": false,
            "date": "2025-04-27"
      },
      {
            "result": "L",
            "opponent": "Le Havre AC",
            "score": "1-2",
            "isHome": true,
            "date": "2025-05-04"
      },
      {
            "result": "D",
            "opponent": "FC Nantes",
            "score": "1-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Paris Saint-Germain",
            "score": "1-3",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 72,
    homeFormScore: 77,
    awayFormScore: 75,
    offensiveRating: 77,
    defensiveRating: 75,
    possessionAvg: 48.1,
    finishingEfficiency: 0.98,
    cleanSheetRate: 0.24,
    bttsRate: 0.54,
    restDays: 6
  },
  'asse': {
    id: 'asse',
    name: "AS Saint-Étienne",

    shortName: "ASSE",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/asse.png',
    color: '#007A33',
    leaguePosition: 16,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 9,
    points: 4,
    xG: 1.2,
    xGA: 1.75,
    formLast5: [
      {
            "result": "W",
            "opponent": "Olympique Lyonnais",
            "score": "2-1",
            "isHome": true,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "RC Strasbourg Alsace",
            "score": "1-3",
            "isHome": false,
            "date": "2025-04-26"
      },
      {
            "result": "L",
            "opponent": "AS Monaco",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-03"
      },
      {
            "result": "W",
            "opponent": "Stade de Reims",
            "score": "2-0",
            "isHome": false,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Toulouse",
            "score": "2-3",
            "isHome": true,
            "date": "2025-05-17"
      }
],
    formLast10Score: 68,
    homeFormScore: 75,
    awayFormScore: 73,
    offensiveRating: 75,
    defensiveRating: 73,
    possessionAvg: 47.2,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.22,
    bttsRate: 0.54,
    restDays: 6
  },
  'ang': {
    id: 'ang',
    name: "Angers SCO",

    shortName: "ANG",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/ang.png',
    color: '#000000',
    leaguePosition: 17,
    played: 5,
    won: 1,
    drawn: 2,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 8,
    points: 4,
    xG: 1.15,
    xGA: 1.5,
    formLast5: [
      {
            "result": "L",
            "opponent": "OGC Nice",
            "score": "1-2",
            "isHome": false,
            "date": "2025-04-20"
      },
      {
            "result": "L",
            "opponent": "Lille OSC",
            "score": "0-2",
            "isHome": true,
            "date": "2025-04-27"
      },
      {
            "result": "W",
            "opponent": "FC Nantes",
            "score": "1-0",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "W",
            "opponent": "RC Strasbourg Alsace",
            "score": "2-1",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "L",
            "opponent": "Olympique Lyonnais",
            "score": "0-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 70,
    homeFormScore: 74,
    awayFormScore: 76,
    offensiveRating: 74,
    defensiveRating: 76,
    possessionAvg: 46.8,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.25,
    bttsRate: 0.54,
    restDays: 6
  },
  'hac': {
    id: 'hac',
    name: "Le Havre AC",

    shortName: "HAC",

    leagueId: 'ligue1',
    logo: 'https://images.fotmob.com/image_resources/logo/teamlogo/hac.png',
    color: '#89CFF0',
    leaguePosition: 18,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    goalsScored: 6,
    goalsConceded: 7,
    points: 4,
    xG: 1.15,
    xGA: 1.45,
    formLast5: [
      {
            "result": "L",
            "opponent": "Paris Saint-Germain",
            "score": "1-2",
            "isHome": false,
            "date": "2025-04-19"
      },
      {
            "result": "D",
            "opponent": "AS Monaco",
            "score": "1-1",
            "isHome": true,
            "date": "2025-04-26"
      },
      {
            "result": "W",
            "opponent": "AJ Auxerre",
            "score": "2-1",
            "isHome": false,
            "date": "2025-05-04"
      },
      {
            "result": "L",
            "opponent": "Olympique de Marseille",
            "score": "1-3",
            "isHome": true,
            "date": "2025-05-10"
      },
      {
            "result": "W",
            "opponent": "RC Strasbourg Alsace",
            "score": "3-2",
            "isHome": false,
            "date": "2025-05-17"
      }
],
    formLast10Score: 71,
    homeFormScore: 74,
    awayFormScore: 77,
    offensiveRating: 74,
    defensiveRating: 77,
    possessionAvg: 46.8,
    finishingEfficiency: 0.97,
    cleanSheetRate: 0.26,
    bttsRate: 0.54,
    restDays: 6
  },
};

export const TEAMS: Record<string, Team> = {
  ...BASE_TEAMS,
  ...EXTRA_LEAGUES_TEAMS
};

export function getSafeTeam(teamId: string, fallbackLeagueId: LeagueId): Team {
  if (TEAMS[teamId]) return TEAMS[teamId];
  const found = Object.values(TEAMS).find((t) => t.id === teamId || t.name.toLowerCase() === teamId.toLowerCase());
  if (found) return found;
  const leagueTeams = Object.values(TEAMS).filter(t => t.leagueId === fallbackLeagueId);
  return leagueTeams[0] || Object.values(TEAMS)[0];
}
