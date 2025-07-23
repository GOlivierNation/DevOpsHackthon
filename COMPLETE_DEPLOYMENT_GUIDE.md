# Complete DevOps Pipeline Deployment Guide

## 🎯 Overview
This guide will walk you through deploying a complete DevOps CI/CD pipeline with containerization, cloud deployment, and monitoring from scratch.

## 📋 Prerequisites Checklist
- [ ] Computer with internet connection
- [ ] Basic knowledge of Git and command line
- [ ] Email address for account creation

---

## 🔗 Step 1: Account Creation

### 1.1 GitHub Account
**Link**: https://github.com/signup
1. Visit GitHub signup page
2. Enter username, email, and password
3. Verify email address
4. Complete profile setup
5. Enable 2FA (recommended)

### 1.2 Vercel Account
**Link**: https://vercel.com/signup
1. Visit Vercel signup page
2. Sign up with GitHub account (recommended)
3. Authorize Vercel to access your repositories
4. Complete onboarding

### 1.3 AWS Account
**Link**: https://aws.amazon.com/
1. Click "Create an AWS Account"
2. Enter email and account name
3. Provide contact information
4. Add payment method (free tier available)
5. Verify phone number
6. Choose support plan (Basic - Free)
7. Complete setup and sign in

### 1.4 Docker Hub Account (Optional)
**Link**: https://hub.docker.com/signup
1. Visit Docker Hub signup page
2. Create account with email
3. Verify email address

---

## 🛠️ Step 2: Tool Installation

### 2.1 Install Node.js
**Link**: https://nodejs.org/
1. Download LTS version for your OS
2. Run installer with default settings
3. Verify installation:
\`\`\`bash
node --version
npm --version
\`\`\`

### 2.2 Install Git
**Link**: https://git-scm.com/downloads
1. Download for your operating system
2. Install with default settings
3. Configure Git:
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

### 2.3 Install Docker
**Link**: https://docs.docker.com/get-docker/
1. Download Docker Desktop for your OS
2. Install and start Docker Desktop
3. Verify installation:
\`\`\`bash
docker --version
docker-compose --version
\`\`\`

### 2.4 Install Vercel CLI
\`\`\`bash
npm install -g vercel
\`\`\`

### 2.5 Install AWS CLI (Optional)
**Link**: https://aws.amazon.com/cli/
1. Download AWS CLI v2
2. Install for your OS
3. Configure (optional):
\`\`\`bash
aws configure
\`\`\`

---

## 📁 Step 3: Project Setup

### 3.1 Fork the Repository
1. Go to: https://github.com/GOlivierNation/DevOpsHackthon
2. Click "Fork" button
3. Choose your account as destination
4. Wait for fork to complete

### 3.2 Clone Your Fork
\`\`\`bash
git clone https://github.com/YOUR-USERNAME/DevOpsHackthon.git
cd DevOpsHackthon
\`\`\`

### 3.3 Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3.4 Create Environment File
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your values:
\`\`\`env
# Database (if using)
DATABASE_URL="your-database-url"

# AWS Configuration (optional)
AWS_REGION="us-west-2"
AWS_ACCOUNT_ID="123456789012"
EKS_CLUSTER_NAME="production-cluster"

# Monitoring (optional)
GRAFANA_API_KEY="your-grafana-key"
PROMETHEUS_URL="your-prometheus-url"
\`\`\`

---

## 🚀 Step 4: Vercel Deployment

### 4.1 Login to Vercel
\`\`\`bash
vercel login
\`\`\`
Follow prompts to authenticate with GitHub.

### 4.2 Deploy to Vercel
\`\`\`bash
vercel
\`\`\`

Follow the interactive prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name: `devops-pipeline-dashboard`
- Directory: `./` (current directory)
- Override settings? **N**

### 4.3 Set Environment Variables in Vercel
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add your environment variables:
   - `DATABASE_URL`
   - `AWS_REGION`
   - `AWS_ACCOUNT_ID`
   - `EKS_CLUSTER_NAME`

### 4.4 Redeploy with Environment Variables
\`\`\`bash
vercel --prod
\`\`\`

---

## 🐳 Step 5: Container Setup

### 5.1 Build Docker Image
\`\`\`bash
docker build -t devops-pipeline:latest .
\`\`\`

### 5.2 Test Locally
\`\`\`bash
docker run -p 3000:3000 devops-pipeline:latest
\`\`\`
Visit http://localhost:3000 to test.

### 5.3 Push to GitHub Container Registry
\`\`\`bash
# Tag the image
docker tag devops-pipeline:latest ghcr.io/YOUR-USERNAME/devops-pipeline:latest

# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR-USERNAME --password-stdin

# Push the image
docker push ghcr.io/YOUR-USERNAME/devops-pipeline:latest
\`\`\`

---

## ☸️ Step 6: Kubernetes Setup (Optional)

### 6.1 Install kubectl
**Link**: https://kubernetes.io/docs/tasks/tools/
\`\`\`bash
# macOS
brew install kubectl

# Windows
choco install kubernetes-cli

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
\`\`\`

### 6.2 Create Kubernetes Deployment
Create `k8s/deployment.yaml`:
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-pipeline
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devops-pipeline
  template:
    metadata:
      labels:
        app: devops-pipeline
    spec:
      containers:
      - name: app
        image: ghcr.io/YOUR-USERNAME/devops-pipeline:latest
        ports:
        - containerPort: 3000
\`\`\`

### 6.3 Deploy to Kubernetes (if you have a cluster)
\`\`\`bash
kubectl apply -f k8s/deployment.yaml
\`\`\`

---

## 📊 Step 7: Monitoring Setup (Optional)

### 7.1 Grafana Cloud Account
**Link**: https://grafana.com/auth/sign-up/create-user
1. Create free Grafana Cloud account
2. Get API key from settings
3. Add to environment variables

### 7.2 Configure Monitoring
Update your `.env.local`:
\`\`\`env
GRAFANA_API_KEY="your-grafana-api-key"
GRAFANA_URL="https://your-instance.grafana.net"
\`\`\`

---

## 🔧 Step 8: GitHub Actions Setup

### 8.1 Add GitHub Secrets
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these secrets:
   - `VERCEL_TOKEN`: Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID`: Found in Vercel project settings
   - `VERCEL_PROJECT_ID`: Found in Vercel project settings
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password

