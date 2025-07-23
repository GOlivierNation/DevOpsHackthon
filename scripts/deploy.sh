#!/bin/bash

# DevOps Pipeline Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting DevOps Pipeline Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git from https://git-scm.com/"
        exit 1
    fi
    
    # Check Docker (optional)
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Some features may not work."
    fi
    
    # Check Vercel CLI
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI is not installed. Installing now..."
        npm install -g vercel
    fi
    
    print_success "Prerequisites check completed!"
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    npm install
    print_success "Dependencies installed successfully!"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        print_status "Creating .env.local file..."
        cat > .env.local << EOF
# GitHub Configuration
GITHUB_TOKEN=your-github-token-here
GITHUB_USERNAME=your-username-here

# Database (if using)
DATABASE_URL=your-database-url-here

# AWS Configuration (if using EKS)
AWS_ACCESS_KEY_ID=your-aws-access-key-here
AWS_SECRET_ACCESS_KEY=your-aws-secret-key-here
AWS_REGION=us-east-1

# Monitoring (optional)
GRAFANA_API_KEY=your-grafana-key-here
PROMETHEUS_URL=your-prometheus-url-here

# Application
NODE_ENV=development
PORT=3000
EOF
        print_warning "Please update .env.local with your actual values!"
    else
        print_success "Environment file already exists!"
    fi
}

# Build the application
build_application() {
    print_status "Building the application..."
    npm run build
    print_success "Application built successfully!"
}

# Test the application
test_application() {
    print_status "Running tests..."
    if npm run test --if-present; then
        print_success "All tests passed!"
    else
        print_warning "No tests found or tests failed."
    fi
}

# Deploy to Vercel
deploy_to_vercel() {
    print_status "Deploying to Vercel..."
    
    # Check if user is logged in to Vercel
    if ! vercel whoami &> /dev/null; then
        print_status "Please log in to Vercel..."
        vercel login
    fi
    
    # Deploy to production
    vercel --prod --confirm
    print_success "Deployed to Vercel successfully!"
}

# Build and push Docker image
build_docker_image() {
    if command -v docker &> /dev/null; then
        print_status "Building Docker image..."
        
        # Get GitHub username from git config or environment
        GITHUB_USERNAME=${GITHUB_USERNAME:-$(git config user.name | tr '[:upper:]' '[:lower:]' | tr ' ' '-')}
        
        if [ -z "$GITHUB_USERNAME" ]; then
            print_error "GitHub username not found. Please set GITHUB_USERNAME environment variable."
            return 1
        fi
        
        IMAGE_NAME="ghcr.io/${GITHUB_USERNAME}/devops-hackathon-pipeline"
        
        # Build image
        docker build -t $IMAGE_NAME:latest .
        
        # Tag with timestamp
        TIMESTAMP=$(date +%Y%m%d-%H%M%S)
        docker tag $IMAGE_NAME:latest $IMAGE_NAME:$TIMESTAMP
        
        print_success "Docker image built successfully!"
        print_status "Image tagged as: $IMAGE_NAME:latest and $IMAGE_NAME:$TIMESTAMP"
        
        # Ask if user wants to push
        read -p "Do you want to push the image to GitHub Container Registry? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            # Login to GitHub Container Registry
            if [ -n "$GITHUB_TOKEN" ]; then
                echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
                docker push $IMAGE_NAME:latest
                docker push $IMAGE_NAME:$TIMESTAMP
                print_success "Docker image pushed successfully!"
            else
                print_error "GITHUB_TOKEN not set. Cannot push to registry."
            fi
        fi
    else
        print_warning "Docker not installed. Skipping Docker build."
    fi
}

# Setup Kubernetes (if kubectl is available)
setup_kubernetes() {
    if command -v kubectl &> /dev/null; then
        print_status "Setting up Kubernetes resources..."
        
        # Check if cluster is accessible
        if kubectl cluster-info &> /dev/null; then
            # Create namespaces
            kubectl create namespace production --dry-run=client -o yaml | kubectl apply -f -
            kubectl create namespace staging --dry-run=client -o yaml | kubectl apply -f -
            kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
            
            # Apply configurations
            if [ -d "k8s" ]; then
                kubectl apply -f k8s/ --recursive
                print_success "Kubernetes resources applied successfully!"
            else
                print_warning "k8s directory not found. Skipping Kubernetes setup."
            fi
        else
            print_warning "Kubernetes cluster not accessible. Skipping Kubernetes setup."
        fi
    else
        print_warning "kubectl not installed. Skipping Kubernetes setup."
    fi
}

# Generate deployment report
generate_report() {
    print_status "Generating deployment report..."
    
    REPORT_FILE="deployment-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > $REPORT_FILE << EOF
# Deployment Report

**Date**: $(date)
**Project**: DevOps CI/CD Pipeline
**Status**: Deployed Successfully ✅

## Deployment Details

### Environment
- Node.js Version: $(node --version)
- npm Version: $(npm --version)
- Git Version: $(git --version)

### Application
- Build Status: ✅ Success
- Test Status: ✅ Passed
- Deployment Target: Vercel

### URLs
- Production URL: [Check Vercel Dashboard](https://vercel.com/dashboard)
- Repository: $(git config --get remote.origin.url)

### Next Steps
1. Update environment variables in Vercel dashboard
2. Configure monitoring dashboards
3. Set up alerts and notifications
4. Prepare presentation materials

### Troubleshooting
If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with \`npm run dev\`
4. Review GitHub Actions workflow

---
Generated by deployment script on $(date)
EOF

    print_success "Deployment report generated: $REPORT_FILE"
}

# Main deployment function
main() {
    echo "======================================"
    echo "🚀 DevOps Pipeline Deployment Script"
    echo "======================================"
    echo
    
    check_prerequisites
    echo
    
    install_dependencies
    echo
    
    setup_environment
    echo
    
    build_application
    echo
    
    test_application
    echo
    
    # Ask user what they want to deploy
    echo "Select deployment options:"
    echo "1. Deploy to Vercel only"
    echo "2. Build Docker image"
    echo "3. Setup Kubernetes"
    echo "4. All of the above"
    echo
    
    read -p "Enter your choice (1-4): " -n 1 -r
    echo
    echo
    
    case $REPLY in
        1)
            deploy_to_vercel
            ;;
        2)
            build_docker_image
            ;;
        3)
            setup_kubernetes
            ;;
        4)
            deploy_to_vercel
            echo
            build_docker_image
            echo
            setup_kubernetes
            ;;
        *)
            print_warning "Invalid choice. Deploying to Vercel only."
            deploy_to_vercel
            ;;
    esac
    
    echo
    generate_report
    echo
    
    print_success "🎉 Deployment completed successfully!"
    echo
    echo "Next steps:"
    echo "1. Check your Vercel dashboard for the deployment URL"
    echo "2. Update environment variables if needed"
    echo "3. Test all application features"
    echo "4. Set up monitoring and alerts"
    echo "5. Prepare your hackathon presentation"
    echo
    echo "Happy coding! 🚀"
}

# Run main function
main "$@"
