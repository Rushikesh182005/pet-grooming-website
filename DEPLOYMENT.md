# Deployment Guide - Pet Grooming Website

This guide will help you deploy your MERN stack pet grooming website to free hosting platforms.

## Prerequisites

1. **GitHub Account** - For version control
2. **MongoDB Atlas Account** - For cloud database (free tier available)
3. **Vercel Account** - For frontend hosting (free tier)
4. **Render Account** - For backend hosting (free tier)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with read/write permissions
5. Get your connection string
6. Replace `your-username`, `your-password`, and `your-cluster` in the connection string

## Step 2: Deploy Backend to Render

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/pet-grooming-website.git
   git push -u origin main
   ```

2. **Deploy to Render**
   - Go to [Render](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `pet-grooming-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Plan**: `Free`

3. **Set Environment Variables**
   - Go to your service settings
   - Add these environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/pet-grooming?retryWrites=true&w=majority
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     PORT=10000
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://pet-grooming-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Update API Configuration**
   - In `frontend/src/config/api.js`, update the production URL:
   ```javascript
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com'
     : 'http://localhost:5000';
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset**: `Create React App`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be available at `https://your-project.vercel.app`

## Step 4: Update CORS Configuration

1. **Update Backend CORS**
   - In `backend/server.js`, update the CORS origin:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://your-frontend-domain.vercel.app']
       : 'http://localhost:3000',
     credentials: true
   }));
   ```

2. **Redeploy Backend**
   - Push changes to GitHub
   - Render will automatically redeploy

## Step 5: Test Your Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Visit your Render URL + `/api/services`
3. **Test Admin Login**: 
   - Go to `/admin/login`
   - Use credentials from README.md

## Alternative Free Hosting Options

### Frontend Alternatives:
- **Netlify**: Similar to Vercel, great for React apps
- **GitHub Pages**: Free static hosting
- **Firebase Hosting**: Google's hosting service

### Backend Alternatives:
- **Railway**: Great free tier, easy deployment
- **Cyclic**: Free tier with good performance
- **Heroku**: Free tier available (with limitations)
- **Firebase Functions**: Serverless functions

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure CORS origin is correctly set
   - Check that frontend URL is in the allowed origins

2. **MongoDB Connection Issues**
   - Verify connection string is correct
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure variable names match exactly

4. **Build Errors**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility

### Performance Tips:

1. **Enable MongoDB Atlas Performance Advisor**
2. **Use CDN for static assets**
3. **Implement caching strategies**
4. **Optimize images before upload**

## Security Considerations

1. **Change default admin credentials**
2. **Use strong JWT secrets**
3. **Enable HTTPS (automatic on Vercel/Render)**
4. **Set up proper CORS**
5. **Validate all inputs**
6. **Use environment variables for secrets**

## Monitoring

1. **Set up logging** (Render provides logs)
2. **Monitor performance** (Vercel Analytics)
3. **Set up error tracking** (Sentry, LogRocket)
4. **Database monitoring** (MongoDB Atlas)

## Cost Optimization

1. **Use free tiers efficiently**
2. **Monitor usage**
3. **Optimize database queries**
4. **Compress images and assets**

---

**Note**: Free tiers have limitations. For production use, consider upgrading to paid plans for better performance and reliability.
