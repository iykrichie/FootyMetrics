# ⚽ FootyMetrics PRO ML - Predictive Football Analytics & AI Engine

FootyMetrics PRO ML is a full-stack, probabilistic football (soccer) match prediction and tactical intelligence application powered by a **Dixon-Coles bivariate Poisson model**, **Monte Carlo (10,000 iteration) simulations**, and **Google Gemini 2.5 Flash AI** for low-cost, token-efficient match analysis.

---

## 🚀 Key Features

- **⭐ Today's Top High-Confidence Predictions**: Dedicated showcase highlighting highest win probability edges, expected scorelines, and recommended outcomes.
- **Low-Cost AI & Token Optimization**: Powered by **Gemini 2.5 Flash** with response caching to eliminate redundant API token consumption.
- **Dixon-Coles & Monte Carlo Prediction Engine**: Calculates exact score probability matrices ($P(X=x, Y=y)$), 1X2 market odds, Double Chance (1X, 2X, 12), Both Teams To Score (GG/NG), Over/Under 2.5 goals, and Expected Goals (xG).
- **Gemini 2.5 Flash AI Tactical Breakdown**: Generates real-time, deep tactical match intelligence reports covering team form, tactical setups, key player matchups, rest cycles, weather/pitch impacts, and risk-adjusted insights.
- **Top 5 European Leagues Coverage**: English Premier League (EPL), La Liga, Serie A, Bundesliga, and Ligue 1.
- **Interactive Team Comparison**: Run head-to-head simulations across any two teams with 10k Monte Carlo trials.
- **ML Model Diagnostics Lab**: Feature importance weights, probability calibration plots, backtesting Brier scores, and log-loss metrics.
- **Responsive Fluid Design**: Fully responsive layout tailored for desktop, tablet, and mobile displays with light & dark theme support.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend / API**: Express.js server on Node.js (TypeScript type-stripping / esbuild ESM/CJS build target).
- **AI Integration**: `@google/genai` SDK using Gemini 3.6 Flash model.
- **Analytics Engine**: Dixon-Coles Poisson probability matrix & Monte Carlo simulation.

---

## 📁 Repository Structure

```text
├── src/
│   ├── components/            # UI Components (Header, Predictions, Standings, ML Lab, Footer, Modals)
│   ├── data/                  # Historical telemetry & mock database
│   ├── lib/                   # Dixon-Coles & Monte Carlo ML math engine
│   ├── types.ts               # Shared TypeScript interfaces & types
│   ├── App.tsx                # Main application component
│   └── main.tsx               # Client entrypoint
├── server.ts                  # Express server API endpoints & Vite middleware
├── README.md                  # Project overview
├── LOCAL_SETUP.md             # Guide for Windows, macOS, and Linux local execution
├── DEPLOYMENT.md              # Production deployment & Docker self-hosting instructions
└── MODEL_SPECIFICATION.md     # Dixon-Coles math model & Monte Carlo specifications
```

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/your-org/footymetrics-pro.git
cd footymetrics-pro

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional for AI reports)
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY if desired

# 4. Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📖 Further Documentation

- 💻 **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Detailed guide for setup on **Windows**, **macOS**, and **Linux**.
- 🐳 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production hosting with **Docker**, **Nginx**, **Cloud Run**, and **PM2**.
- 📊 **[MODEL_SPECIFICATION.md](./MODEL_SPECIFICATION.md)** - Mathematical documentation of Dixon-Coles model & Poisson distribution formulas.
