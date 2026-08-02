# 💻 Local Setup & Development Guide (Windows, macOS, Linux)

This guide provides step-by-step instructions to run, build, and develop **SoccerMatrix AI** locally on any desktop operating system.

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:

1. **Node.js**: Version `18.x` or `20.x` (LTS recommended). Check with `node -v`.
2. **NPM**: Version `9.x` or higher (comes with Node.js). Check with `npm -v`.
3. **Git**: For cloning the repository.
4. *(Optional)* **Docker & Docker Compose**: For containerized execution.

---

## 🚀 Operating System Specific Setup

### 🪟 Windows Setup

#### Option A: Using Windows PowerShell / Command Prompt
1. Open PowerShell as Administrator (optional, standard terminal works too).
2. Clone the repository:
   ```powershell
   git clone https://github.com/your-org/soccermatrix-ai.git
   cd soccermatrix-ai
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Set environment variables (optional):
   ```powershell
   Copy-Item .env.example .env
   ```
   Open `.env` in Notepad or VS Code and set `GEMINI_API_KEY=your_key_here`.
5. Run the dev server:
   ```powershell
   npm run dev
   ```
6. Access the application at `http://localhost:3000`.

#### Option B: Using Windows Subsystem for Linux (WSL2)
1. Open your Ubuntu / Linux terminal in WSL2.
2. Follow the standard Linux instructions below.

---

### 🍎 macOS Setup (Intel & Apple Silicon M1/M2/M3)

1. Open **Terminal**.
2. Install Node.js via Homebrew (if not already installed):
   ```bash
   brew install node
   ```
3. Clone and enter the repository directory:
   ```bash
   git clone https://github.com/your-org/soccermatrix-ai.git
   cd soccermatrix-ai
   ```
4. Install npm dependencies:
   ```bash
   npm install
   ```
5. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
6. Start the local development server:
   ```bash
   npm run dev
   ```
7. Open `http://localhost:3000` in Safari, Chrome, or Firefox.

---

### 🐧 Linux Setup (Ubuntu, Debian, Arch, Fedora)

1. Open your terminal.
2. Ensure Node.js and NPM are installed:
   ```bash
   # On Ubuntu/Debian:
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git

   # On Arch Linux:
   sudo pacman -S nodejs npm git
   ```
3. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/your-org/soccermatrix-ai.git
   cd soccermatrix-ai
   npm install
   ```
4. Launch dev server:
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:3000`.

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the project root directory:

```env
# Server Port (Defaults to 3000)
PORT=3000

# Node Environment
NODE_ENV=development

# Optional: Google Gemini API Key for deep AI match reports
GEMINI_API_KEY=AIzaSy...
```

*Note: If `GEMINI_API_KEY` is not set, the system falls back gracefully to high-accuracy algorithmic statistical report generation.*

---

## 🧪 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Runs the full-stack app (Express server + Vite middleware) on port `3000` |
| `npm run build` | Builds client assets via Vite and bundles server code to `dist/server.cjs` via `esbuild` |
| `npm run start` | Executes the compiled production bundle via `node dist/server.cjs` |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |

---

## 🔧 Troubleshooting Local Setup

- **Port 3000 Already in Use**:
  - Kill existing Node processes:
    - **Windows**: `stop-process -name node -force`
    - **macOS/Linux**: `pkill -f node` or `killall node`
- **TypeScript / Module Resolution Errors**:
  - Clear `node_modules` and re-install:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
