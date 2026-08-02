export type LeagueId = 'epl' | 'laliga' | 'bundesliga' | 'seriea' | 'ligue1';

export interface League {
  id: LeagueId;
  name: string;
  code: string;
  country: string;
  flag: string;
  badge: string;
  teamCount: number;
  matchesAnalyzed: number;
  averageGoals: number;
  season: string;
}

export interface MatchFormItem {
  result: 'W' | 'D' | 'L';
  opponent: string;
  score: string;
  isHome: boolean;
  date: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  leagueId: LeagueId;
  logo: string;
  color: string;
  leaguePosition: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsScored: number;
  goalsConceded: number;
  points: number;
  
  // Analytics Metrics
  xG: number;               // Expected Goals per match
  xGA: number;              // Expected Goals Against per match
  formLast5: MatchFormItem[];
  formLast10Score: number;  // 0 - 100 momentum score
  homeFormScore: number;    // 0 - 100
  awayFormScore: number;    // 0 - 100
  
  offensiveRating: number;  // 0 - 100 scale
  defensiveRating: number;  // 0 - 100 scale
  possessionAvg: number;    // e.g. 56.4%
  finishingEfficiency: number; // goals / xG ratio
  cleanSheetRate: number;   // 0 - 1
  bttsRate: number;         // Both teams to score rate 0 - 1
  restDays: number;
}

export interface H2HMeeting {
  id: string;
  date: string;
  competition: string;
  homeTeamName: string;
  awayTeamName: string;
  homeGoals: number;
  awayGoals: number;
}

export interface H2HSummary {
  totalMatches: number;
  homeWins: number;
  awayWins: number;
  draws: number;
  avgGoals: number;
  recentMeetings: H2HMeeting[];
}

export interface InfluencingFactors {
  injuriesAndAbsences: {
    homeTeamKeyAbsences: string[];
    awayTeamKeyAbsences: string[];
    severityRating: 'High' | 'Medium' | 'Low';
    description: string;
  };
  restAndSchedule: {
    homeRestDays: number;
    awayRestDays: number;
    homeMidweekFixture?: string;
    awayMidweekFixture?: string;
    fatigueAdvantage: 'home' | 'away' | 'even';
  };
  weatherAndPitch: {
    condition: string; // e.g., "Heavy Rain", "Clear Skies", "Strong Gusts"
    temperatureC: number;
    windSpeedKmh: number;
    pitchCondition: 'Fast / Wet' | 'Standard Dry' | 'Heavy Surface';
  };
  stakesAndMotivation: {
    homeStakes: string; // e.g. "UCL Spot Race"
    awayStakes: string; // e.g. "Relegation Battle"
    intensityLevel: 'Maximum' | 'High' | 'Moderate';
  };
  refereeProfile: {
    name: string;
    avgYellowsPerGame: number;
    avgRedsPerGame: number;
    strictness: 'Strict' | 'Moderate' | 'Lenient';
  };
}

export interface HistoricalTrendContext {
  rollingMonthsAnalyzed: number; // e.g. 6 months (Aug 2025 - Feb 2026)
  sampleMatchesCount: number; // e.g. 240 matches
  homeTeamXgTrend6Mo: number; // e.g. +0.24 xG change
  awayTeamXgTrend6Mo: number; // e.g. -0.12 xG change
  homeDefensiveTrend6Mo: 'Improving' | 'Stable' | 'Declining';
  awayDefensiveTrend6Mo: 'Improving' | 'Stable' | 'Declining';
  forecastHorizon: 'Week +1' | 'Week +2' | 'Week +3';
}

export interface ContributingFactor {
  factor: string;
  weight: number; // e.g. 0.28
  direction: 'home' | 'away' | 'neutral';
  description: string;
  category?: 'historical' | 'injury' | 'schedule' | 'tactical' | 'weather' | 'motivation';
}

export interface MarketPredictionItem {
  code: '1' | 'X' | '2' | '1X' | '2X' | '12' | 'GG' | 'NG' | 'Over 1.5' | 'Under 1.5' | 'Over 2.5' | 'Under 2.5' | 'Over 3.5' | 'Under 3.5';
  name: string;
  probability: number; // 0 - 100 %
  fairOdds: number;    // e.g. 1.35
  confidenceLevel: 'Very High' | 'High' | 'Medium' | 'Low';
}

