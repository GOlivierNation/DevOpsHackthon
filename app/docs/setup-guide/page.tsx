import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, GitBranch, Terminal, Download } from "lucide-react"
import Link from "next/link"

export default function SetupGuidePage() {
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
            <h1 className="text-3xl font-bold text-gray-900">📋 Project Setup Guide</h1>
            <p className="text-gray-600">Complete guide to set up the DevOps CI/CD Pipeline</p>
          </div>
        </div>

        {/* Prerequisites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Prerequisites
            </CardTitle>
            <CardDescription>Required tools and accounts before starting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Required Software</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Node.js 18+ installed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Git installed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Docker installed (optional)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">kubectl installed (for K8s)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Required Accounts</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">GitHub account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Vercel account (free)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">AWS account (optional)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Docker Hub account (optional)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              Quick Start Commands
            </CardTitle>
            <CardDescription>Get up and running in 5 minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
              <div># 1. Clone the repository</div>
              <div>git clone https://github.com/GOlivierNation/DevOpsHackthon.git</div>
              <div>cd DevOpsHackthon</div>
              <div></div>
              <div># 2. Install dependencies</div>
              <div>npm install</div>
              <div></div>
              <div># 3. Start development server</div>
              <div>npm run dev</div>
              <div></div>
              <div># 4. Open browser</div>
              <div># Visit: http://localhost:3000</div>
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-600" />
              Project Structure
            </CardTitle>
            <CardDescription>Understanding the codebase organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-1">
                <div>📁 DevOpsHackthon/</div>
                <div>├── 📁 app/ # Next.js App Router</div>
                <div>│ ├── 📁 api/ # API routes</div>
                <div>│ ├── 📁 docs/ # Documentation pages</div>
                <div>│ ├── layout.tsx # Root layout</div>
                <div>│ └── page.tsx # Main dashboard</div>
                <div>├── 📁 components/ # React components</div>
                <div>├── 📁 .github/workflows/ # GitHub Actions</div>
                <div>├── 📁 k8s/ # Kubernetes manifests</div>
                <div>├── 📁 scripts/ # Setup scripts</div>
                <div>├── Dockerfile # Docker configuration</div>
                <div>├── docker-compose.yml # Local development</div>
                <div>├── vercel.json # Vercel config</div>
                <div>└── README.md # Project documentation</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environment Setup */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
            <CardDescription>Setting up environment variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Required Environment Variables</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div># AWS Configuration (Optional)</div>
                <div>AWS_REGION=us-west-2</div>
                <div>AWS_ACCOUNT_ID=123456789012</div>
                <div>EKS_CLUSTER_NAME=production-cluster</div>
                <div></div>
                <div># Application Configuration</div>
                <div>NODE_ENV=production</div>
                <div>NEXT_PUBLIC_APP_URL=https://your-app.vercel.app</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Badge variant="outline" className="p-2 justify-center">
                Development: .env.local
              </Badge>
              <Badge variant="outline" className="p-2 justify-center">
                Vercel: Dashboard Settings
              </Badge>
              <Badge variant="outline" className="p-2 justify-center">
                Railway: CLI or Dashboard
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-orange-600" />
              Next Steps
            </CardTitle>
            <CardDescription>What to do after setup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Development</h4>
                <div className="space-y-1 text-sm">
                  <div>• Configure pipeline settings</div>
                  <div>• Set up Docker containers</div>
                  <div>• Deploy to Kubernetes</div>
                  <div>• Configure monitoring</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Production</h4>
                <div className="space-y-1 text-sm">
                  <div>• Deploy to Vercel/Railway</div>
                  <div>• Set up custom domain</div>
                  <div>• Configure alerts</div>
                  <div>• Monitor performance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
