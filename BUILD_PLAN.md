# 🏗️ SoccerMatrix AI — End-to-End Rebuild Plan & Execution Blueprint

This document provides a step-by-step guide to rebuilding **SoccerMatrix AI** from scratch to completion. It outlines project structure, dependency setups, backend API routes, mathematical modeling layers, Gemini 3.6 Flash AI integration, and responsive frontend UI components.

---

## 📋 Executive Summary & System Architecture

**SoccerMatrix AI** is an advanced football intelligence platform designed for Top 5 European leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1).

### Core Architecture
- **Frontend Stack**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Recharts, Motion (Framer Motion).
- **Backend Stack**: Node.js + Express, `tsx` for dev runtime execution, `esbuild` for CommonJS production bundling (`dist/server.cjs`).
- **AI Intelligence Layer**: Google `@google/genai` SDK using `gemini-2.5-flash` / `gemini-3.6-flash` for explainable match reports, tactical breakdowns, and value edge detection.
- **Probabilistic Predictive Engine**: Dixon-Coles bivariate Poisson distribution model with low-count goal correlation parameter ($\rho$), weight-decayed team attack/defense ratings, and Monte Carlo simulations (10,000 iterations per match).

---

## 💻 System Requirements & Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` v10+ (or `bun` / `yarn`)
- **Port Requirement**: Binds to `http://0.0.0.0:3000`
- **Environment Key**: Optional `GEMINI_API_KEY` (Server proxies requests securely without exposing keys to the browser).

---

## 🛠️ Phase 1: Environment & Project Configuration

### Step 1.1: Package Manifest (`package.json`)
Create `package.json` specifying ESM module format and production build scripts using `esbuild`.

```json
{
  "name": "soccermatrix-ai",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "recharts": "^3.10.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2"
  }
}
```

### Step 1.2: Vite & TypeScript Setup (`vite.config.ts`, `tsconfig.json`)
- **`vite.config.ts`**: Configure React plugin and Tailwind v4 Vite integration.
- **`tsconfig.json`**: Set `moduleResolution: "bundler"`, `target: "ES2022"`, `jsx: "react-jsx"`, and `strict: true`.

### Step 1.3: Environment Variable Template (`.env.example`)
```env
# Server-side Gemini API key for explainable AI reasoning
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

---

## 📐 Phase 2: Data Schemas & Mathematical Engine

### Step 2.1: Global Type Definitions (`src/types.ts`)
Define fundamental domain models:
- `League`: Top 5 European leagues (`EPL`, `LALIGA`, `SERIE_A`, `BUNDESLIGA`, `LIGUE_1`).
- `Team`: Attack/Defense ratings, form guide (`W`, `D`, `L`), injuries, xG metrics.
- `Fixture`: Home/Away teams, match date, kickoff time, status, real-time live odds.
- `PredictionResult`: Home/Draw/Away probabilities, xG projection, Dixon-Coles parameters ($\lambda, \mu$), score matrix, value bets, Monte Carlo distribution.
- `MatchReport`: AI-generated tactical overview, key matchups, and probabilistic summary.

### Step 2.2: Mock Database & Historical Feeds (`src/data/mockDatabase.ts`, `src/utils/dateUtils.ts`)
- **Rolling Weekly Horizons**: Calendar and offset math calculating relative days (`D0` / Present Day through `D+7`, `D+8..D+14`, `D+15..D+21`).
- **D+7 Horizon Filters**: Filter matches dynamically by Present Day (`today`), D+7 (`d7_exact`), full 8-day rolling window (`d7`), or individual calendar offsets (`day_0`..`day_7`).
- Populate Top 5 league team rosters with calibrated attack strength $\alpha$, defense rating $\beta$, and expected goals xG averages.
- Generate fixture lists across 3 rolling weekly horizons (Current Week, Week +1, Week +2) with real-world dates matching current schedules.

### Step 2.3: Dixon-Coles & Monte Carlo Analytics Engine (`src/services/analyticsEngine.ts`)
1. **Dixon-Coles Poisson Correction Factor**:
   $$\tau(x, y, \lambda, \mu, \rho) = \begin{cases} 1 - \lambda \mu \rho & \text{if } x=0, y=0 \\ 1 + \lambda \rho & \text{if } x=1, y=0 \\ 1 + \mu \rho & \text{if } x=0, y=1 \\ 1 - \rho & \text{if } x=1, y=1 \\ 1 & \text{otherwise} \end{cases}$$
2. **Goal Matrix Calculation**: Calculate joint probabilities $P(X=x, Y=y) = \tau \cdot \frac{\lambda^x e^{-\lambda}}{x!} \cdot \frac{\mu^y e^{-\mu}}{y!}$ up to 7x7 scorelines.
3. **10,000 Iteration Monte Carlo Engine**: Simulate match outcomes to verify probability stability and output value edges against bookmaker market odds.

---

## ⚡ Phase 3: Full-Stack Express Server & Gemini Integration

### Step 3.1: Server Infrastructure (`server.ts`)
1. **Express Setup**: Bind JSON parsing body parser and API route handlers.
2. **Vite Development Middleware**: Mount Vite middleware when `process.env.NODE_ENV !== 'production'`.
3. **Production Static Fallback**: Serve compiled frontend assets from `dist/` directory in production.
4. **Endpoints**:
   - `GET /api/health`: Health status monitor.
   - `GET /api/ad-config`: Dynamically serve vertical ad banner text & sponsor telemetry.
   - `POST /api/generate-match-report`: Proxy requests to Google Gemini AI SDK.

### Step 3.2: Gemini AI Match Reasoning
Prompt structure sent to Gemini 3.6 Flash:
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// System instruction enforcing tactical analytical tone
const systemInstruction = `You are the lead tactical analyst and probabilistic match reporter for SoccerMatrix AI...`;
```

