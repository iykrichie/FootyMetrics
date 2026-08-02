# 🐳 Self-Hosting & Production Deployment Guide

This guide covers how to deploy **SoccerMatrix AI** to production on Linux servers, Docker containers, Cloud Run, and PM2 process managers.

---

## 🏗 Containerized Deployment (Docker & Docker Compose)

The easiest way to host SoccerMatrix AI on a self-hosted Linux VPS (Ubuntu, Debian, CentOS, AlmaLinux) is using Docker.

### 📄 Dockerfile

A production-ready multi-stage `Dockerfile`:

```dockerfile
# Step 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency locks
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build Vite frontend & Bundle Express server to dist/server.cjs
RUN npm run build

# Step 2: Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy compiled build output & production dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

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
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3
```

To launch with Docker Compose:
```bash
# 1. Start the container in detached mode
docker-compose up -d --build

# 2. View running container logs
docker-compose logs -f soccermatrix
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
