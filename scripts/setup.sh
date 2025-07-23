#!/bin/bash

# DevOps Pipeline Setup Script
# © 2025 All rights reserved by Olivier

set -e

echo "🛠️ DevOps Pipeline Setup Script"
echo "==============================="

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

# Detect operating system
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

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Node.js
install_nodejs() {
    print_header "📦 Installing Node.js..."
    
    if command_exists node; then
        print_status "Node.js already installed: $(node --version)"
        return 0
    fi
    
    case $OS in
        "macos")
            if command_exists brew; then
                brew install node
            else
                print_warning "Homebrew not found. Please install Node.js manually from https://nodejs.org/"
            fi
            ;;
        "linux")
            if command_exists apt; then
                curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
                sudo apt-get install -y nodejs
            elif command_exists yum; then
                curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
                sudo yum install -y nodejs
            else
                print_warning "Package manager not found. Please install Node.js manually from https://nodejs.org/"
            fi
            ;;
        "windows")
            print_warning "Please install Node.js manually from https://nodejs.org/"
            ;;
        *)
            print_warning "Unknown OS. Please install Node.js manually from https://nodejs.org/"
            ;;
    esac
}

# Install Git
install_git() {
    print_header "📦 Installing Git..."
    
    if command_exists git; then
        print_status "Git already installed: $(git --version)"
        return 0
    fi
    
    case $OS in
        "macos")
            if command_exists brew; then
                brew install git
            else
                print_warning "Homebrew not found. Please install Git manually from https://git-scm.com/"
            fi
            ;;
        "linux")
            if command_exists apt; then
                sudo apt update && sudo apt install -y git
            elif command_exists yum; then
                sudo yum install -y git
            else
                print_warning "Package manager not found. Please install Git manually from https://git-scm.com/"
            fi
            ;;
        "windows")
            print_warning "Please install Git manually from https://git-scm.com/"
            ;;
        *)
            print_warning "Unknown OS. Please install Git manually from https://git-scm.com/"
            ;;
    esac
}

# Install Docker
install_docker() {
    print_header "📦 Installing Docker..."
    
    if command_exists docker; then
        print_status "Docker already installed: $(docker --version)"
        return 0
    fi
    
    case $OS in
        "macos")
            print_warning "Please install Docker Desktop from https://docs.docker.com/desktop/mac/install/"
            ;;
        "linux")
            curl -fsSL https://get.docker.com -o get-docker.sh
            sudo sh get-docker.sh
            sudo usermod -aG docker $USER
            rm get-docker.sh
            print_status "Docker installed. Please log out and back in to use Docker without sudo."
            ;;
        "windows")
            print_warning "Please install Docker Desktop from https://docs.docker.com/desktop/windows/install/"
            ;;
        *)
            print_warning "Unknown OS. Please install Docker manually from https://docs.docker.com/get-docker/"
            ;;
    esac
}

# Install kubectl
install_kubectl() {
    print_header "📦 Installing kubectl..."
    
    if command_exists kubectl; then
        print_status "kubectl already installed: $(kubectl version --client --short)"
        return 0
    fi
    
    case $OS in
        "macos")
            if command_exists brew; then
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
            print_warning "Unknown OS. Please install kubectl manually from https://kubernetes.io/docs/tasks/tools/"
            ;;
    esac
}

# Install AWS CLI
install_aws_cli() {
    print_header "📦 Installing AWS CLI..."
    
    if command_exists aws; then
        print_status "AWS CLI already installed: $(aws --version)"
        return 0
    fi
    
    case $OS in
        "macos")
            curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
            sudo installer -pkg AWSCLIV2.pkg -target /
            rm AWSCLIV2.pkg
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
            print_warning "Unknown OS. Please install AWS CLI manually from https://aws.amazon.com/cli/"
            ;;
    esac
}

