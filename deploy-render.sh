#!/bin/bash

echo "🚀 Deploying NBC Affiliate System to Render"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for Render deployment"
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml not found!"
    exit 1
fi

echo "✅ Configuration files ready"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com"
echo "2. Sign up/Login with your GitHub account"
echo "3. Click 'New +' → 'Blueprint'"
echo "4. Connect your GitHub repository"
echo "5. Select this repository (nbc)"
echo "6. Render will automatically detect render.yaml"
echo "7. Click 'Apply' to deploy"
echo ""
echo "🔗 Your backend will be available at:"
echo "https://nbc-affiliate-backend.onrender.com"
echo ""
echo "📝 Don't forget to:"
echo "- Set up Gmail App Password for EMAIL_PASS"
echo "- Update frontend with new backend URL"
echo ""
echo "🎉 Deployment ready!"
