import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Settings, GitBranch, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PipelineConfigPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🔧 Pipeline Configuration</h1>
            <p className="text-gray-600">Complete guide to CI/CD pipeline setup</p>
          </div>
        </div>

        {/* GitHub Actions Workflow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              GitHub Actions Workflow
            </CardTitle>
            <CardDescription>Automated CI/CD pipeline configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`name: DevOps CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage

  build:
    needs: [test]
    runs-on: ubuntu-latest
    steps:
    - name: Build Docker image
      run: docker build -t \${{ env.IMAGE_NAME }} .
    
    - name: Push to registry
      run: docker push \${{ env.IMAGE_NAME }}

  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      run: kubectl apply -f k8s/`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Stages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-600" />
              Pipeline Stages
            </CardTitle>
            <CardDescription>Understanding each stage of the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">1. Test Stage</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Code checkout</div>
                  <div>• Dependency installation</div>
                  <div>• Unit tests execution</div>
                  <div>• Code coverage report</div>
                  <div>• Security audit</div>
                </div>
                <Badge variant="secondary" className="mt-3">
                  Duration: ~2 minutes
                </Badge>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold">2. Build Stage</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Docker image build</div>
                  <div>• Multi-stage optimization</div>
                  <div>• Security scanning</div>
                  <div>• Image tagging</div>
                  <div>• Registry push</div>
                </div>
                <Badge variant="secondary" className="mt-3">
                  Duration: ~3 minutes
                </Badge>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold">3. Deploy Stage</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Kubernetes deployment</div>
                  <div>• Rolling updates</div>
                  <div>• Health checks</div>
                  <div>• Service exposure</div>
                  <div>• Monitoring setup</div>
                </div>
                <Badge variant="secondary" className="mt-3">
                  Duration: ~1 minute
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environment Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
            <CardDescription>Setting up different environments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3 text-green-700">Production Environment</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    • Branch: <code>main</code>
                  </div>
                  <div>• Auto-deploy: Enabled</div>
                  <div>• Replicas: 3</div>
                  <div>• Health checks: Strict</div>
                  <div>• Monitoring: Full</div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3 text-blue-700">Staging Environment</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    • Branch: <code>develop</code>
                  </div>
                  <div>• Auto-deploy: Enabled</div>
                  <div>• Replicas: 1</div>
                  <div>• Health checks: Basic</div>
                  <div>• Monitoring: Limited</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secrets Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>GitHub Secrets Configuration</CardTitle>
            <CardDescription>Required secrets for the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Required Secrets</span>
                </div>
                <div className="text-sm text-yellow-700">
                  Add these secrets in GitHub Repository → Settings → Secrets and variables → Actions
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">AWS Secrets</h4>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                    <div>AWS_ACCESS_KEY_ID</div>
                    <div>AWS_SECRET_ACCESS_KEY</div>
                    <div>AWS_REGION</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Registry Secrets</h4>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                    <div>GITHUB_TOKEN (auto-provided)</div>
                    <div>DOCKER_USERNAME (optional)</div>
                    <div>DOCKER_PASSWORD (optional)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Common Pipeline Issues</CardTitle>
            <CardDescription>Solutions to frequent problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">Build Failures</h4>
                <div className="text-sm text-gray-600 mt-1">
                  • Check Node.js version compatibility
                  <br />• Verify all dependencies are listed
                  <br />• Review TypeScript errors
                </div>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">Test Failures</h4>
                <div className="text-sm text-gray-600 mt-1">
                  • Update test snapshots
                  <br />• Check environment variables
                  <br />• Verify mock configurations
                </div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Deployment Issues</h4>
                <div className="text-sm text-gray-600 mt-1">
                  • Verify Kubernetes cluster access
                  <br />• Check image registry permissions
                  <br />• Review resource quotas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
