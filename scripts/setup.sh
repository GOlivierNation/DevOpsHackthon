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
        --docker-username=$GITHUB_USERNAME \
        --docker-password=$GITHUB_TOKEN \
        --namespace=production \
        --dry-run=client -o yaml | kubectl apply -f -
    
    kubectl create secret docker-registry ghcr-secret \
        --docker-server=ghcr.io \
        --docker-username=$GITHUB_USERNAME \
        --docker-password=$GITHUB_TOKEN \
        --namespace=staging \
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Create application secrets
    kubectl create secret generic app-secrets \
        --from-literal=database-url=$DATABASE_URL \
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
    sed -i 's|IMAGE_TAG|latest|g' k8s/production/deployment.yml
    
    kubectl apply -f k8s/production/
    
    echo "✅ Application deployed"
}

# Wait for deployments
wait_for_deployments() {
    echo "⏳ Waiting for deployments to be ready..."
    
    kubectl wait --for=condition=available --timeout=300s deployment/app-production -n production
    kubectl wait --for=condition=available --timeout=300s deployment/prometheus -n monitoring
    kubectl wait --for=condition=available --timeout=300s deployment/grafana -n monitoring
    
    echo "✅ All deployments are ready"
}

# Display access information
display_info() {
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📊 Access Information:"
    echo "Application: http://$(kubectl get svc app-service-production -n production -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
    echo "Grafana: http://$(kubectl get svc grafana-service -n monitoring -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'):3000"
    echo "Prometheus: http://$(kubectl get svc prometheus-service -n monitoring -o jsonpath='{.spec.clusterIP}'):9090"
    echo ""
    echo "🔐 Default Credentials:"
    echo "Grafana - Username: admin, Password: admin123"
    echo ""
    echo "📝 Next Steps:"
    echo "1. Configure your GitHub repository secrets"
    echo "2. Push code to trigger the CI/CD pipeline"
    echo "3. Monitor your application in Grafana"
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
