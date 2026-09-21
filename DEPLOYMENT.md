# 🐳 Self-Hosting & Production Deployment Guide

This guide covers how to deploy **SoccerMatrix AI** to production on Linux servers, Docker containers, Cloud Run, and PM2 process managers.

---

## 🏗 Containerized Deployment (Docker & Docker Compose)

The repository includes a production-ready, multi-stage `Dockerfile` and `docker-compose.yml` for self-hosted Linux VPS (Ubuntu, Debian, CentOS, AlmaLinux, AWS EC2, DigitalOcean, Hetzner) and local Docker testing.

### 📄 Dockerfile

The multi-stage Alpine build ensures minimal container footprint (~180MB) and hardened non-root execution:

```dockerfile
# Stage 1: Build & Bundle
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

RUN npm run build

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist

# Non-root user for security
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "dist/server.cjs"]
```

---

### 🐙 docker-compose.yml

```yaml
version: '3.8'

services:
  soccermatrix:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: soccermatrix_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - GEMINI_API_KEY=${GEMINI_API_KEY:-}
    env_file:
      - path: .env
        required: false
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

To launch with Docker Compose:
```bash
# 1. Start the container in detached mode
docker compose up -d --build

# 2. View running container logs
docker compose logs -f soccermatrix

# 3. Verify health & API readiness
curl -s http://localhost:3000/api/health
curl -s http://localhost:3000/api/fixtures/verification-status
```

---

## 🐧 Bare-Metal Linux Deployment (PM2 + Nginx)

If deploying directly on a Linux VPS (e.g. DigitalOcean, AWS EC2, Linode, Hetzner):

### 1. Install PM2 Globally
```bash
sudo npm install -g pm2
```

### 2. Build the Application
```bash
cd /var/www/soccermatrix-ai
npm ci
npm run build
```

### 3. Start Application with PM2
```bash
pm2 start dist/server.cjs --name "soccermatrix-ai" --env production
pm2 save
pm2 startup
```

---

### 🌐 Nginx Reverse Proxy & SSL Setup

Configure Nginx to proxy port `80` / `443` to `http://127.0.0.1:3000`:

`/etc/nginx/sites-available/soccermatrix`

```nginx
server {
    listen 80;
    server_name soccermatrix.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site & SSL via Certbot:
```bash
sudo ln -s /etc/nginx/sites-available/soccermatrix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Issue free Let's Encrypt SSL certificate
sudo certbot --nginx -d soccermatrix.yourdomain.com
```

---

## ☁️ Google Cloud Run Deployment

Deploy directly using Google Cloud SDK:

```bash
# Build & submit container image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/soccermatrix-app

# Deploy to Cloud Run
gcloud run deploy soccermatrix-app \
  --image gcr.io/YOUR_PROJECT_ID/soccermatrix-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars GEMINI_API_KEY="your_api_key_here"
```

---

## 🔒 Security Best Practices

1. **Keep Secrets Server-Side**: The `GEMINI_API_KEY` is never sent to the client browser. All Gemini requests are executed through `/api/analyze/*` server proxy routes.
2. **CORS & Rate Limiting**: Ensure reverse proxy or Express middleware restricts unauthorized cross-origin calls.
3. **Container Non-Root User**: In production Dockerfiles, consider switching to `USER node`.
