#!/bin/bash

# DevOps Pipeline Setup Script
set -e

echo "🚀 Setting up DevOps CI/CD Pipeline..."

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed"
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl is not installed"
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        echo "❌ AWS CLI is not installed"
        exit 1
    fi
    
    echo "✅ All prerequisites are installed"
}

# Setup Kubernetes namespaces
setup_namespaces() {
    echo "🏗️ Setting up Kubernetes namespaces..."
    
    kubectl create namespace production --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace staging --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    
    echo "✅ Namespaces created"
}

# Setup secrets
setup_secrets() {
    echo "🔐 Setting up secrets..."
    
    # Create GitHub Container Registry secret
    kubectl create secret docker-registry ghcr-secret \
        --docker-server=ghcr.io \
        --docker-username=${GITHUB_USERNAME:-demo-user} \
        --docker-password=${GITHUB_TOKEN:-demo-token} \
        --namespace=production \
        --dry-run=client -o yaml | kubectl apply -f -
    
    kubectl create secret docker-registry ghcr-secret \
        --docker-server=ghcr.io \
        --docker-username=${GITHUB_USERNAME:-demo-user} \
        --docker-password=${GITHUB_TOKEN:-demo-token} \
        --namespace=staging \
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Create application secrets
    kubectl create secret generic app-secrets \
        --from-literal=database-url=${DATABASE_URL:-postgresql://demo:demo@localhost:5432/devops_pipeline} \
        --namespace=production \
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Create Grafana secrets
    kubectl create secret generic grafana-secrets \
        --from-literal=admin-password=admin123 \
        --namespace=monitoring \
        --dry-run=client -o yaml | kubectl apply -f -
    
    echo "✅ Secrets created"
}

# Deploy monitoring stack
deploy_monitoring() {
    echo "📊 Deploying monitoring stack..."
    
    kubectl apply -f k8s/monitoring/
    
    echo "✅ Monitoring stack deployed"
}

# Deploy application
deploy_application() {
    echo "🚀 Deploying application..."
    
    # Replace IMAGE_TAG placeholder with latest
    sed -i.bak 's|IMAGE_TAG|latest|g' k8s/production/deployment.yml
    
    kubectl apply -f k8s/production/
    
    echo "✅ Application deployed"
}

# Wait for deployments
wait_for_deployments() {
    echo "⏳ Waiting for deployments to be ready..."
    
    kubectl wait --for=condition=available --timeout=300s deployment/app-production -n production || echo "⚠️ App deployment timeout"
    kubectl wait --for=condition=available --timeout=300s deployment/prometheus -n monitoring || echo "⚠️ Prometheus deployment timeout"
    kubectl wait --for=condition=available --timeout=300s deployment/grafana -n monitoring || echo "⚠️ Grafana deployment timeout"
    
    echo "✅ Deployments status checked"
}

# Display access information
display_info() {
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📊 Access Information:"
    
    # Get service endpoints
    APP_ENDPOINT=$(kubectl get svc app-service-production -n production -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "localhost:3000")
    GRAFANA_ENDPOINT=$(kubectl get svc grafana-service -n monitoring -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "localhost:3001")
    PROMETHEUS_IP=$(kubectl get svc prometheus-service -n monitoring -o jsonpath='{.spec.clusterIP}' 2>/dev/null || echo "localhost")
    
    echo "Application: http://$APP_ENDPOINT"
    echo "Grafana: http://$GRAFANA_ENDPOINT:3000"
    echo "Prometheus: http://$PROMETHEUS_IP:9090"
    echo ""
    echo "🔐 Default Credentials:"
    echo "Grafana - Username: admin, Password: admin123"
    echo ""
    echo "📝 Next Steps:"
    echo "1. Configure your GitHub repository secrets"
    echo "2. Push code to trigger the CI/CD pipeline"
    echo "3. Monitor your application in Grafana"
    echo ""
    echo "🐳 Docker Commands:"
    echo "Build: docker build -t devops-pipeline-app ."
    echo "Run: docker run -p 3000:3000 devops-pipeline-app"
    echo ""
    echo "☸️ Kubernetes Commands:"
    echo "Pods: kubectl get pods -n production"
    echo "Services: kubectl get svc -n production"
    echo "Logs: kubectl logs -f deployment/app-production -n production"
}

# Main execution
main() {
    check_prerequisites
    setup_namespaces
    setup_secrets
    deploy_monitoring
    deploy_application
    wait_for_deployments
    display_info
}

# Run main function
main "$@"
