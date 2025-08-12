#!/bin/bash

echo "🚀 Pet Grooming Website Deployment Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "📁 Git repository already exists"
fi

# Build frontend for production
echo "🔨 Building frontend for production..."
cd frontend
npm run build
cd ..

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/pet-grooming-website.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set build command: cd backend && npm install"
echo "   - Set start command: cd backend && npm start"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repo"
echo "   - Set root directory to 'frontend'"
echo ""
echo "4. Set up MongoDB Atlas:"
echo "   - Create free cluster at https://mongodb.com/atlas"
echo "   - Get connection string"
echo "   - Add to Render environment variables"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
