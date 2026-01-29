# Phase 5 - Production Deployment Guide

## 🚀 Quick Start Deployment (Vercel + Railway)

### Total Setup Time: 30-45 minutes
### Total Cost: ~$5/month

---

## Part 1: Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project

### Step 2: Create Database
1. Click "Create New"
2. Select "Database"
3. Choose "PostgreSQL"
4. Configure database
5. Copy connection string

### Step 3: Deploy Backend

```bash
# 1. Login to Railway CLI
npm install -g @railway/cli
railway login

# 2. Link project
railway link

# 3. Set environment variables
railway variables set DATABASE_URL=your_postgresql_url
railway variables set JWT_SECRET=your_secret_key
railway variables set FRONTEND_URL=https://your-domain.vercel.app
railway variables set NODE_ENV=production

# 4. Deploy
railway up
```

### Step 4: Get Backend URL
- Railway will provide: `https://your-app-xxxx.railway.app`
- Save this URL (you'll need it for frontend)

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository

### Step 2: Configure Frontend

Create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

### Step 3: Deploy to Vercel
```bash
# Option A: Using Git (Recommended)
git push origin main
# Vercel auto-deploys on push

# Option B: Using Vercel CLI
npm i -g vercel
vercel --prod
```

### Step 4: Add Environment Variable
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add: `VITE_API_URL=https://your-railway-backend-url`
4. Redeploy

---

## Part 3: Database Migration

### Step 1: Connect to Production Database

```bash
# Set production database URL
export DATABASE_URL=postgresql://user:pass@host/dbname

# Run migrations
npx prisma migrate deploy

# Seed database
npm run seed
```

---

## Part 4: Configure Custom Domain (Optional)

### For Vercel Frontend
1. Go to Vercel Dashboard
2. Project Settings → Domains
3. Add your domain
4. Update DNS records (follow Vercel's instructions)
5. Wait for SSL certificate (5-15 minutes)

### For Railway Backend
1. Go to Railway Project
2. Settings → Custom Domain
3. Add subdomain (e.g., `api.yourdomain.com`)
4. Update DNS records

---

## Part 5: Setup Monitoring

### Option A: Free Tools
```javascript
// Error Tracking: Sentry.io (free tier)
// Analytics: Google Analytics
// Uptime: UptimeRobot (free)
// Logs: Railway Dashboard
```

### Option B: Install Error Tracking

```bash
# Install Sentry
npm install @sentry/node @sentry/tracing

# Add to backend index.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

---

## Part 6: Final Checks

### Checklist Before Launch

```bash
# ✅ Test all endpoints
curl https://your-api.railway.app/
curl https://your-api.railway.app/api/pets

# ✅ Test frontend
# Visit https://your-app.vercel.app

# ✅ Test authentication
# Try login/register

# ✅ Test database
# Check if pets load

# ✅ Test file uploads
# Upload pet image in admin

# ✅ Monitor logs
# Check for errors
```

---

## Part 7: Post-Launch

### First 24 Hours
- Monitor for errors
- Check performance metrics
- Test all user flows
- Gather early feedback

### First Week
- Track user metrics
- Monitor server health
- Fix any critical issues
- Collect feedback

### Ongoing
- Daily log review
- Weekly performance report
- Monthly analytics
- Plan improvements

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
railway logs

# Verify environment variables
railway variables

# Check database connection
psql $DATABASE_URL -c "SELECT 1"
```

### Frontend won't load
```bash
# Check build
npm run build

# Check environment variables in Vercel
# Redeploy if changed
```

### Images not loading
```bash
# Check uploads directory exists
# Verify image URLs in database
# Test image upload in admin
```

### Database connection fails
```bash
# Verify DATABASE_URL is correct
# Check database is running
# Verify IP whitelist settings
```

---

## Cost Breakdown

