# TaskMaster - Deployment Guide (Vercel & Render)

## Overview

This guide provides step-by-step instructions to deploy:
- **Frontend**: React/Vite application on **Vercel**
- **Backend**: Express.js API on **Render**
- **Database**: MongoDB Atlas (Cloud)

---

## Prerequisites

Before deploying, you'll need:
1. GitHub account with repository pushed
2. Vercel account (free at https://vercel.com)
3. Render account (free at https://render.com)
4. MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)
5. Unique JWT secret for production

---

## Part 1: MongoDB Atlas Setup (Database)

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project
4. Create a cluster:
   - Click "Create" → Choose "Shared" (free tier)
   - Select region closest to you
   - Click "Create Cluster"
5. Wait 5-10 minutes for cluster to be ready

### Step 2: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Enter:
   - **Username**: taskmaster_user
   - **Password**: Generate strong password (copy it!)
   - **Database Permissions**: "Read and write to any database"
4. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (for development)
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Clusters" → Click "Connect"
2. Select "Drivers" → Node.js
3. Copy the connection string (looks like):
   ```
   mongodb+srv://taskmaster_user:PASSWORD@cluster.mongodb.net/task-management?retryWrites=true&w=majority
   ```
4. Replace:
   - `PASSWORD` with your database user password
   - Keep the database name `task-management`

**Save this connection string! You'll need it for Render.**

---

## Part 2: Backend Deployment on Render

### Step 1: Prepare Backend

1. Update `/backend/.env` with production values:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://taskmaster_user:YOUR_PASSWORD@cluster.mongodb.net/task-management?retryWrites=true&w=majority
   JWT_SECRET=generate_a_long_random_secret_at_least_32_characters_here
   JWT_EXPIRE=1h
   JWT_COOKIE_EXPIRE=30
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

2. Ensure `package.json` has start script:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

3. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

### Step 2: Deploy to Render

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Select your GitHub repository (connect if prompted)
4. Configure:
   - **Name**: taskmaster-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (for testing)

5. Click "Create Web Service" and wait for deployment

### Step 3: Add Environment Variables on Render

1. Go to your service → "Environment"
2. Add variables:
   ```
   NODE_ENV = production
   MONGO_URI = mongodb+srv://taskmaster_user:PASSWORD@cluster.mongodb.net/task-management?retryWrites=true&w=majority
   JWT_SECRET = your_32_character_secret_key
   JWT_EXPIRE = 1h
   JWT_COOKIE_EXPIRE = 30
   CORS_ORIGIN = https://your-frontend-url.vercel.app
   ```
3. Click "Save"

4. Wait for automatic redeploy (~2 minutes)

### Step 4: Test Backend API

1. Get your Render URL from the dashboard (looks like `https://taskmaster-api.onrender.com`)
2. Test with cURL:
   ```bash
   curl https://taskmaster-api.onrender.com/api/v1
   ```
3. Expected response:
   ```json
   {
     "success": true,
     "message": "Welcome to TaskMaster API v1"
   }
   ```

**Note**: Render free tier spins down after 15 minutes of inactivity. First request may take 30 seconds.

---

## Part 3: Frontend Deployment on Vercel

### Step 1: Prepare Frontend

1. Create `.env.local` in `/frontend` folder:
   ```
   VITE_API_URL=https://taskmaster-api.onrender.com/api/v1
   ```

2. Verify `frontend/vercel.json` exists with:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "routes": [
       {
         "src": "/[^.]+$",
         "dest": "/index.html"
       }
     ]
   }
   ```

3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add Vercel deployment config"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Vite
   - **Root Directory**: ./frontend (if monorepo)
   - **Build Command**: npm run build
   - **Output Directory**: dist

5. Click "Deploy" and wait (~2 minutes)

### Step 3: Add Environment Variables on Vercel

1. After deployment, go to project settings
2. Click "Environment Variables"
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://taskmaster-api.onrender.com/api/v1`
   - **Environments**: Production, Preview, Development
4. Click "Save"

5. Redeploy from Deployments tab

### Step 4: Test Frontend

1. Visit your Vercel URL (e.g., `https://taskmaster-frontend.vercel.app`)
2. Try:
   - Register new user
   - Login
   - Create task
   - View all tasks

---

## Configuration Summary

### Backend (Render)
```
URL: https://taskmaster-api.onrender.com
Environment Variables:
  - NODE_ENV: production
  - MONGO_URI: <your MongoDB connection string>
  - JWT_SECRET: <generate strong secret>
  - CORS_ORIGIN: https://your-vercel-url.vercel.app
```

