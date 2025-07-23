#!/bin/bash

# DevOps Pipeline Setup Script
# This script sets up the development environment

set -e

echo "🔧 Setting up DevOps Pipeline Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Check operating system
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        OS="windows"
    else
        OS="unknown"
    fi
    print_status "Detected OS: $OS"
}

# Install Node.js if not present
install_nodejs() {
    if ! command -v node &> /dev/null; then
        print_status "Installing Node.js..."
        
        case $OS in
            "macos")
                if command -v brew &> /dev/null; then
                    brew install node
                else
                    print_error "Homebrew not found. Please install Node.js manually from https://nodejs.org/"
                    exit 1
                fi
                ;;
            "linux")
                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                sudo apt-get install -y nodejs
                ;;
            "windows")
                print_error "Please install Node.js manually from https://nodejs.org/"
                exit 1
                ;;
            *)
                print_error "Unsupported OS. Please install Node.js manually from https://nodejs.org/"
                exit 1
                ;;
        esac
        
        print_success "Node.js installed successfully!"
    else
        print_success "Node.js is already installed: $(node --version)"
    fi
}

# Install Git if not present
install_git() {
    if ! command -v git &> /dev/null; then
        print_status "Installing Git..."
        
        case $OS in
            "macos")
                if command -v brew &> /dev/null; then
                    brew install git
                else
                    print_error "Homebrew not found. Please install Git manually from https://git-scm.com/"
                    exit 1
                fi
                ;;
            "linux")
                sudo apt-get update
                sudo apt-get install -y git
                ;;
            "windows")
                print_error "Please install Git manually from https://git-scm.com/"
                exit 1
                ;;
            *)
                print_error "Unsupported OS. Please install Git manually from https://git-scm.com/"
                exit 1
                ;;
        esac
        
        print_success "Git installed successfully!"
    else
        print_success "Git is already installed: $(git --version)"
    fi
}

# Install Docker if not present
install_docker() {
    if ! command -v docker &> /dev/null; then
        print_status "Docker not found. Installing Docker..."
        
        case $OS in
            "macos")
                print_warning "Please install Docker Desktop from https://docs.docker.com/desktop/mac/install/"
                ;;
            "linux")
                curl -fsSL https://get.docker.com -o get-docker.sh
                sudo sh get-docker.sh
                sudo usermod -aG docker $USER
                print_warning "Please log out and log back in for Docker permissions to take effect."
                ;;
            "windows")
                print_warning "Please install Docker Desktop from https://docs.docker.com/desktop/windows/install/"
                ;;
            *)
                print_warning "Please install Docker manually from https://docs.docker.com/get-docker/"
                ;;
        esac
    else
        print_success "Docker is already installed: $(docker --version)"
    fi
}

# Install kubectl
install_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_status "Installing kubectl..."
        
        case $OS in
            "macos")
                if command -v brew &> /dev/null; then
                    brew install kubectl
                else
                    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl"
                    chmod +x kubectl
                    sudo mv kubectl /usr/local/bin/
                fi
                ;;
            "linux")
                curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                chmod +x kubectl
                sudo mv kubectl /usr/local/bin/
                ;;
            "windows")
                print_warning "Please install kubectl manually from https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/"
                ;;
            *)
                print_warning "Please install kubectl manually from https://kubernetes.io/docs/tasks/tools/"
                ;;
        esac
        
        if command -v kubectl &> /dev/null; then
            print_success "kubectl installed successfully!"
        fi
    else
        print_success "kubectl is already installed: $(kubectl version --client --short 2>/dev/null || echo 'kubectl installed')"
    fi
}

# Install AWS CLI
install_aws_cli() {
    if ! command -v aws &> /dev/null; then
        print_status "Installing AWS CLI..."
        
        case $OS in
            "macos")
                if command -v brew &> /dev/null; then
                    brew install awscli
                else
                    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
                    sudo installer -pkg AWSCLIV2.pkg -target /
                    rm AWSCLIV2.pkg
                fi
                ;;
            "linux")
                curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                unzip awscliv2.zip
                sudo ./aws/install
                rm -rf aws awscliv2.zip
                ;;
            "windows")
                print_warning "Please install AWS CLI manually from https://aws.amazon.com/cli/"
                ;;
            *)
                print_warning "Please install AWS CLI manually from https://aws.amazon.com/cli/"
                ;;
        esac
        
        if command -v aws &> /dev/null; then
            print_success "AWS CLI installed successfully!"
        fi
    else
        print_success "AWS CLI is already installed: $(aws --version)"
    fi
}

# Install Vercel CLI
install_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel
        print_success "Vercel CLI installed successfully!"
    else
        print_success "Vercel CLI is already installed: $(vercel --version)"
    fi
}

# Setup project dependencies
setup_project() {
    print_status "Installing project dependencies..."
    npm install
    print_success "Project dependencies installed!"
}

# Create necessary directories
create_directories() {
    print_status "Creating project directories..."
    
    mkdir -p k8s/production
    mkdir -p k8s/staging
    mkdir -p k8s/monitoring
    mkdir -p scripts
    mkdir -p docs
    mkdir -p .github/workflows
    
    print_success "Project directories created!"
}

# Setup Git hooks
setup_git_hooks() {
    if [ -d ".git" ]; then
        print_status "Setting up Git hooks..."
        
        # Create pre-commit hook
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Pre-commit hook for DevOps pipeline

echo "Running pre-commit checks..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix the issues before committing."
    exit 1
fi

# Run tests
npm run test --passWithNoTests
if [ $? -ne 0 ]; then
    echo "Tests failed. Please fix the issues before committing."
    exit 1
fi

echo "Pre-commit checks passed!"
EOF
        
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks set up successfully!"
    else
        print_warning "Not a Git repository. Skipping Git hooks setup."
    fi
}

# Generate configuration files
generate_configs() {
    print_status "Generating configuration files..."
    
    # Create .env.example
    if [ ! -f ".env.example" ]; then
        cat > .env.example << 'EOF'
# GitHub Configuration
GITHUB_TOKEN=your-github-token-here
GITHUB_USERNAME=your-username-here

# Database Configuration
DATABASE_URL=your-database-url-here

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key-here
AWS_SECRET_ACCESS_KEY=your-aws-secret-key-here
AWS_REGION=us-east-1

# Monitoring Configuration
GRAFANA_API_KEY=your-grafana-key-here
PROMETHEUS_URL=your-prometheus-url-here

# Application Configuration
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
        print_success "Created .env.example file"
    fi
    
    # Create .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# Docker
Dockerfile.local
docker-compose.override.yml

# Kubernetes
*.kubeconfig

# Terraform
*.tfstate
*.tfstate.*
.terraform/

# Temporary files
tmp/
temp/
EOF
        print_success "Created .gitignore file"
    fi
}

# Main setup function
main() {
    echo "======================================"
    echo "🔧 DevOps Pipeline Setup Script"
    echo "======================================"
    echo
    
    detect_os
    echo
    
    print_status "Installing required tools..."
    install_nodejs
    install_git
    install_docker
    install_kubectl
    install_aws_cli
    install_vercel_cli
    echo
    
    print_status "Setting up project..."
    setup_project
    create_directories
    setup_git_hooks
    generate_configs
    echo
    
    print_success "🎉 Setup completed successfully!"
    echo
    echo "Next steps:"
    echo "1. Copy .env.example to .env.local and fill in your values"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Run 'npm run deploy' to deploy to production"
    echo "4. Check the COMPLETE_DEPLOYMENT_GUIDE.md for detailed instructions"
    echo
    echo "Happy coding! 🚀"
}

# Run main function
main "$@"