export interface RecommendedBet {
  marketCode: string; // e.g. "1X", "Over 1.5", "1", "GG"
  marketName: string; // e.g. "Double Chance 1X (Arsenal or Draw)"
  selection: string;  // e.g. "Arsenal FC or Draw"
  confidenceScore: number; // e.g. 88%
  riskTier: 'Ultra Safe' | 'Low Risk' | 'Value Play' | 'Moderate Risk';
  fairOdds: number;
  reasoning: string;
}

export interface DetailedMarketPredictions {
  oneXTwo: {
    homeWin1: MarketPredictionItem;
    drawX: MarketPredictionItem;
    awayWin2: MarketPredictionItem;
  };
  doubleChance: {
    homeOrDraw1X: MarketPredictionItem;
    awayOrDraw2X: MarketPredictionItem;
    noDraw12: MarketPredictionItem;
  };
  bothTeamsToScore: {
    ggYes: MarketPredictionItem;
    ngNo: MarketPredictionItem;
  };
  goalTotals: {
    over1_5: MarketPredictionItem;
    under1_5: MarketPredictionItem;
    over2_5: MarketPredictionItem;
    under2_5: MarketPredictionItem;
    over3_5: MarketPredictionItem;
    under3_5: MarketPredictionItem;
  };
  bestRecommendedBet: RecommendedBet;
  secondaryRecommendedBets: RecommendedBet[];
}

export interface MatchMetrics {
  homeWinProb: number;      // 0 - 100
  drawProb: number;         // 0 - 100
  awayWinProb: number;      // 0 - 100
  
  homeExpectedGoals: number; // e.g. 1.85
  awayExpectedGoals: number; // e.g. 0.92
  
  over1_5Prob: number;       // 0 - 100
  over2_5Prob: number;       // 0 - 100
  over3_5Prob: number;       // 0 - 100
  bttsProb: number;          // 0 - 100
  cleanSheetHomeProb: number; // 0 - 100
  cleanSheetAwayProb: number; // 0 - 100
  
  confidenceScore: number;   // 0 - 100
  confidenceInterval: string; // e.g. "± 3.4%"
  modelUncertainty: 'Low' | 'Medium' | 'High';
  
  topFactors: ContributingFactor[];
  historicalContext?: HistoricalTrendContext;
  detailedMarkets?: DetailedMarketPredictions;
}

export interface Fixture {
  id: string;
  leagueId: LeagueId;
  weekendNumber: 1 | 2 | 3;
  kickoffDate: string;
  kickoffTime: string;
  venue: string;
  referee: string;
  
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: Team;
  awayTeam: Team;
  
  h2h: H2HSummary;
  metrics: MatchMetrics;
  influencingFactors?: InfluencingFactors;
  
  status: 'upcoming' | 'completed';
  result?: {
    homeGoals: number;
    awayGoals: number;
  };
}

export interface KeyMatchup {
  area: string;
  homePlayerOrGroup: string;
  awayPlayerOrGroup: string;
  verdict: string;
  advantage: 'home' | 'away' | 'even';
}

export interface AIMatchAnalysisReport {
  fixtureId: string;
  generatedAt: string;
  tacticalSummary: string;
  keyMatchups: KeyMatchup[];
  statisticalAnomalies: string[];
  upsetWatch: {
    isPotentialUpset: boolean;
    upsetProbability: number; // 0 - 100
    narrativeReasoning: string;
  };
  modelConfidenceAnalysis: string;
  keyTacticalDrivers: string[];
  predictedMatchFlow: string;
}

export interface ModelPerformanceMetrics {
  modelName: string;
  lastRetrained: string;
  accuracy: number;        // e.g. 68.4%
  logLoss: number;         // e.g. 0.892
  brierScore: number;      // e.g. 0.184
  calibrationScore: number; // e.g. 0.94
  testedMatchesCount: number;
  featureImportances: { feature: string; importance: number }[];
  calibrationPoints: { predictedProb: number; actualFreq: number }[];
  historicalAccuracyBySeason: { season: string; accuracy: number; brierScore: number }[];
}

export interface SystemJobLog {
  jobId: string;
  name: string;
  lastRun: string;
  status: 'SUCCESS' | 'RUNNING' | 'SCHEDULED' | 'FAILED';
  recordsProcessed: number;
  executionTimeMs: number;
  nextScheduledRun: string;
}