### 8.2 GitHub Actions Workflow
The repository includes `.github/workflows/ci-cd.yml` which will:
- Run tests on every push
- Build and push Docker images
- Deploy to Vercel automatically

---

## ✅ Step 9: Testing Your Deployment

### 9.1 Test Vercel Deployment
1. Visit your Vercel URL (shown after deployment)
2. Check all tabs work correctly
3. Test modal functionality
4. Verify real-time metrics

### 9.2 Test Container Registry
1. Click "View Images" → "Registry" button
2. Should open GitHub Container Registry
3. Verify images are being published

### 9.3 Test Documentation Links
1. Go to Documentation tab
2. Click each documentation link
3. Verify all pages load correctly

---

## 🎯 Step 10: Final Configuration

### 10.1 Update Repository URLs
Edit the following files with your GitHub username:
- `components/repository-modal.tsx`
- `components/images-modal.tsx`
- `app/api/repository/route.ts`
- `app/api/images/route.ts`

### 10.2 Customize Content
- Update README.md with your project details
- Modify dashboard title and description
- Add your own monitoring endpoints
- Customize the footer with your information

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. Vercel Deployment Fails
\`\`\`bash
# Check logs
vercel logs

# Redeploy
vercel --prod --force
\`\`\`

#### 2. Environment Variables Not Working
- Ensure variables are set in Vercel dashboard
- Check variable names match exactly
- Redeploy after adding variables

#### 3. Docker Build Fails
\`\`\`bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker build --no-cache -t devops-pipeline:latest .
\`\`\`

#### 4. GitHub Actions Failing
- Check secrets are properly set
- Verify token permissions
- Check workflow file syntax

#### 5. Container Registry Access Denied
\`\`\`bash
# Re-login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR-USERNAME --password-stdin
\`\`\`

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Check Vercel deployment logs
4. Create an issue in the repository

---

## 🎉 Success Checklist

- [ ] ✅ GitHub account created and repository forked
- [ ] ✅ All tools installed (Node.js, Git, Docker)
- [ ] ✅ Project cloned and dependencies installed
- [ ] ✅ Vercel account created and CLI configured
- [ ] ✅ Application deployed to Vercel successfully
- [ ] ✅ Environment variables configured
- [ ] ✅ Docker image built and tested locally
- [ ] ✅ Container pushed to GitHub Container Registry
- [ ] ✅ GitHub Actions workflow running
- [ ] ✅ All dashboard features working
- [ ] ✅ Documentation links accessible
- [ ] ✅ Monitoring configured (optional)
- [ ] ✅ Kubernetes deployment ready (optional)

## 🔗 Quick Links

- **Your Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/YOUR-USERNAME/DevOpsHackthon
- **Container Registry**: https://github.com/users/YOUR-USERNAME/packages
- **AWS Console**: https://console.aws.amazon.com/
- **Docker Hub**: https://hub.docker.com/

---

**Congratulations! 🎉** 

Your DevOps pipeline is now fully deployed and operational. You have:
- ✅ A live dashboard showing pipeline status
- ✅ Automated CI/CD with GitHub Actions
- ✅ Container registry with published images
- ✅ Comprehensive documentation
- ✅ Monitoring and alerting setup
- ✅ Professional deployment ready for presentation

Your deployment URL: `https://your-project.vercel.app`

---

*© 2025 All rights reserved by Olivier*
