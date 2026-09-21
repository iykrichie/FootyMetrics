# 💻 Local Setup & Testing Guide: Docker & Native Node.js

This comprehensive guide details the exact steps required to run, test, and develop **SoccerMatrix AI** locally on any laptop (macOS, Windows, or Linux) using **Docker & Docker Compose** as well as native Node.js.

---

## 📑 Table of Contents

1. [🐳 Running Locally with Docker (Recommended)](#-running-locally-with-docker-recommended)
   - [System Requirements](#system-requirements)
   - [Prerequisites](#prerequisites)
   - [Step-by-Step Quick Start](#step-by-step-quick-start)
   - [OS-Specific Docker Notes (macOS, Windows WSL2, Linux)](#os-specific-docker-notes)
2. [🧪 How to Test and Verify Your Local Docker Instance](#-how-to-test-and-verify-your-local-docker-instance)
   - [Automated API & Data Integrity Tests](#automated-api--data-integrity-tests)
   - [Interactive Browser UI Test Checklist](#interactive-browser-ui-test-checklist)
3. [🛠 Local Container Management & Debugging](#-local-container-management--debugging)
4. [🔧 Troubleshooting Docker on Local Laptops](#-troubleshooting-docker-on-local-laptops)
5. [💻 Alternative: Native Local Node.js Setup](#-alternative-native-local-nodejs-setup)

---

## 🐳 Running Locally with Docker (Recommended)

Running SoccerMatrix AI in Docker eliminates dependency mismatches, Node version conflicts, and build discrepancies. The container packages the compiled Vite client and Express server into a hardened, production-grade container.

### System Requirements

- **RAM**: Minimum 4 GB (8 GB+ recommended).
- **Disk Space**: ~1.5 GB free disk space for container images and build layers.
- **CPU Architecture**: Supports both `x86_64` (Intel/AMD) and `arm64` (Apple Silicon M1/M2/M3/M4, ARM Linux).

### Prerequisites

Ensure you have **Docker Desktop** (or Docker Engine on Linux) installed and running:

1. **Verify Docker Engine**:
   ```bash
   docker --version
   # Example output: Docker version 24.0.7 or later
   ```

2. **Verify Docker Compose**:
   ```bash
   docker compose version
   # Example output: Docker Compose version v2.23.0 or later
   ```

If not installed:
- **macOS**: Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) (select Apple Silicon or Intel chip).
- **Windows**: Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) (ensure WSL2 backend is enabled).
- **Linux**: Install via `sudo apt install docker.io docker-compose-v2` or the official Docker repository.

---

### Step-by-Step Quick Start

#### Step 1: Clone the Repository

Open your terminal (macOS/Linux terminal, Windows PowerShell, or WSL2):

```bash
git clone https://github.com/your-org/soccermatrix-ai.git
cd soccermatrix-ai
```

#### Step 2: Configure Environment Variables

Create your local `.env` configuration from the provided template:

```bash
cp .env.example .env
```

Open `.env` in any text editor:
```env
# Port on which the container server listens (default: 3000)
PORT=3000

# Node runtime environment
NODE_ENV=production

# Optional: Google Gemini API Key for deep AI match reports
# If omitted, SoccerMatrix AI automatically runs in algorithmic model mode
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Step 3: Build and Launch with Docker Compose

Run the following command in the project root directory:

```bash
docker compose up --build -d
```

**What this does:**
1. Executes the multi-stage `Dockerfile`:
   - Stage 1 (`builder`): Installs dependencies, compiles the Vite React client, and bundles the Express server to `dist/server.cjs` with `esbuild`.
   - Stage 2 (`runner`): Creates a lightweight Alpine runtime containing only production assets and starts the server under a secure non-root `node` user.
2. Binds container port `3000` to your laptop's `http://localhost:3000`.
3. Runs the container in the background (`-d`).

#### Step 4: Stream Container Logs

Verify that the application and background data sync pipelines initialized cleanly:

```bash
docker compose logs -f soccermatrix
```

You should see logs indicating:
- `Server running on port 3000`
- `[Verified Fixture Pipeline] Syncing verified match fixtures across Top 7 leagues...`
- `Synced 74 verified match fixtures across Top 7 European leagues`

#### Step 5: Access the Web App

Open your browser and navigate to:
```text
http://localhost:3000
```

---

### Alternative: Running with Standalone Docker CLI

If you prefer not using Docker Compose, run these two commands:

```bash
# 1. Build the Docker image
docker build -t soccermatrix:latest .

# 2. Run the container
docker run -d \
  --name soccermatrix_app \
  -p 3000:3000 \
  --env-file .env \
  soccermatrix:latest

# 3. View logs
docker logs -f soccermatrix_app
```

---

### OS-Specific Docker Notes

#### 🍎 macOS (Apple Silicon M1/M2/M3/M4 & Intel)
- The `Dockerfile` uses `node:20-alpine`, natively supported on both ARM64 (`darwin/arm64`) and x86_64.
- If running on Apple Silicon, Docker builds native ARM64 images automatically with zero emulation overhead.
- Ensure Docker Desktop has at least **2.5 GB of allocated memory** in *Settings > Resources*.

#### 🪟 Windows 10/11 (WSL2 / PowerShell)
- Recommended: Run inside a **WSL2** terminal (e.g. Ubuntu for Windows) for optimal file I/O speed.
- If using standard PowerShell:
  ```powershell
  Copy-Item .env.example .env
  docker compose up --build -d
  docker compose logs -f
  ```
- Make sure Docker Desktop has **"Use the WSL 2 based engine"** checked in *Settings > General*.

#### 🐧 Linux (Ubuntu, Debian, Fedora, Arch)
- Ensure your user account belongs to the `docker` group so you don't need `sudo`:
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```

---

## 🧪 How to Test and Verify Your Local Docker Instance

Follow this testing protocol on your laptop to verify that the container, API endpoints, Dixon-Coles Poisson model, and verified football data pipeline operate with 100% accuracy.

### Automated API & Data Integrity Tests

Open a new terminal window on your laptop and run these test commands against `http://localhost:3000`:

#### 1. Server Healthcheck Test
```bash
curl -s http://localhost:3000/api/health
```
**Expected Response:**
```json
{"status":"ok","timestamp":"2026-..."}
```

#### 2. Data Integrity & Verification Policy Test
Verify that the zero-fabrication data pipeline is active and verified matches are loaded across all Top 7 leagues:
```bash
curl -s http://localhost:3000/api/fixtures/verification-status
```
**Expected Response:**
```json
{
  "verifiedFixturesPolicy": "STRICT_OFFICIAL_ONLY",
  "aiFabricationBlocked": true,
  "totalVerifiedFixtures": 74,
  "allFixturesTracedToSource": true,
  "isDataUnavailable": false,
  "primarySource": "Official ESPN Scoreboard API",
  "top7LeaguesSupported": ["epl","laliga","bundesliga","seriea","ligue1","eredivisie","ligaportugal"],
  "leagueBreakdown": {
    "eredivisie": 9,
    "seriea": 13,
    "laliga": 10,
    "epl": 13,
    "ligue1": 9,
    "bundesliga": 10,
    "ligaportugal": 10
  }
}
```

#### 3. Match Slate Query Test
Query upcoming verified match fixtures:
```bash
curl -s "http://localhost:3000/api/fixtures?weekend=3"
```
**Validation:**
- Returns an array of real match fixtures with probabilities, xG calculations, and a complete `verification` metadata block (including `sourceEventId`, `sourceUrl`, and `verifiedAt`).

#### 4. Anti-Hallucination Rejection Test
Verify that the server strictly rejects analysis requests for fake or unverified fixtures:
```bash
curl -s -X POST http://localhost:3000/api/analyze/fake-fixture-id-99999
```
**Expected Response:**
```json
{
  "error": "FIXTURE_NOT_VERIFIED",
  "message": "Match fixture not found in verified dataset. Under strict data integrity rules, AI models cannot create fixture records or analyze unverified matches."
}
```

#### 5. Real Match Tactical Report Test
Trigger an analysis on any verified fixture (e.g. using an ID returned from test #3):
```bash
curl -s -X POST http://localhost:3000/api/analyze/verified_ligaportugal_401885423
```
**Validation:**
- Returns tactical analysis, probabilistic risk assessments, key matchups, and verification badges.

---

### Interactive Browser UI Test Checklist

Open `http://localhost:3000` in Google Chrome, Safari, or Firefox and verify:

1. **Header Badges**:
   - Confirm the green indicator **"Poisson v2.4"** is visible.
   - Confirm the green **"Verified Fixtures Only"** shield badge is displayed.
2. **Top High-Confidence Showcase**:
   - The top cards highlight highest win-probability picks with Dixon-Coles expected scorelines and probabilities.
3. **Table & Grid View Toggle**:
   - Switch between **Table View** and **Grid View** using the top-right toggle buttons.
4. **League Filters**:
   - Filter by **Premier League**, **La Liga**, **Bundesliga**, **Serie A**, **Ligue 1**, **Eredivisie**, and **Liga Portugal**.
   - Confirm each team displays its real logo badge, national flag, and verification chip with source event ID tooltip.
5. **Match Tactical Modal**:
   - Click on any match to open the **AI Match Intelligence Modal**.
   - Verify that probabilities (1X2, Over/Under, BTTS), Poisson matrix heatmaps, team comparison radars, and key tactical factors render cleanly.
6. **Dark / Light Mode**:
   - Toggle the theme icon in the top header to ensure high-contrast legibility across both themes.

---

## 🛠 Local Container Management & Debugging

Here are common Docker commands for managing your local container:

| Task | Command |
|---|---|
| **View Running Containers** | `docker compose ps` (or `docker ps`) |
| **Stream Live Logs** | `docker compose logs -f` |
| **Stop the Container** | `docker compose down` |
| **Stop and Remove Volumes** | `docker compose down -v` |
| **Restart Container** | `docker compose restart` |
| **Rebuild After Code Edits** | `docker compose up --build -d` |
| **Execute Shell Inside Container** | `docker compose exec soccermatrix sh` |
| **Inspect Container Resource Usage** | `docker stats soccermatrix_app` |
| **Trigger Live Data Refresh via API** | `curl -X POST http://localhost:3000/api/fixtures/sync-live` |

---

## 🔧 Troubleshooting Docker on Local Laptops

### 1. `Error response from daemon: Ports are not available: listen tcp 0.0.0.0:3000: bind: address already in use`
- **Cause**: Another service (or a previous Node process) is using port `3000`.
- **Solution**:
  - Identify and stop the process using port 3000:
    - **macOS / Linux**:
      ```bash
      lsof -i :3000
      kill -9 <PID>
      ```
    - **Windows (PowerShell)**:
      ```powershell
      Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
      ```
  - Alternatively, change the host port mapping in `docker-compose.yml`:
    ```yaml
    ports:
      - "3001:3000"  # Access via http://localhost:3001
    ```

### 2. `Cannot connect to the Docker daemon at unix:///var/run/docker.sock`
- **Cause**: Docker Desktop is not started.
- **Solution**: Open Docker Desktop from your Applications folder (macOS) or Start Menu (Windows) and wait until the status indicator turns green ("Engine running").

### 3. Build Fails on M1/M2/M3 Mac with Architecture Mismatch
- **Solution**: Ensure your Dockerfile does not hardcode `--platform=linux/amd64`. The provided `Dockerfile` uses standard `node:20-alpine`, which builds natively on Apple Silicon.

### 4. Container Exits Immediately with Status 1
- **Solution**: Check the error logs:
  ```bash
  docker compose logs soccermatrix
  ```
  If you recently changed dependencies, force a clean rebuild:
  ```bash
  docker compose build --no-cache
  docker compose up -d
  ```

---

## 💻 Alternative: Native Local Node.js Setup

If you prefer testing directly on your host machine without Docker:

### 1. Install Node.js
Ensure you have **Node.js 20+** installed:
```bash
node -v   # Should output v20.x or v22.x
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000`.

### 4. Test Production Bundle Locally
To test the exact production build locally without Docker:
```bash
# 1. Compile frontend & bundle backend
npm run build

# 2. Run production server bundle
npm run start
```
Open `http://localhost:3000`.