# Setup project structure
setup_project_structure() {
    print_header "📁 Setting up Project Structure..."
    
    # Create necessary directories
    mkdir -p {docs,scripts,k8s,monitoring,.github/workflows}
    
    # Create basic files if they don't exist
    if [ ! -f "README.md" ]; then
        cat > README.md << EOF
# DevOps Pipeline Dashboard

A complete CI/CD pipeline implementation with containerization, cloud deployment, and monitoring.

## Features
- Real-time pipeline monitoring
- Container registry integration
- Kubernetes deployment
- Comprehensive documentation

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment
\`\`\`bash
./scripts/deploy.sh
\`\`\`

---
© 2025 All rights reserved by Olivier
EOF
    fi
    
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*

# Production
.next/
out/
build/

# Environment
.env
.env.local
.env.production

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Docker
.dockerignore
EOF
    fi
    
    print_status "Project structure created ✅"
}

# Configure Git hooks
setup_git_hooks() {
    print_header "🔧 Setting up Git Hooks..."
    
    if [ -d ".git" ]; then
        # Pre-commit hook
        cat > .git/hooks/pre-commit << EOF
#!/bin/bash
# Pre-commit hook for DevOps Pipeline

echo "Running pre-commit checks..."

# Check for large files
if git diff --cached --name-only | xargs ls -la | awk '{if(\$5 > 10485760) print \$9}' | grep -q .; then
    echo "Error: Large files detected. Please use Git LFS for files > 10MB"
    exit 1
fi

# Run linting if available
if command -v npm >/dev/null 2>&1 && [ -f "package.json" ]; then
    if npm run lint >/dev/null 2>&1; then
        echo "Linting passed ✅"
    else
        echo "Warning: Linting failed"
    fi
fi

echo "Pre-commit checks completed ✅"
EOF
        chmod +x .git/hooks/pre-commit
        print_status "Git hooks configured ✅"
    else
        print_warning "Not a Git repository. Skipping Git hooks setup."
    fi
}

# Install global tools
install_global_tools() {
    print_header "🌐 Installing Global Tools..."
    
    if command_exists npm; then
        # Install Vercel CLI
        if ! command_exists vercel; then
            npm install -g vercel
            print_status "Vercel CLI installed ✅"
        fi
        
        # Install other useful tools
        npm install -g typescript ts-node
        print_status "Global tools installed ✅"
    else
        print_warning "npm not available. Skipping global tools installation."
    fi
}

# Create configuration files
create_config_files() {
    print_header "⚙️ Creating Configuration Files..."
    
    # Docker configuration
    if [ ! -f "Dockerfile" ]; then
        cat > Dockerfile << EOF
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
EOF
        print_status "Dockerfile created ✅"
    fi
    
    # Docker Compose configuration
    if [ ! -f "docker-compose.yml" ]; then
        cat > docker-compose.yml << EOF
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: devops_pipeline
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
EOF
        print_status "Docker Compose configuration created ✅"
    fi
    
    # Environment template
    if [ ! -f ".env.example" ]; then
        cat > .env.example << EOF
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/devops_pipeline"

# AWS Configuration (Optional)
AWS_REGION="us-west-2"
AWS_ACCOUNT_ID="123456789012"
EKS_CLUSTER_NAME="production-cluster"

# Monitoring Configuration (Optional)
GRAFANA_API_KEY="your-grafana-api-key"
PROMETHEUS_URL="http://localhost:9090"

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-client-key"
STACK_SECRET_SERVER_KEY="your-stack-server-key"
EOF
        print_status "Environment template created ✅"
    fi
}

# Main setup function
main() {
    print_header "🎯 Starting DevOps Pipeline Setup"
    echo ""
    
    detect_os
    
    echo "This script will install and configure:"
    echo "- Node.js and npm"
    echo "- Git"
    echo "- Docker"
    echo "- kubectl (optional)"
    echo "- AWS CLI (optional)"
    echo "- Project structure and configuration files"
    echo ""
    
    read -p "Continue with setup? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Setup cancelled."
        exit 0
    fi
    
    # Core installations
    install_nodejs
    install_git
    install_docker
    
    # Optional installations
    read -p "Install kubectl for Kubernetes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_kubectl
    fi
    
    read -p "Install AWS CLI? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_aws_cli
    fi
    
    # Project setup
    setup_project_structure
    create_config_files
    setup_git_hooks
    install_global_tools
    
    print_header "🎉 Setup Complete!"
    echo ""
    print_status "Your development environment is ready!"
    print_status "Next steps:"
    echo "  1. Run 'npm install' to install project dependencies"
    echo "  2. Copy .env.example to .env.local and configure"
    echo "  3. Run './scripts/deploy.sh' to deploy your application"
    echo "  4. Run 'npm run dev' to start development server"
    echo ""
    print_status "Happy coding! 🚀"
}

# Run main function
main "$@"
