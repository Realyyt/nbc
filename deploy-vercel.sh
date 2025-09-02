#!/bin/bash

# NBC Affiliate System - Vercel Deployment Script
echo "🚀 Starting Vercel deployment for NBC Affiliate System..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your PostgreSQL database (recommended: Supabase)"
echo "2. Configure environment variables in Vercel dashboard"
echo "3. Test your deployment"
echo "4. Update admin credentials"
echo ""
echo "📚 See VERCEL_DEPLOYMENT.md for detailed instructions"


