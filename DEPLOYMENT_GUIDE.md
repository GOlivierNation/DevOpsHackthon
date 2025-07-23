# 🚀 DevOps Hackathon Pipeline - Deployment Guide

## 📋 **Prerequisites**

Before deploying, ensure you have:
- GitHub account
- Git installed locally
- Node.js 18+ installed
- Docker installed (optional, for local testing)

## 🎯 **Free Deployment Options**

### **Option 1: Vercel (Recommended)**
- ✅ **Free tier**: Unlimited personal projects
- ✅ **Perfect for**: Next.js applications
- ✅ **Features**: Auto-deploy, custom domains, serverless functions

### **Option 2: Railway**
- ✅ **Free tier**: $5/month credit
- ✅ **Features**: Full-stack apps, databases, Docker support

### **Option 3: Render**
- ✅ **Free tier**: Static sites and web services
- ✅ **Features**: Auto-deploy from Git

---

## 📂 **Step 1: Set Up GitHub Repository**

1. **Clone/Fork the repository:**
   \`\`\`bash
   git clone https://github.com/GOlivierNation/DevOpsHackthon.git
   cd DevOpsHackthon
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Test locally:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Visit: http://localhost:3000

---

## 🚀 **Step 2: Deploy to Vercel (Recommended)**

### **Method A: Vercel CLI**
1. **Install Vercel CLI:**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login to Vercel:**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy:**
   \`\`\`bash
   vercel --prod
   \`\`\`

### **Method B: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `GOlivierNation/DevOpsHackthon`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
5. Click "Deploy"

---

## 🚂 **Step 3: Deploy to Railway (Alternative)**

1. **Install Railway CLI:**
   \`\`\`bash
   npm install -g @railway/cli
   \`\`\`

2. **Login:**
   \`\`\`bash
   railway login
   \`\`\`

3. **Initialize and deploy:**
   \`\`\`bash
   railway init
   railway up
   \`\`\`

---

## 🎨 **Step 4: Deploy to Render (Alternative)**

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `GOlivierNation/DevOpsHackthon`
4. Configure:
   - **Name**: devops-hackathon-pipeline
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click "Create Web Service"

---

## ⚙️ **Step 5: Environment Variables Configuration**

### **Required Environment Variables:**

\`\`\`bash
# AWS Configuration (Optional - for AWS Console integration)
AWS_REGION=us-west-2
AWS_ACCOUNT_ID=123456789012
EKS_CLUSTER_NAME=production-cluster

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app-url.vercel.app
\`\`\`

### **Setting Environment Variables:**

#### **Vercel:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable with its value
3. Redeploy the application

#### **Railway:**
\`\`\`bash
railway variables set AWS_REGION=us-west-2
railway variables set AWS_ACCOUNT_ID=123456789012
railway variables set EKS_CLUSTER_NAME=production-cluster
\`\`\`

#### **Render:**
1. Go to Render Dashboard → Your Service → Environment
2. Add environment variables
3. Save changes (auto-redeploys)

---

## 🔧 **Step 6: GitHub Actions Setup (Optional)**

1. **Create GitHub Secrets:**
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Add secrets:
     \`\`\`
     VERCEL_TOKEN=your_vercel_token
     VERCEL_ORG_ID=your_org_id
     VERCEL_PROJECT_ID=your_project_id
     \`\`\`

2. **Enable GitHub Actions:**
   - The `.github/workflows/ci-cd.yml` file is already configured
   - Push to main branch to trigger deployment

---

## 🌐 **Step 7: Custom Domain (Optional)**

### **Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### **Railway:**
1. Go to Project → Settings → Domains
2. Add custom domain
3. Update DNS records

---

## 📊 **Step 8: Monitoring Setup**

### **For Production Monitoring:**
1. **Vercel Analytics**: Automatically enabled
2. **Custom Monitoring**: 
   - Add monitoring service API keys to environment variables
   - Configure alerts in your monitoring dashboard

---

## 🔍 **Step 9: Testing Deployment**

1. **Health Check:**
   \`\`\`bash
   curl https://your-app-url.vercel.app/api/health
   \`\`\`

2. **Features to Test:**
   - ✅ Dashboard loads correctly
   - ✅ "View Repository" button works
   - ✅ "View Cluster" button works
   - ✅ "View Images" button works
   - ✅ Pipeline trigger works
   - ✅ Real-time metrics update
   - ✅ AWS Console integration (if configured)

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Build Fails:**
   \`\`\`bash
   # Check build logs
   npm run build
   # Fix TypeScript errors
   npm run lint:fix
   \`\`\`

2. **Environment Variables Not Working:**
   - Ensure variables are set in deployment platform
   - Restart/redeploy after adding variables
   - Check variable names match exactly

3. **AWS Console Button Not Working:**
   - Set required AWS environment variables:
     - `AWS_REGION`
     - `AWS_ACCOUNT_ID` 
     - `EKS_CLUSTER_NAME`

4. **API Routes Failing:**
   - Check serverless function limits
   - Verify API routes are properly configured

---

## 📈 **Step 10: Performance Optimization**

1. **Enable Caching:**
   - API responses are cached for better performance
   - Static assets are automatically optimized

2. **Monitor Performance:**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Check API response times

---

## 🎉 **Deployment Complete!**

Your DevOps Hackathon Pipeline is now live! 

### **Next Steps:**
1. Share your deployment URL
2. Test all features
3. Monitor performance
4. Add custom domain (optional)
5. Set up monitoring alerts
6. Present your project!

### **Useful Commands:**
\`\`\`bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Deploy to Vercel
vercel --prod

# Deploy to Railway
railway up
\`\`\`

---

## 📞 **Support**

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally first
4. Check platform-specific documentation
5. Open an issue in the GitHub repository

**Happy Deploying! 🚀**
