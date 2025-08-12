# Pet Grooming Website Deployment Script for PowerShell
Write-Host "🚀 Pet Grooming Website Deployment Script" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Step 1: Build Frontend
Write-Host "`n🔨 Building frontend for production..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend build completed successfully!" -ForegroundColor Green

# Step 2: Initialize Git (if not already done)
Set-Location ..
if (-not (Test-Path ".git")) {
    Write-Host "`n📁 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit for deployment"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "`n📁 Git repository already exists" -ForegroundColor Yellow
    git add .
    git commit -m "Update for deployment"
}

Write-Host "`n🎉 Build and Git setup completed successfully!" -ForegroundColor Green
Write-Host "`n📋 Next Steps for Deployment:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository at: https://github.com/new" -ForegroundColor White
Write-Host "2. Push your code to GitHub:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/pet-grooming-website.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host "`n3. Deploy Backend to Render:" -ForegroundColor White
Write-Host "   - Go to: https://render.com" -ForegroundColor Gray
Write-Host "   - Create new Web Service" -ForegroundColor Gray
Write-Host "   - Connect your GitHub repo" -ForegroundColor Gray
Write-Host "   - Build Command: cd backend && npm install" -ForegroundColor Gray
Write-Host "   - Start Command: cd backend && npm start" -ForegroundColor Gray
Write-Host "`n4. Deploy Frontend to Vercel:" -ForegroundColor White
Write-Host "   - Go to: https://vercel.com" -ForegroundColor Gray
Write-Host "   - Import your GitHub repo" -ForegroundColor Gray
Write-Host "   - Root Directory: frontend" -ForegroundColor Gray
Write-Host "`n5. Set up MongoDB Atlas:" -ForegroundColor White
Write-Host "   - Go to: https://mongodb.com/atlas" -ForegroundColor Gray
Write-Host "   - Create free cluster" -ForegroundColor Gray
Write-Host "   - Get connection string" -ForegroundColor Gray
Write-Host "   - Add to Render environment variables" -ForegroundColor Gray
Write-Host "`n📖 See DEPLOYMENT.md for detailed instructions" -ForegroundColor Cyan