---

## 🎨 Phase 4: UI Design, Header & Fluid Responsive Shell

### Step 4.1: Modern Tailwind v4 Styling (`src/index.css`)
Configure font imports (Outfit, Plus Jakarta Sans) and responsive custom scrollbar utilities:
```css
@import "tailwindcss";

@layer utilities {
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
}
```

### Step 4.2: Fluid Header Navigation (`src/components/Header.tsx`)
- **Brand Logo & Title**: SoccerMatrix AI with emerald gradient highlight badge.
- **Forecast Horizon Pills**: Selector for Week 1 (Aug 2–8), Week 2 (Aug 9–15), Week 3 (Aug 16–22).
- **Control Group**: Data sync refresh button, VIP access modal trigger, and theme toggle (Light/Dark).
- **League Filter Carousel**: Horizontal fluid scrolling chips for Top 5 European Leagues.
- **Primary View Tabs**: Fixtures & Predictions, Top Algorithm Picks, Team Comparison, League Tables, ML Lab, AI Digest.

### Step 4.3: App Footer & Ad Banner (`src/components/Footer.tsx`, `src/components/VerticalAdBanner.tsx`)
- **Footer**: Clean copyright, owner admin trigger link, and disclaimers.
- **Vertical Ad Banner**: Sleek collapsible side-rail ad with customizable text and sponsor links.

---

## 🧩 Phase 5: Core App Views & Interactive Modules

### Step 5.1: Fixture Cards (`src/components/FixtureCard.tsx`)
- Displays team badges, form guides (`W-W-D-L-W`), kickoff time, and home/draw/away Poisson outcome bars.
- Highlights AI value edges when algorithm probability exceeds implied bookmaker odds.

### Step 5.2: Deep Match Analysis Drawer (`src/components/MatchAnalysisModal.tsx`)
- **Scoreline Matrix**: Heatmap visualization of most probable exact scores (e.g. 2-1, 1-1, 2-0).
- **Expected Goals Gauge**: Visual breakdown of offensive & defensive xG.
- **Gemini AI Match Script**: Real-time explainable tactical report detailing key matchups, press resistance, and set-piece threats.

### Step 5.3: Top High-Confidence Picks (`src/components/MatchPredictionsSummary.tsx`)
- Filtered showcase of highest win probability and highest value bets across selected matchweek.

### Step 5.4: Team Comparison Engine (`src/components/TeamComparisonView.tsx`)
- Head-to-head radar comparison charts, squad injury reports, and attack/defense strength ratings.

### Step 5.5: League Standings Table (`src/components/LeagueStandingsTable.tsx`)
- Full league standings table with points, goal difference, xG over/underperformance metrics, and form guides.

### Step 5.6: ML Model Lab (`src/components/MLModelLab.tsx`)
- Interactive slider controls allowing users to adjust Dixon-Coles parameters ($\alpha$ attack weight, $\beta$ defense weight, home advantage factor $\gamma$, low-count correlation $\rho$).

### Step 5.7: AI Tactical Digest (`src/components/AIReportsDigest.tsx`)
- Aggregated collection of AI-generated weekend match briefs and tactical insights.

### Step 5.8: Prediction Win/Loss History Ledger (`src/components/PredictionHistoryView.tsx`, `src/data/predictionHistoryData.ts`)
- **Historical Settled Ledger**: Tracks past match predictions against final scores across Top 5 leagues.
- **Audit & Performance KPI Tracking**: Calculates live strike rate (% win rate), total units staked, net profit/loss, ROI yield, and active winning streaks.
- **Visual Analytics**: Interactive cumulative P&L growth area chart and market-specific strike rate breakdowns (1X2, Over/Under 2.5, BTTS, Double Chance).
- **Interactive Prediction Logging**: Form allowing users to log new predictions or auto-populate upcoming matches, with automated win/loss evaluation.
- **Match Settlement & CSV Export**: Tools to enter actual full-time match scores to settle outcomes, plus one-click CSV export and benchmark resets.
- **API Endpoints**: `GET /api/predictions/history`, `POST /api/predictions/history`, `PUT /api/predictions/history/:id/settle`, `DELETE /api/predictions/history/:id`, `POST /api/predictions/history/reset`.

---

## 🔐 Phase 6: VIP Auth, Admin, & System Documentation

### Step 6.1: VIP Registration (`src/components/UserAuthModal.tsx`)
- Simple registration modal persisting user status in `localStorage` (`soccermatrix_vip_user`).

### Step 6.2: Admin Panel Modal (`src/components/AdminPanelModal.tsx`)
- Platform management modal for updating sponsor ad content, force refreshing data feeds, and testing Gemini API keys.

### Step 6.3: In-App Documentation (`src/components/DocsModal.tsx`, `src/components/ArchitectureDocs.tsx`)
- Comprehensive cross-platform developer setup guides (Windows, Mac, Linux), Docker deployment commands, and system architectural diagrams.

---

## 🚀 Phase 7: Assembly, Verification & Deployment Pipeline

### Step 7.1: Application Shell (`src/App.tsx`, `src/main.tsx`)
Connect state management, active tab routing, dark mode theme persistence, and modal overlays.

### Step 7.2: Build Verification
Execute linting and production bundling:
```bash
# 1. Type check
npm run lint

# 2. Build Vite assets + Bundle Express server with esbuild
npm run build

# 3. Test production launch
npm run start
```

### Step 7.3: Production Deployment
Deploy via Docker or Cloud Run:
```bash
docker build -t soccermatrix-ai .
docker run -p 3000:3000 soccermatrix-ai
```

---

*SoccerMatrix AI — Advanced Football Intelligence & Predictive Reasoning* ⚡
