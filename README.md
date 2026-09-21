# ⚽ SoccerMatrix AI - Advanced Football Intelligence & Predictive Reasoning

SoccerMatrix AI is a full-stack, probabilistic football (soccer) match prediction and tactical intelligence application powered by a **Dixon-Coles bivariate Poisson model**, **Monte Carlo (10,000 iteration) simulations**, and **Google Gemini 3.6 Flash AI** with deep reasoning for low-cost, token-efficient match analysis.

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

## ⚡ Quick Start: Running Locally with Docker

The fastest way to test and run SoccerMatrix AI on your laptop without managing local Node.js or dependency environments is with **Docker Desktop**:

### 1. Launch with Docker Compose (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/your-org/soccermatrix-ai.git
cd soccermatrix-ai

# 2. Configure environment (optional, for Gemini AI match reports)
cp .env.example .env
# Edit .env and set GEMINI_API_KEY if desired

# 3. Build & start the container
docker compose up --build -d

# 4. Follow live server logs
docker compose logs -f
```

Open **`http://localhost:3000`** in your browser.

### 2. Standalone Docker CLI (Alternative)

```bash
# Build the Docker image
docker build -t soccermatrix-ai:latest .

# Run container on port 3000
docker run -d --name soccermatrix_app -p 3000:3000 --env-file .env soccermatrix-ai:latest

# Check container logs
docker logs -f soccermatrix_app
```

### 3. Verify & Test Your Local Docker Instance

Once the container is running, verify everything is working properly via terminal or browser:

```bash
# Test server health endpoint
curl -s http://localhost:3000/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Verify real football data integrity (Top 7 European leagues)
curl -s http://localhost:3000/api/fixtures/verification-status
# Expected: {"verifiedFixturesPolicy":"STRICT_OFFICIAL_ONLY","aiFabricationBlocked":true,"totalVerifiedFixtures":74,...}

# Query upcoming match predictions
curl -s "http://localhost:3000/api/fixtures?weekend=3"
```

To stop the container:
```bash
docker compose down
# Or if using standalone container:
docker stop soccermatrix_app && docker rm soccermatrix_app
```

---

## 💻 Alternative: Running with Local Node.js

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional)
cp .env.example .env

# 3. Start development server
npm run dev
```

Navigate to `http://localhost:3000`.

---

## 📖 Further Documentation

- 💻 **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Comprehensive guide for local laptop execution via **Docker Desktop** (Windows WSL2, macOS Intel/Apple Silicon, Linux) and native Node.js, including detailed testing procedures and troubleshooting.
- 🐳 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production hosting with **Docker**, **Nginx**, **Cloud Run**, and **PM2**.
- 📊 **[MODEL_SPECIFICATION.md](./MODEL_SPECIFICATION.md)** - Mathematical documentation of Dixon-Coles model & Poisson distribution formulas.
