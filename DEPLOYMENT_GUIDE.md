# 🚀 NBC Affiliate System Deployment Guide

This guide will help you deploy the NBC Affiliate System with:
- **Frontend (React)**: Deployed on Netlify
- **Backend (Node.js)**: Deployed on Vercel
- **Database**: SQLite (included with Vercel)

## 📋 Prerequisites

- GitHub repository with your code
- Netlify account
- Vercel account
- Domain name (optional)

## 🎯 Step 1: Deploy Backend to Vercel

### 1.1 Prepare Backend for Vercel

The backend is already configured for Vercel deployment with:
- ✅ `vercel.json` configuration
- ✅ ESM module support
- ✅ SQLite database setup
- ✅ Environment variables ready

### 1.2 Deploy to Vercel

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy from your project directory**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard**:
   Go to your Vercel project → Settings → Environment Variables and add:

   ```env
   NODE_ENV=production
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=NBTA Affiliate System <noreply@nbta.com.ng>
   FRONTEND_URL=https://your-netlify-domain.netlify.app
   ```

### 1.3 Get Vercel Backend URL

After deployment, you'll get a URL like:
```
https://your-project-name.vercel.app
```

## 🎨 Step 2: Deploy Frontend to Netlify

### 2.1 Update Frontend API Configuration

Update your frontend to point to the Vercel backend:

1. **Update `src/lib/api.ts`**:
   ```typescript
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-project-name.vercel.app/api'
     : 'http://localhost:3001/api';
   ```

### 2.2 Build Frontend

```bash
npm run build:app
```

### 2.3 Deploy to Netlify

**Option A: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Option B: Netlify Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   - **Build command**: `npm run build:app`
   - **Publish directory**: `dist`
5. Deploy

### 2.4 Set Environment Variables in Netlify

Go to Site settings → Environment variables and add:
```env
NODE_ENV=production
VITE_API_URL=https://your-project-name.vercel.app/api
```

## 🔧 Step 3: Configure CORS

Update your Vercel backend to allow your Netlify frontend:

In Vercel Environment Variables, set:
```env
FRONTEND_URL=https://your-netlify-domain.netlify.app
```

## 🗄️ Step 4: Database Setup

The SQLite database will be automatically created on Vercel when the first request is made. The database includes:
- ✅ Affiliate applications table
- ✅ Affiliates table
- ✅ Admin users table
- ✅ Default admin user (admin@nbta.com.ng / admin123)

## 🔐 Step 5: Security Configuration

### 5.1 Generate Secure JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5.2 Email Configuration
For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 🧪 Step 6: Testing

### 6.1 Test Backend
```bash
curl https://your-project-name.vercel.app/api/health
```

### 6.2 Test Frontend
1. Visit your Netlify URL
2. Try submitting an affiliate application
3. Login to admin panel with:
   - Email: `admin@nbta.com.ng`
   - Password: `admin123`

## 📊 Step 7: Monitoring

### 7.1 Vercel Monitoring
- Check Vercel dashboard for function logs
- Monitor API performance
- Set up alerts for errors

### 7.2 Netlify Monitoring
- Check Netlify dashboard for build status
- Monitor site performance
- Set up form notifications

## 🔄 Step 8: Updates and Maintenance

### 8.1 Backend Updates
```bash
# Make changes to server code
vercel --prod
```

### 8.2 Frontend Updates
```bash
# Make changes to frontend code
npm run build:app
netlify deploy --prod --dir=dist
```

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check `FRONTEND_URL` in Vercel environment variables
   - Ensure it matches your Netlify domain exactly

2. **Database Issues**:
   - SQLite database is created automatically
   - Check Vercel function logs for database errors

3. **Email Not Working**:
   - Verify email credentials in Vercel environment variables
   - Check Gmail App Password setup

4. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Check Netlify build logs
3. Test API endpoints directly
4. Verify environment variables

## 🎉 Success!

Once deployed, your affiliate system will be available at:
- **Frontend**: `https://your-netlify-domain.netlify.app`
- **Backend API**: `https://your-project-name.vercel.app/api`
- **Admin Panel**: `https://your-netlify-domain.netlify.app/admin/login`

The system will handle:
- ✅ Affiliate applications
- ✅ Admin approval workflow
- ✅ Email notifications
- ✅ Affiliate dashboard
- ✅ Commission tracking
