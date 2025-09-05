#!/bin/bash

# NBC Affiliate System - Deployment Setup Script
# This script helps you set up the deployment environment

echo "🔧 NBC Affiliate System - Deployment Setup"
echo "=========================================="

# Install required tools
echo "📦 Installing deployment tools..."
echo ""

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Install Vercel CLI
echo "Installing Vercel CLI..."
npm install -g vercel

# Install Netlify CLI
echo "Installing Netlify CLI..."
npm install -g netlify-cli

echo ""
echo "✅ Deployment tools installed!"
echo ""

# Generate JWT secret
echo "🔐 Generating JWT secret..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
echo "Your JWT secret: $JWT_SECRET"
echo ""

# Create environment file for reference
echo "📝 Creating environment reference file..."
cat > .env.production << EOF
# Production Environment Variables
# Copy these to your Vercel and Netlify dashboards

# Backend (Vercel) Environment Variables:
NODE_ENV=production
JWT_SECRET=$JWT_SECRET
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=NBTA Affiliate System <noreply@nbta.com.ng>
FRONTEND_URL=https://your-netlify-domain.netlify.app

# Frontend (Netlify) Environment Variables:
NODE_ENV=production
VITE_API_URL=https://your-vercel-project.vercel.app/api
EOF

echo "✅ Environment reference file created: .env.production"
echo ""

echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. 🔑 Login to deployment platforms:"
echo "   vercel login"
echo "   netlify login"
echo ""
echo "2. 📋 Set up environment variables:"
echo "   - Copy variables from .env.production to Vercel dashboard"
echo "   - Copy variables from .env.production to Netlify dashboard"
echo ""
echo "3. 🚀 Deploy:"
echo "   ./deploy.sh"
echo ""
echo "4. 📚 Read the full guide:"
echo "   cat DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Setup complete! You're ready to deploy!"
