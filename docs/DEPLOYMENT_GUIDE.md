# Deployment Guide

## Prerequisites

- Docker installed and running
- Kubernetes cluster (AWS EKS recommended)
- kubectl configured
- AWS CLI configured
- GitHub repository with Actions enabled

## Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-org/devops-pipeline-app.git
   cd devops-pipeline-app
   \`\`\`

2. **Set up environment variables**
   \`\`\`bash
   export GITHUB_USERNAME=your-username
   export GITHUB_TOKEN=your-token
   export DATABASE_URL=your-database-url
   \`\`\`

3. **Run setup script**
   \`\`\`bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   \`\`\`

## Manual Deployment

### 1. Build Docker Image

\`\`\`bash
docker build -t devops-pipeline-app .
docker tag devops-pipeline-app ghcr.io/your-org/devops-pipeline-app:latest
docker push ghcr.io/your-org/devops-pipeline-app:latest
\`\`\`

### 2. Deploy to Kubernetes

\`\`\`bash
# Create namespaces
kubectl create namespace production
kubectl create namespace staging
kubectl create namespace monitoring

# Apply configurations
kubectl apply -f k8s/production/
kubectl apply -f k8s/monitoring/
\`\`\`

### 3. Verify Deployment

\`\`\`bash
# Check pod status
kubectl get pods -n production
kubectl get pods -n monitoring

# Check services
kubectl get svc -n production
kubectl get svc -n monitoring
\`\`\`

## Environment Configuration

### Production Environment

- **Namespace**: `production`
- **Replicas**: 3
- **Resources**: 256Mi memory, 200m CPU (requests)
- **Auto-scaling**: 3-10 replicas based on CPU/memory
- **Health checks**: Enabled with proper timeouts

### Staging Environment

- **Namespace**: `staging`
- **Replicas**: 1
- **Resources**: 128Mi memory, 100m CPU (requests)
- **Auto-scaling**: Disabled
- **Health checks**: Basic configuration

## Monitoring Setup

### Prometheus Configuration

- **Scrape interval**: 15s
- **Retention**: 15 days
- **Targets**: Kubernetes API, nodes, pods, application metrics

### Grafana Dashboards

- **Application metrics**: Request rate, response time, error rate
- **Infrastructure metrics**: CPU, memory, storage usage
- **Kubernetes metrics**: Pod status, node health, resource utilization

## Troubleshooting

### Common Issues

1. **Pod not starting**
   \`\`\`bash
   kubectl describe pod <pod-name> -n production
   kubectl logs <pod-name> -n production
   \`\`\`

2. **Service not accessible**
   \`\`\`bash
   kubectl get svc -n production
   kubectl describe svc app-service-production -n production
   \`\`\`

3. **Ingress issues**
   \`\`\`bash
   kubectl get ingress -n production
   kubectl describe ingress app-ingress-production -n production
   \`\`\`

### Health Check Endpoints

- **Application health**: `/api/health`
- **Metrics**: `/api/metrics`
- **Readiness**: Built into health endpoint
- **Liveness**: Built into health endpoint

## Security Considerations

### Container Security

- Non-root user in containers
- Minimal base images (Alpine Linux)
- Regular security scanning with Trivy
- Resource limits and requests

### Kubernetes Security

- Network policies for pod communication
- RBAC for service accounts
- Secrets management for sensitive data
- Regular security updates

## Performance Optimization

### Application Level

- Next.js optimizations enabled
- Static asset caching
- API response caching
- Database connection pooling

### Infrastructure Level

- Horizontal Pod Autoscaling (HPA)
- Resource requests and limits
- Node affinity rules
- Load balancer configuration

## Backup and Recovery

### Database Backups

- Automated daily backups
- Point-in-time recovery
- Cross-region replication

### Configuration Backups

- Kubernetes manifests in Git
- Secrets backed up securely
- Monitoring configuration versioned

## Scaling Guidelines

### Horizontal Scaling

- HPA configured for 3-10 replicas
- CPU threshold: 70%
- Memory threshold: 80%
- Scale-up: 2 pods per minute
- Scale-down: 1 pod per 5 minutes

### Vertical Scaling

- Monitor resource usage patterns
- Adjust requests/limits based on metrics
- Consider node capacity when scaling

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review security scan results
- Monitor resource usage trends
- Update documentation

### Emergency Procedures

- Rollback deployment: `kubectl rollout undo deployment/app-production -n production`
- Scale down: `kubectl scale deployment app-production --replicas=0 -n production`
- Emergency contact: DevOps team Slack channel
