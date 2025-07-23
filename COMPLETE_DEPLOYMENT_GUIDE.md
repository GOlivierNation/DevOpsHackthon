# Complete DevOps Pipeline Deployment Guide

This comprehensive guide will walk you through deploying the entire DevOps CI/CD pipeline from scratch, including all account setups and configurations.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] A computer with internet access
- [ ] Basic command line knowledge
- [ ] Git installed on your machine
- [ ] Node.js 18+ installed
- [ ] A GitHub account
- [ ] A Vercel account
- [ ] An AWS account (for EKS cluster)

## 🔧 Step 1: Account Creation & Setup

### 1.1 GitHub Account Setup
1. **Create GitHub Account**: https://github.com/signup
   - Choose a username (e.g., `your-username`)
   - Verify your email address
   - Complete the setup wizard

2. **Enable GitHub Actions**:
   - Go to your profile → Settings → Actions → General
   - Select "Allow all actions and reusable workflows"
   - Click "Save"

3. **Create Personal Access Token**:
   - Go to Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `workflow`, `write:packages`, `delete:packages`
   - Copy and save the token securely

### 1.2 Vercel Account Setup
1. **Create Vercel Account**: https://vercel.com/signup
   - Sign up with your GitHub account
   - Complete the onboarding process
   - Install Vercel CLI: `npm i -g vercel`

2. **Connect GitHub to Vercel**:
   - Go to Vercel Dashboard → Settings → Git
   - Connect your GitHub account
   - Grant necessary permissions

### 1.3 AWS Account Setup (Optional - for EKS)
1. **Create AWS Account**: https://aws.amazon.com/
   - Provide credit card information
   - Complete identity verification
   - Choose the Basic support plan (free)

