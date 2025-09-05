#!/bin/bash

# NBC Affiliate System Deployment Script
# This script helps deploy the frontend to Netlify and backend to Vercel

echo "🚀 NBC Affiliate System Deployment Script"
echo "=========================================="

# Check if required tools are installed
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        echo "   Install with: npm install -g $1"
        exit 1
    else
        echo "✅ $1 is installed"
    fi
}

echo "🔍 Checking required tools..."
check_tool "vercel"
check_tool "netlify"

# Get deployment URLs
echo ""
echo "📝 Please provide the following information:"
read -p "Enter your Vercel project name (or press Enter to use default): " VERCEL_PROJECT
read -p "Enter your Netlify site name (or press Enter to use default): " NETLIFY_SITE

# Set defaults if empty
if [ -z "$VERCEL_PROJECT" ]; then
    VERCEL_PROJECT="nbc-affiliate-backend"
fi

if [ -z "$NETLIFY_SITE" ]; then
    NETLIFY_SITE="nbc-affiliate-frontend"
fi

echo ""
echo "🎯 Deployment Configuration:"
echo "   Backend (Vercel): $VERCEL_PROJECT"
echo "   Frontend (Netlify): $NETLIFY_SITE"

# Deploy backend to Vercel
echo ""
echo "🚀 Deploying backend to Vercel..."
echo "   This will deploy your Node.js server to Vercel"
echo "   Make sure you have set up environment variables in Vercel dashboard"
echo ""
read -p "Continue with Vercel deployment? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo "✅ Backend deployed to Vercel!"
    echo "   Your backend URL will be: https://$VERCEL_PROJECT.vercel.app"
else
    echo "⏭️  Skipping Vercel deployment"
fi

# Build frontend
echo ""
echo "🔨 Building frontend..."
npm run build:app
if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Deploy frontend to Netlify
echo ""
echo "🌐 Deploying frontend to Netlify..."
echo "   This will deploy your React app to Netlify"
echo ""
read -p "Continue with Netlify deployment? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    netlify deploy --prod --dir=dist
    echo "✅ Frontend deployed to Netlify!"
else
    echo "⏭️  Skipping Netlify deployment"
fi

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "📋 Next Steps:"
echo "1. Update your Vercel environment variables:"
echo "   - FRONTEND_URL=https://your-netlify-domain.netlify.app"
echo "   - JWT_SECRET=your-secure-secret"
echo "   - EMAIL_USER=your-email@gmail.com"
echo "   - EMAIL_PASS=your-app-password"
echo ""
echo "2. Update your Netlify environment variables:"
echo "   - VITE_API_URL=https://your-vercel-project.vercel.app/api"
echo ""
echo "3. Test your deployment:"
echo "   - Visit your Netlify URL"
echo "   - Try submitting an affiliate application"
echo "   - Login to admin panel with admin@nbta.com.ng / admin123"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