### Frontend (Vercel)
```
URL: https://your-frontend.vercel.app
Environment Variables:
  - VITE_API_URL: https://taskmaster-api.onrender.com/api/v1
```

### Database (MongoDB Atlas)
```
Connection String: mongodb+srv://user:password@cluster.mongodb.net/task-management
```

---

## Troubleshooting

### Issue: "CORS Error" on Frontend
**Solution**: 
- Verify `CORS_ORIGIN` in Render matches your Vercel URL
- Make sure URL includes `https://`
- Wait 2 minutes after updating for changes to take effect

### Issue: "Cannot connect to database"
**Solution**:
- Verify MongoDB connection string is correct
- Check MongoDB Atlas has "Allow access from anywhere" enabled
- Verify username and password are correct

### Issue: "API shows 500 error"
**Solution**:
- Check Render logs (Logs tab)
- Verify all environment variables are set
- Check JWT_SECRET is at least 32 characters

### Issue: Frontend shows blank page
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify VITE_API_URL is set correctly
- Check that API URL is reachable from frontend

### Issue: Render service keeps spinning down
**Solution**: 
- This is normal on free tier
- Upgrade to paid plan for always-on service
- Or use alternative: Railway (similar pricing)

---

## Monitoring & Maintenance

### Check Backend Logs
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab
4. View real-time logs

### View Frontend Deployments
1. Go to Vercel dashboard
2. Click your project
3. View deployment history and logs

### Monitor Database
1. Go to MongoDB Atlas dashboard
2. View connection stats
3. Monitor usage (free tier: 5GB limit)

---

## Production Checklist

Before going live:
- [ ] MongoDB Atlas cluster created and secured
- [ ] Database user created with strong password
- [ ] Network access configured
- [ ] Render backend deployed with all env vars
- [ ] Backend API responding to requests
- [ ] Vercel frontend deployed
- [ ] Frontend environment variables set
- [ ] CORS configured correctly
- [ ] Login/Register working
- [ ] Tasks CRUD operations working
- [ ] No errors in browser console
- [ ] JWT secret is strong (32+ characters)
- [ ] All sensitive data in environment variables
- [ ] Rate limiting enabled on backend

---

## Scaling & Upgrades

### When to Upgrade MongoDB Atlas
- Current: 5GB shared cluster (free)
- Upgrade to: Dedicated cluster when approaching limit
- Estimated cost: $57/month for smallest dedicated

### When to Upgrade Render Backend
- Current: Free tier with 15-minute spin down
- Upgrade to: Starter ($7/month) for always-on
- Alternative: Railway.app (similar pricing)

### When to Upgrade Vercel Frontend
- Current: Free tier with generous limits
- Pro: $20/month for team/advanced features
- Usually not needed for small-medium projects

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions
5. Usually takes 24-48 hours to propagate

### Add Custom Domain to Render
1. Go to Render service settings
2. Click "Custom Domain"
3. Add your domain
4. Follow DNS instructions

---

## Continuous Deployment

Both Vercel and Render automatically redeploy when you:
1. Push to main branch on GitHub
2. Changes are detected automatically
3. Deployment happens in 1-5 minutes
4. No manual action needed!

---

## Quick Deploy Checklist

```bash
# 1. Setup MongoDB Atlas
# 2. Get MongoDB connection string

# 3. Update backend/.env with production values
# 4. Commit and push to GitHub
git add backend/.env
git commit -m "Update backend env for production"
git push origin main

# 5. Deploy backend on Render
# 6. Copy Render API URL

# 7. Update frontend/.env.local
# 8. Commit and push to GitHub
git add frontend/.env.local
git commit -m "Update frontend API URL for production"
git push origin main

# 9. Deploy frontend on Vercel
# 10. Test all features

# 11. Update Render CORS_ORIGIN with Vercel URL
# 12. Redeploy Render

# 13. Test again!
```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.mongodb.com/
- **Vite Docs**: https://vitejs.dev/
- **Express Docs**: https://expressjs.com/

---

## Next Steps

After successful deployment:
1. Set up custom domain
2. Configure SSL/TLS (automatic on Vercel & Render)
3. Set up monitoring and alerts
4. Consider upgrading to paid plans for production traffic
5. Implement automated backups for MongoDB

---

**Your TaskMaster application is now live on the web! 🚀**

For questions or issues, refer to the documentation or check provider logs.