2. **Install AWS CLI**:
   \`\`\`bash
   # macOS
   brew install awscli
   
   # Windows
   msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
   
   # Linux
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   \`\`\`

3. **Configure AWS CLI**:
   \`\`\`bash
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Default region: us-east-1
   # Default output format: json
   \`\`\`

## 🚀 Step 2: Project Setup

### 2.1 Fork and Clone Repository
1. **Fork the Repository**:
   - Go to the project repository on GitHub
   - Click "Fork" button
   - Select your account as the destination

2. **Clone Your Fork**:
   \`\`\`bash
   git clone https://github.com/YOUR-USERNAME/devops-pipeline-app.git
   cd devops-pipeline-app
   \`\`\`

3. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

### 2.2 Environment Configuration
1. **Create Environment Files**:
   \`\`\`bash
   # Create .env.local for local development
   touch .env.local
   \`\`\`

2. **Add Environment Variables to .env.local**:
   \`\`\`env
   # Database (if using)
   DATABASE_URL="your-database-url"
   
   # GitHub
   GITHUB_TOKEN="your-github-token"
   GITHUB_USERNAME="your-username"
   
   # AWS (if using EKS)
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   
   # Monitoring (optional)
   GRAFANA_API_KEY="your-grafana-key"
   PROMETHEUS_URL="your-prometheus-url"
   \`\`\`

## 🔄 Step 3: GitHub Actions Setup

### 3.1 Configure Repository Secrets
1. **Go to Repository Settings**:
   - Navigate to your forked repository
   - Click Settings → Secrets and variables → Actions

2. **Add Required Secrets**:
   \`\`\`
   AWS_ACCESS_KEY_ID: Your AWS access key
   AWS_SECRET_ACCESS_KEY: Your AWS secret key
   GITHUB_TOKEN: Your GitHub personal access token
   DOCKER_USERNAME: Your Docker Hub username (optional)
   DOCKER_PASSWORD: Your Docker Hub password (optional)
   \`\`\`

3. **Add Environment Variables**:
   \`\`\`
   AWS_REGION: us-east-1
   EKS_CLUSTER_NAME: devops-pipeline-cluster
   \`\`\`

### 3.2 Enable GitHub Container Registry
1. **Enable Package Registry**:
   - Go to your GitHub profile → Settings → Developer settings
   - Click "Personal access tokens" → "Tokens (classic)"
   - Ensure your token has `write:packages` and `delete:packages` scopes

2. **Test Container Registry Access**:
   \`\`\`bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR-USERNAME --password-stdin
   \`\`\`

## 🌐 Step 4: Vercel Deployment

### 4.1 Deploy via Vercel Dashboard
1. **Import Project**:
   - Go to Vercel Dashboard: https://vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Select the forked repository

2. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Add Environment Variables**:
   - In the deployment configuration, add all environment variables from your `.env.local`
   - Click "Deploy"

### 4.2 Deploy via Vercel CLI (Alternative)
1. **Login to Vercel**:
   \`\`\`bash
   vercel login
   \`\`\`

2. **Deploy Project**:
   \`\`\`bash
   vercel --prod
   \`\`\`

3. **Set Environment Variables**:
   \`\`\`bash
   vercel env add GITHUB_TOKEN
   vercel env add DATABASE_URL
   vercel env add AWS_ACCESS_KEY_ID
   # Add all other environment variables
   \`\`\`

## ☸️ Step 5: Kubernetes Setup (Optional)

### 5.1 Create EKS Cluster
1. **Install kubectl**:
   \`\`\`bash
   # macOS
   brew install kubectl
   
   # Windows
   curl -LO "https://dl.k8s.io/release/v1.28.0/bin/windows/amd64/kubectl.exe"
   
   # Linux
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   \`\`\`

2. **Create EKS Cluster**:
   \`\`\`bash
   # Install eksctl
   curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
   sudo mv /tmp/eksctl /usr/local/bin
   
   # Create cluster
   eksctl create cluster \
     --name devops-pipeline-cluster \
     --region us-east-1 \
     --nodegroup-name standard-workers \
     --node-type t3.medium \
     --nodes 3 \
     --nodes-min 1 \
     --nodes-max 4 \
     --managed
   \`\`\`

3. **Configure kubectl**:
   \`\`\`bash
   aws eks update-kubeconfig --region us-east-1 --name devops-pipeline-cluster
   \`\`\`

### 5.2 Deploy to Kubernetes
1. **Apply Kubernetes Manifests**:
   \`\`\`bash
   # Create namespaces
   kubectl create namespace production
   kubectl create namespace staging
   kubectl create namespace monitoring
   
   # Apply deployments
   kubectl apply -f k8s/production/
   kubectl apply -f k8s/monitoring/
   \`\`\`

2. **Verify Deployment**:
   \`\`\`bash
   kubectl get pods -n production
   kubectl get services -n production
   kubectl get ingress -n production
   \`\`\`

## 📊 Step 6: Monitoring Setup

### 6.1 Grafana Cloud Setup (Recommended)
1. **Create Grafana Cloud Account**: https://grafana.com/auth/sign-up/create-user
   - Choose the free tier
   - Complete the setup wizard

2. **Get API Key**:
   - Go to Grafana Cloud → API Keys
   - Create a new API key with Editor role
   - Copy and save the key

3. **Configure Prometheus**:
   - Add Grafana API key to your environment variables
   - Update Prometheus configuration to send metrics to Grafana Cloud

### 6.2 Self-Hosted Monitoring (Alternative)
1. **Deploy Prometheus and Grafana**:
   \`\`\`bash
   kubectl apply -f k8s/monitoring/prometheus.yml
   kubectl apply -f k8s/monitoring/grafana.yml
   \`\`\`

2. **Access Grafana Dashboard**:
   \`\`\`bash
   kubectl port-forward -n monitoring svc/grafana 3000:3000
   # Access at http://localhost:3000
   # Default login: admin/admin
   \`\`\`

## 🧪 Step 7: Testing and Verification

### 7.1 Test Local Development
1. **Run Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Access Application**:
   - Open http://localhost:3000
   - Test all dashboard features
   - Verify API endpoints work

### 7.2 Test CI/CD Pipeline
1. **Trigger Pipeline**:
   \`\`\`bash
   git add .
   git commit -m "feat: trigger CI/CD pipeline"
   git push origin main
   \`\`\`

2. **Monitor GitHub Actions**:
   - Go to your repository → Actions tab
   - Watch the pipeline execution
   - Verify all steps complete successfully

3. **Verify Container Registry**:
   - Go to your repository → Packages
   - Confirm container images are published
   - Test pulling the image locally

### 7.3 Test Production Deployment
1. **Access Vercel Deployment**:
   - Go to your Vercel dashboard
   - Click on your project
   - Access the production URL

2. **Test All Features**:
   - [ ] Dashboard loads correctly
   - [ ] Pipeline status updates
   - [ ] Container registry modal works
   - [ ] Repository links work
   - [ ] Documentation pages load
   - [ ] Monitoring data displays

## 🔧 Step 8: Troubleshooting

### 8.1 Common Issues and Solutions

#### GitHub Actions Failing
\`\`\`bash
# Check secrets are set correctly
# Verify token permissions
# Check workflow file syntax
\`\`\`

#### Vercel Deployment Issues
\`\`\`bash
# Check build logs in Vercel dashboard
# Verify environment variables are set
# Check for missing dependencies
\`\`\`

#### Container Registry Issues
\`\`\`bash
# Verify GitHub token has package permissions
# Check container registry URL format
# Ensure proper authentication
\`\`\`

#### Kubernetes Issues
\`\`\`bash
# Check cluster status
kubectl cluster-info

# Verify node status
kubectl get nodes

# Check pod logs
kubectl logs -f deployment/app-production -n production
\`\`\`

### 8.2 Useful Commands

#### Docker Commands
\`\`\`bash
# Build image locally
docker build -t devops-pipeline-app .

# Run container locally
docker run -p 3000:3000 devops-pipeline-app

# Push to registry
docker tag devops-pipeline-app ghcr.io/your-username/devops-pipeline-app:latest
docker push ghcr.io/your-username/devops-pipeline-app:latest
\`\`\`

#### Kubernetes Commands
\`\`\`bash
# Get all resources
kubectl get all -n production

# Describe pod
kubectl describe pod <pod-name> -n production

# Get logs
kubectl logs <pod-name> -n production

# Port forward
kubectl port-forward svc/app-service-production 3000:3000 -n production
\`\`\`

#### Vercel Commands
\`\`\`bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
\`\`\`

## 📚 Step 9: Documentation and Presentation

### 9.1 Update Documentation
1. **Update README.md**:
   - Add your specific deployment URLs
   - Update configuration instructions
   - Add screenshots of your deployment

2. **Create Presentation**:
   - Document your architecture decisions
   - Include screenshots of monitoring dashboards
   - Prepare demo script

### 9.2 Team Communication
1. **Set up Communication Channels**:
   - Create Slack workspace or Discord server
   - Set up notification webhooks
   - Document team roles and responsibilities

## 🎯 Step 10: Final Checklist

Before considering your deployment complete, verify:

- [ ] **GitHub Repository**: Forked and configured
- [ ] **CI/CD Pipeline**: Running successfully
- [ ] **Container Registry**: Images being published
- [ ] **Vercel Deployment**: Application accessible
- [ ] **Monitoring**: Dashboards showing data
- [ ] **Documentation**: Updated and complete
- [ ] **Security**: Secrets properly configured
- [ ] **Testing**: All features working
- [ ] **Performance**: Application responsive
- [ ] **Backup**: Configuration backed up

## 🔗 Important Links

### Account Creation Links
- **GitHub**: https://github.com/signup
- **Vercel**: https://vercel.com/signup
- **AWS**: https://aws.amazon.com/
- **Grafana Cloud**: https://grafana.com/auth/sign-up/create-user
- **Docker Hub**: https://hub.docker.com/signup

### Documentation Links
- **GitHub Actions**: https://docs.github.com/en/actions
- **Vercel Docs**: https://vercel.com/docs
- **AWS EKS**: https://docs.aws.amazon.com/eks/
- **Kubernetes**: https://kubernetes.io/docs/
- **Docker**: https://docs.docker.com/

### Tool Installation Links
- **Node.js**: https://nodejs.org/
- **Git**: https://git-scm.com/downloads
- **Docker**: https://docs.docker.com/get-docker/
- **kubectl**: https://kubernetes.io/docs/tasks/tools/
- **AWS CLI**: https://aws.amazon.com/cli/

## 🆘 Support and Help

If you encounter issues:

1. **Check the troubleshooting section** in this guide
2. **Review GitHub Actions logs** for CI/CD issues
3. **Check Vercel deployment logs** for deployment issues
4. **Consult official documentation** for specific tools
5. **Search GitHub Issues** for similar problems
6. **Create an issue** in the repository if needed

## 🎉 Congratulations!

Once you've completed all steps, you'll have:
- ✅ A fully functional DevOps CI/CD pipeline
- ✅ Automated container builds and deployments
- ✅ Production-ready Kubernetes cluster
- ✅ Comprehensive monitoring and alerting
- ✅ Professional documentation
- ✅ Team collaboration tools

Your DevOps pipeline is now ready for the hackathon presentation! 🚀
