export default function SetupGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">📋 Project Setup Guide</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prerequisites</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Node.js 18+ installed</li>
              <li>Git installed and configured</li>
              <li>Docker Desktop installed</li>
              <li>GitHub account</li>
              <li>Vercel account</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Start</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Clone the repository
git clone https://github.com/GOlivierNation/DevOpsHackthon.git
cd DevOpsHackthon

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Environment Configuration</h2>
            <p className="mb-4">Update your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file with the following variables:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/devops_pipeline"

# AWS Configuration (Optional)
AWS_REGION="us-west-2"
AWS_ACCOUNT_ID="123456789012"
EKS_CLUSTER_NAME="production-cluster"

# Monitoring Configuration (Optional)
GRAFANA_API_KEY="your-grafana-api-key"
PROMETHEUS_URL="http://localhost:9090"`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Development Workflow</h2>
            <ol className="list-decimal pl-6 mb-6">
              <li>Create a new branch for your feature</li>
              <li>Make your changes</li>
              <li>Test locally with <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
              <li>Run tests with <code className="bg-gray-100 px-2 py-1 rounded">npm test</code></li>
              <li>Build the application with <code className="bg-gray-100 px-2 py-1 rounded">npm run build</code></li>
              <li>Commit and push your changes</li>
              <li>Create a pull request</li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deployment</h2>
            <p className="mb-4">Use the automated deployment script:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Make script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Troubleshooting</h2>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Common Issues:</h3>
              <ul className="list-disc pl-6 text-yellow-700">
                <li><strong>Port 3000 already in use:</strong> Kill the process or use a different port</li>
                <li><strong>Environment variables not loading:</strong> Restart the development server</li>
                <li><strong>Docker build fails:</strong> Check Docker Desktop is running</li>
                <li><strong>Database connection error:</strong> Verify DATABASE_URL is correct</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
