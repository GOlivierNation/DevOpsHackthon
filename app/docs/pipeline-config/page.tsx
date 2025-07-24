export default function PipelineConfigPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🔧 Pipeline Configuration</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">GitHub Actions Workflow</h2>
            <p className="mb-4">Our CI/CD pipeline is configured using GitHub Actions with the following stages:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🔨 Build Stage</h3>
                <ul className="text-sm text-green-700">
                  <li>• Code checkout</li>
                  <li>• Install dependencies</li>
                  <li>• Run linting</li>
                  <li>• Execute tests</li>
                  <li>• Build application</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📦 Package Stage</h3>
                <ul className="text-sm text-blue-700">
                  <li>• Build Docker image</li>
                  <li>• Security scanning</li>
                  <li>• Tag with version</li>
                  <li>• Push to registry</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">🚀 Deploy Stage</h3>
                <ul className="text-sm text-purple-700">
                  <li>• Deploy to staging</li>
                  <li>• Run integration tests</li>
                  <li>• Deploy to production</li>
                  <li>• Health checks</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Workflow Configuration</h2>
            <p className="mb-4">The pipeline is defined in <code className="bg-gray-100 px-2 py-1 rounded">.github/workflows/ci-cd.yml</code>:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  docker:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t devops-pipeline .
      - name: Security scan
        run: docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image devops-pipeline

  deploy:
    needs: [test, docker]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Required Secrets</h2>
            <p className="mb-4">Configure these secrets in your GitHub repository settings:</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="list-disc pl-6">
                <li><code className="bg-gray-100 px-2 py-1 rounded">VERCEL_TOKEN</code> - Your Vercel authentication token</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">VERCEL_ORG_ID</code> - Your Vercel organization ID</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">VERCEL_PROJECT_ID</code> - Your Vercel project ID</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">DOCKER_USERNAME</code> - Docker Hub username (optional)</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">DOCKER_PASSWORD</code> - Docker Hub password (optional)</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Branch Protection Rules</h2>
            <p className="mb-4">Recommended branch protection settings for the main branch:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Require pull request reviews before merging</li>
              <li>Require status checks to pass before merging</li>
              <li>Require branches to be up to date before merging</li>
              <li>Include administrators in restrictions</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monitoring and Notifications</h2>
            <p className="mb-4">The pipeline includes monitoring and notification features:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Slack notifications for build status</li>
              <li>Email alerts for deployment failures</li>
              <li>Performance metrics collection</li>
              <li>Security vulnerability reporting</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li>Use semantic versioning for releases</li>
                <li>Keep your secrets secure and rotate them regularly</li>
                <li>Monitor pipeline performance and optimize as needed</li>
                <li>Use feature flags for safer deployments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
