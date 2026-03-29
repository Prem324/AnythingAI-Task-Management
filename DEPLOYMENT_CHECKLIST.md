# Deployment Checklist

## Pre-Deployment

### Frontend (Vercel)
- [ ] Code committed and pushed to GitHub
- [ ] All environment variables documented in `.env.example`
- [ ] `vercel.json` configured correctly
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Vite configuration includes proper base path

### Backend (Render)
- [ ] Code committed and pushed to GitHub
- [ ] `.env.example` has all required variables documented
- [ ] `package.json` has `"start": "node server.js"` script
- [ ] CORS configured for production URLs
- [ ] Port dynamically set from `process.env.PORT`
- [ ] All dependencies in `package.json` (not just devDependencies)

### Database (MongoDB Atlas)
- [ ] Cluster created and running
- [ ] Database user created with strong password
- [ ] Network access configured (Allow access from anywhere or specific IPs)
- [ ] Connection string obtained and tested locally

---

## MongoDB Atlas Setup

- [ ] Visit https://www.mongodb.com/cloud/atlas
- [ ] Create account and project
- [ ] Create shared cluster (free tier)
- [ ] Create database user (username/password)
- [ ] Configure network access
- [ ] Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/task-management`

---

## Backend Deployment (Render)

- [ ] Create Render account at https://render.com
- [ ] Connect GitHub repository
- [ ] Create new Web Service from repository
- [ ] Configure:
  - Name: `taskmaster-api`
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Plan: Free (or Starter for always-on)
- [ ] Add Environment Variables:
  - `NODE_ENV`: `production`
  - `MONGO_URI`: From MongoDB Atlas
  - `JWT_SECRET`: Generate strong secret (32+ chars)
  - `JWT_EXPIRE`: `1h`
  - `JWT_COOKIE_EXPIRE`: `30`
  - `CORS_ORIGIN`: Leave empty for now, update after frontend deployed
- [ ] Deploy (takes 2-5 minutes)
- [ ] Test API: `curl https://your-api.onrender.com/api/v1`
- [ ] Copy API URL

---

## Frontend Deployment (Vercel)

- [ ] Create Vercel account at https://vercel.com
- [ ] Import GitHub repository
- [ ] Select framework: Vite
- [ ] Set root directory: `./frontend` (if monorepo)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add Environment Variables:
  - `VITE_API_URL`: Your Render API URL (`https://your-api.onrender.com/api/v1`)
- [ ] Deploy (takes 2-5 minutes)
- [ ] Copy frontend URL

---

## Post-Deployment Configuration

- [ ] Update Render `CORS_ORIGIN` with Vercel frontend URL
- [ ] Redeploy Render backend
- [ ] Test backend API response (should have correct CORS headers)
- [ ] Test frontend:
  - [ ] Can access frontend URL
  - [ ] Can register new user
  - [ ] Can login
  - [ ] Can create task
  - [ ] Can view tasks
  - [ ] Can update task
  - [ ] Can delete task (admin only)
  - [ ] No console errors (F12)
  - [ ] No network errors

---

## Testing Deployed Application

### Test Backend
```bash
# Test API health
curl https://your-api.onrender.com/api/v1

# Test CORS headers
curl -i -X OPTIONS https://your-api.onrender.com/api/v1/auth/login \
  -H "Origin: https://your-frontend.vercel.app" \
  -H "Access-Control-Request-Method: POST"

# Test login endpoint
curl -X POST https://your-api.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Test Frontend
1. Visit frontend URL in browser
2. Go through complete user flow:
   - Register → Login → Create Task → View Task → Update Task → Delete Task
3. Check browser console for any errors (F12 → Console)
4. Check network tab for failed requests (F12 → Network)

---

## Production Optimizations (Optional)

- [ ] Set up custom domain for frontend
- [ ] Set up custom domain for backend
- [ ] Enable SSL/TLS (automatic on Vercel & Render)
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Set up uptime monitoring (Pingdom, UptimeRobot)
- [ ] Configure MongoDB backup strategy
- [ ] Set up GitHub Actions for CI/CD (see `.github/workflows/deploy.yml`)

---

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Render logs for errors
- [ ] Check Vercel build logs
- [ ] Monitor MongoDB Atlas usage
- [ ] Test critical user flows

### Monthly Tasks
- [ ] Review error logs
- [ ] Update dependencies
- [ ] Check security vulnerabilities (npm audit)
- [ ] Backup important data

### Quarterly Tasks
- [ ] Review performance metrics
- [ ] Plan for scaling (if needed)
- [ ] Security audit
- [ ] User feedback review

---

## Troubleshooting Guide

### CORS Errors
**Problem**: Frontend can't communicate with backend
**Solution**:
1. Check `CORS_ORIGIN` in Render matches Vercel URL exactly
2. Verify `https://` not `http://`
3. Clear browser cache
4. Redeploy Render backend

### Database Connection Errors
**Problem**: Backend can't connect to MongoDB
**Solution**:
1. Verify connection string in `MONGO_URI`
2. Check MongoDB user password is correct
3. Verify MongoDB Atlas network access allows Render IP
4. Test connection locally first

### Frontend Showing Blank Page
**Problem**: Page loads but shows nothing
**Solution**:
1. Check browser console (F12) for errors
2. Verify `VITE_API_URL` environment variable is set
3. Check that API URL is reachable
4. Redeploy frontend

### API Returns 500 Errors
**Problem**: Backend returns server errors
**Solution**:
1. Check Render logs for error messages
2. Verify all environment variables are set correctly
3. Check JWT_SECRET is at least 32 characters
4. Verify MongoDB connection is working

---

## Rollback Plan

If something goes wrong:

### Vercel
1. Go to Deployments tab
2. Click previous successful deployment
3. Click "Redeploy" button
4. Frontend rolls back in 1 minute

### Render
1. Go to your service
2. Click "Deployments" tab
3. Find previous successful deployment
4. Click "Redeploy" button
5. Backend rolls back in 2-5 minutes

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/

---

## Deployment Status

- [ ] Database: _________________ (URL/Status)
- [ ] Backend: __________________ (URL/Status)
- [ ] Frontend: _________________ (URL/Status)
- [ ] Custom Domain (optional): _______________
- [ ] Date Deployed: _____________
- [ ] Last Updated: _____________

---

**Deployment Complete! Your app is now live on the internet! 🚀**
