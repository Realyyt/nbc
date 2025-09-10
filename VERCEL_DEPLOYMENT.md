# Vercel Deployment Guide for NBC Affiliate System

## Overview
This guide will help you deploy your NBC Affiliate System to Vercel. The system has been adapted from SQLite to PostgreSQL to work with Vercel's serverless architecture.

## Prerequisites
1. Vercel account (free tier available)
2. PostgreSQL database (recommended: Supabase free tier)
3. Email service (Gmail, SendGrid, etc.)

## Step 1: Set Up PostgreSQL Database

### Option A: Supabase (Recommended - Free)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the schema from `database/schema.sql`
4. Copy your database connection string

### Option B: Other PostgreSQL Providers
- Railway, Neon, or any PostgreSQL provider
- Run the schema from `database/schema.sql`

## Step 2: Configure Environment Variables

In your Vercel project dashboard, add these environment variables:

```bash
# Required
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://username:password@host:port/database

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL
FRONTEND_URL=https://your-domain.vercel.app

# Optional (with defaults)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
HELMET_ENABLED=true
COMPRESSION_ENABLED=true
MORGAN_LOGGING=combined
DEFAULT_COMMISSION_RATE=0.10
MIN_COMMISSION_AMOUNT=10.00
```

## Step 3: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Method 2: GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on every push

### Method 3: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings and deploy

## Step 4: Build Configuration

Vercel will automatically detect your project structure:
- **Frontend**: Built from `package.json` using `@vercel/static-build`
- **API**: Serverless functions in `/api` directory
- **Routes**: Configured in `vercel.json`

## Step 5: Database Setup

After deployment, your database tables will be created automatically when the first API call is made. The default admin credentials are:

- **Email**: admin@nbc.com
- **Password**: admin123

**⚠️ IMPORTANT**: Change these credentials immediately after first login!

## Step 6: Test Your Deployment

1. **Health Check**: `https://your-domain.vercel.app/api/health`
2. **Admin Login**: `https://your-domain.vercel.app/admin/login`
3. **Affiliate Application**: `https://your-domain.vercel.app/affiliate-application`

## Step 7: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update `FRONTEND_URL` environment variable

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check if database is accessible from Vercel's servers
- Ensure SSL is properly configured

#### 2. Build Failures
- Check if all dependencies are in `package.json`
- Verify TypeScript compilation
- Check build logs in Vercel dashboard

#### 3. API Routes Not Working
- Verify `vercel.json` configuration
- Check if API functions are in `/api` directory
- Review function logs in Vercel dashboard

#### 4. Environment Variables Not Loading
- Ensure variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly

### Debug Commands

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy
vercel --prod --force
```

## Performance Optimization

### 1. Database Connection Pooling
The current setup creates new connections for each request. For production, consider:
- Using connection pooling services
- Implementing connection reuse
- Adding connection limits

### 2. Caching
- Implement Redis for session storage
- Add response caching for static data
- Use Vercel's edge caching

### 3. Monitoring
- Set up Vercel Analytics
- Monitor function execution times
- Track database query performance

## Security Considerations

### 1. JWT Secret
- Use a strong, random JWT secret
- Rotate secrets regularly
- Never commit secrets to version control

### 2. Rate Limiting
- Current setup: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Adjust based on your needs

### 3. CORS
- Configured for your domain only
- Update `FRONTEND_URL` when changing domains

### 4. Database Security
- Use connection pooling
- Implement query parameterization (already done)
- Regular security updates

## Scaling Considerations

### 1. Serverless Limits
- Function timeout: 10 seconds (free), 60 seconds (pro)
- Memory: 1024 MB (free), 3008 MB (pro)
- Concurrent executions: 1000 (free), unlimited (pro)

### 2. Database Scaling
- Monitor connection limits
- Consider read replicas for heavy traffic
- Implement connection pooling

### 3. Cost Optimization
- Monitor function execution times
- Optimize database queries
- Use edge functions where possible

## Maintenance

### 1. Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update environment variables as needed

### 2. Backup Strategy
- Regular database backups
- Version control for code
- Environment variable backups

### 3. Monitoring
- Set up alerts for errors
- Monitor performance metrics
- Track user activity

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review function logs
3. Check database connectivity
4. Verify environment variables
5. Test locally first

## Next Steps

After successful deployment:
1. Test all functionality
2. Set up monitoring
3. Configure custom domain
4. Implement backup strategy
5. Plan scaling strategy

Your affiliate system is now ready for production use on Vercel! 🚀

