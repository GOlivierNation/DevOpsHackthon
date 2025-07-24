# DevOps Pipeline Dashboard

A comprehensive CI/CD pipeline implementation with real-time monitoring, containerization, and cloud deployment capabilities.

## 🚀 Features

- **Real-time Pipeline Monitoring** - Live dashboard with pipeline status and metrics
- **Container Registry Integration** - Docker image management and security scanning
- **Kubernetes Deployment** - Production-ready cluster configuration
- **Comprehensive Documentation** - Complete setup and troubleshooting guides
- **Automated CI/CD** - GitHub Actions workflow for continuous deployment
- **Monitoring & Alerting** - Prometheus and Grafana integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL (optional)
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes, AWS EKS
- **Monitoring**: Prometheus, Grafana, AlertManager
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel, AWS

## 📋 Prerequisites

- Node.js 18+
- Docker Desktop
- Git
- GitHub account
- Vercel account (for deployment)
- AWS account (optional, for EKS)

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/GOlivierNation/DevOpsHackthon.git
cd DevOpsHackthon
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup

\`\`\`bash
# Copy environment template
cp .env.example .env.local

# Edit with your values
nano .env.local
\`\`\`

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 🔧 Configuration

### Environment Variables

\`\`\`env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/devops_pipeline"

# AWS Configuration (Optional)
AWS_REGION="us-west-2"
AWS_ACCOUNT_ID="123456789012"
EKS_CLUSTER_NAME="production-cluster"

# Monitoring Configuration (Optional)
GRAFANA_API_KEY="your-grafana-api-key"
PROMETHEUS_URL="http://localhost:9090"

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

## 🐳 Docker Deployment

### Build and Run Locally

\`\`\`bash
# Build Docker image
docker build -t devops-pipeline .

# Run container
docker run -p 3000:3000 devops-pipeline
\`\`\`

### Docker Compose

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

## ☸️ Kubernetes Deployment

### Prerequisites

- kubectl installed and configured
- Access to a Kubernetes cluster (local or cloud)

### Deploy to Kubernetes

\`\`\`bash
# Create namespaces
kubectl create namespace production
kubectl create namespace monitoring

# Deploy application
kubectl apply -f k8s/deployment.yml

# Deploy monitoring stack
kubectl apply -f k8s/monitoring.yml

# Check deployment status
kubectl get pods -n production
\`\`\`

### Access Services

\`\`\`bash
# Port forward to access locally
kubectl port-forward svc/devops-pipeline-service 3000:80 -n production

# Access Grafana dashboard
kubectl port-forward svc/grafana 3000:3000 -n monitoring
\`\`\`

## 🚀 Automated Deployment

### Using Deployment Script

\`\`\`bash
# Make script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh
\`\`\`

### Manual Vercel Deployment

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
\`\`\`

## 📊 Monitoring

### Prometheus Metrics

The application exposes metrics at `/api/metrics`:

- HTTP request count and duration
- Memory and CPU usage
- Custom business metrics
- Database connection pool stats

### Grafana Dashboards

Access Grafana at `http://localhost:3000` (when port-forwarded) with:
- Username: `admin`
- Password: `admin123`

Pre-configured dashboards include:
- Application Performance
- Infrastructure Metrics
- Kubernetes Cluster Health
- Business Metrics

### Health Checks

Health endpoint available at `/api/health`:

\`\`\`json
{
  "status": "healthy",
  "timestamp": "2025-01-24T01:54:05.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "checks": {
    "database": { "status": "healthy" },
    "redis": { "status": "healthy" },
    "external_api": { "status": "healthy" }
  }
}
\`\`\`

## 🔒 Security

### Container Security

- Multi-stage Docker builds
- Non-root user execution
- Security scanning with Trivy
- Minimal base images (Alpine Linux)

### Kubernetes Security

- RBAC configuration
- Network policies
- Pod security contexts
- Secret management

### CI/CD Security

- Encrypted secrets in GitHub Actions
- Dependency vulnerability scanning
- Code quality checks
- Automated security updates

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- [📋 Project Setup Guide](./docs/setup-guide)
- [🔧 Pipeline Configuration](./docs/pipeline-config)
- [🐳 Docker Best Practices](./docs/docker-practices)
- [☸️ Kubernetes Deployment](./docs/kubernetes-deployment)
- [📊 Monitoring Setup](./docs/monitoring-setup)
- [🚨 Troubleshooting Guide](./docs/troubleshooting)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests

# Deployment
./scripts/setup.sh   # Setup development environment
./scripts/deploy.sh  # Deploy application

# Docker
docker-compose up    # Start all services
docker-compose down  # Stop all services
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   \`\`\`bash
   lsof -i :3000
   kill -9 <PID>
   \`\`\`

2. **Docker build fails**
   \`\`\`bash
   docker system prune -a
   docker build --no-cache -t devops-pipeline .
   \`\`\`

3. **Environment variables not loading**
   - Check `.env.local` file exists
   - Restart development server
   - Verify variable names

4. **Kubernetes pods not starting**
   \`\`\`bash
   kubectl describe pod <pod-name> -n production
   kubectl logs <pod-name> -n production
   \`\`\`

For more detailed troubleshooting, see the [Troubleshooting Guide](./docs/troubleshooting).

## 📊 Project Structure

\`\`\`
DevOpsHackthon/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── docs/              # Documentation pages
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Custom components
├── k8s/                  # Kubernetes manifests
│   ├── deployment.yml    # Application deployment
│   └── monitoring.yml    # Monitoring stack
├── scripts/              # Deployment scripts
│   ├── deploy.sh         # Main deployment script
│   └── setup.sh          # Environment setup
├── docs/                 # Additional documentation
├── .github/workflows/    # GitHub Actions
├── Dockerfile           # Container configuration
├── docker-compose.yml   # Local development
└── README.md           # This file
\`\`\`

## 🎯 Roadmap

- [ ] Add more monitoring dashboards
- [ ] Implement distributed tracing
- [ ] Add automated testing pipeline
- [ ] Enhance security scanning
- [ ] Add multi-environment support
- [ ] Implement blue-green deployments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for seamless deployment
- [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for monitoring
- [Kubernetes](https://kubernetes.io/) for container orchestration

## 📞 Support

- 📧 Email: olivier@example.com
- 💬 Discord: [Join our community](https://discord.gg/devops-pipeline)
- 🐛 Issues: [GitHub Issues](https://github.com/GOlivierNation/DevOpsHackthon/issues)
- 📖 Documentation: [Complete Guide](./COMPLETE_DEPLOYMENT_GUIDE.md)

---

**© 2025 All rights reserved by Olivier**

Built with ❤️ for the DevOps community
