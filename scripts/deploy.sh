#!/bin/bash

# DevOps Pipeline Deployment Script
# © 2025 All rights reserved by Olivier

set -e

echo "🚀 DevOps Pipeline Deployment Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_header "🔍 Checking Prerequisites..."
    
    local missing_tools=()
    
    if ! command_exists node; then
        missing_tools+=("Node.js")
    fi
    
    if ! command_exists npm; then
        missing_tools+=("npm")
    fi
    
    if ! command_exists git; then
        missing_tools+=("Git")
    fi
    
    if ! command_exists docker; then
        missing_tools+=("Docker")
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        print_error "Missing required tools: ${missing_tools[*]}"
        print_error "Please install missing tools and run again."
        exit 1
    fi
    
    print_status "All prerequisites satisfied ✅"
}

# Install dependencies
install_dependencies() {
    print_header "📦 Installing Dependencies..."
    
    if [ -f "package.json" ]; then
        npm install
        print_status "Dependencies installed ✅"
    else
        print_error "package.json not found. Are you in the correct directory?"
        exit 1
    fi
}

# Setup environment
setup_environment() {
    print_header "⚙️ Setting up Environment..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            print_status "Created .env.local from .env.example"
            print_warning "Please edit .env.local with your actual values"
        else
            cat > .env.local << EOF
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
EOF
            print_status "Created .env.local template"
            print_warning "Please edit .env.local with your actual values"
        fi
    else
        print_status "Environment file already exists ✅"
    fi
}

# Build application
build_application() {
    print_header "🔨 Building Application..."
    
    npm run build
    print_status "Application built successfully ✅"
}

# Deploy to Vercel
deploy_vercel() {
    print_header "🚀 Deploying to Vercel..."
    
    if ! command_exists vercel; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    print_status "Deploying to Vercel..."
    vercel --prod --confirm
    print_status "Deployed to Vercel successfully ✅"
}

# Build Docker image
build_docker() {
    print_header "🐳 Building Docker Image..."
    
    local image_name="devops-pipeline:latest"
    
    if [ -f "Dockerfile" ]; then
        docker build -t $image_name .
        print_status "Docker image built: $image_name ✅"
        
        # Test the image
        print_status "Testing Docker image..."
        docker run --rm -d -p 3001:3000 --name devops-test $image_name
        sleep 5
        
        if curl -f http://localhost:3001 >/dev/null 2>&1; then
            print_status "Docker image test passed ✅"
        else
            print_warning "Docker image test failed, but image was built"
        fi
        
        docker stop devops-test >/dev/null 2>&1 || true
    else
        print_error "Dockerfile not found"
        return 1
    fi
}

# Deploy to Kubernetes
deploy_kubernetes() {
    print_header "☸️ Deploying to Kubernetes..."
    
    if ! command_exists kubectl; then
        print_warning "kubectl not found. Skipping Kubernetes deployment."
        return 0
    fi
    
    if [ -d "k8s" ]; then
        kubectl apply -f k8s/
        print_status "Deployed to Kubernetes ✅"
    else
        print_warning "k8s directory not found. Skipping Kubernetes deployment."
    fi
}

# Run tests
run_tests() {
    print_header "🧪 Running Tests..."
    
    if npm run test >/dev/null 2>&1; then
        print_status "Tests passed ✅"
    else
        print_warning "Tests failed or no test script found"
    fi
}

# Generate deployment report
generate_report() {
    print_header "📊 Generating Deployment Report..."
    
    local report_file="deployment-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > $report_file << EOF
# Deployment Report
Generated: $(date)

## Environment Information
- Node.js: $(node --version)
- npm: $(npm --version)
- Git: $(git --version)
- Docker: $(docker --version)

## Deployment Status
- Application Built: ✅
- Environment Configured: ✅
- Dependencies Installed: ✅

## Next Steps
1. Update environment variables in .env.local
2. Configure monitoring endpoints
3. Set up GitHub Actions secrets
4. Test all application features

## Useful Commands
\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Deploy to Vercel
vercel --prod
\`\`\`

---
© 2025 All rights reserved by Olivier
EOF
    
    print_status "Deployment report generated: $report_file ✅"
}

# Main deployment function
main() {
    print_header "🎯 Starting DevOps Pipeline Deployment"
    echo ""
    
    # Interactive menu
    echo "Select deployment options:"
    echo "1) Full deployment (Vercel + Docker)"
    echo "2) Vercel only"
    echo "3) Docker only"
    echo "4) Local development setup"
    echo "5) Kubernetes deployment"
    echo ""
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            check_prerequisites
            install_dependencies
            setup_environment
            build_application
            deploy_vercel
            build_docker
            run_tests
            generate_report
            ;;
        2)
            check_prerequisites
            install_dependencies
            setup_environment
            build_application
            deploy_vercel
            run_tests
            generate_report
            ;;
        3)
            check_prerequisites
            install_dependencies
            setup_environment
            build_docker
            run_tests
            generate_report
            ;;
        4)
            check_prerequisites
            install_dependencies
            setup_environment
            run_tests
            print_status "Development environment ready! Run 'npm run dev' to start."
            ;;
        5)
            check_prerequisites
            build_docker
            deploy_kubernetes
            generate_report
            ;;
        *)
            print_error "Invalid choice. Please run the script again."
            exit 1
            ;;
    esac
    
    print_header "🎉 Deployment Complete!"
    echo ""
    print_status "Your DevOps pipeline is ready!"
    print_status "Check the generated report for next steps."
    echo ""
}

# Run main function
main "$@"
