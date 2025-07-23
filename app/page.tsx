import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, Container, Cloud, Activity, FileText, Users, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function DevOpsPipelineDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">DevOps Real-Life Pipeline Challenge</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete CI/CD pipeline implementation with containerization, cloud deployment, and monitoring
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              <GitBranch className="w-4 h-4 mr-1" />
              Version Control
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Container className="w-4 h-4 mr-1" />
              Docker
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Cloud className="w-4 h-4 mr-1" />
              Kubernetes
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Activity className="w-4 h-4 mr-1" />
              Monitoring
            </Badge>
          </div>
        </div>

        {/* Pipeline Status */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-6 h-6" />
              Pipeline Status: Active
            </CardTitle>
            <CardDescription>Last deployment: 2 minutes ago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">Build: Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">Tests: 98% Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">Deploy: Success</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Monitoring: Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="docker">Docker</TabsTrigger>
            <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Repository
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Structured Git repository with feature branches</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Repository
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Container className="w-5 h-5" />
                    Containerization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Docker containers with multi-stage builds</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Images
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Cloud Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Kubernetes cluster on AWS EKS</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Cluster
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Architecture</CardTitle>
                <CardDescription>Complete DevOps pipeline flow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm font-medium">Git Push</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">GitHub Actions</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 rounded-lg">
                    <Container className="w-4 h-4" />
                    <span className="text-sm font-medium">Docker Build</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 rounded-lg">
                    <Cloud className="w-4 h-4" />
                    <span className="text-sm font-medium">K8s Deploy</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-100 rounded-lg">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm font-medium">Monitor</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CI/CD Pipeline Configuration</CardTitle>
                <CardDescription>GitHub Actions workflow for automated deployment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Build Stage
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Code checkout</li>
                        <li>• Dependency installation</li>
                        <li>• Application build</li>
                        <li>• Unit tests</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Container className="w-4 h-4 text-blue-600" />
                        Package Stage
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Docker image build</li>
                        <li>• Security scanning</li>
                        <li>• Image tagging</li>
                        <li>• Registry push</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-purple-600" />
                        Deploy Stage
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Kubernetes deployment</li>
                        <li>• Health checks</li>
                        <li>• Rolling updates</li>
                        <li>• Monitoring setup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Pipeline Runs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "#1234", status: "success", branch: "main", time: "2 min ago", duration: "3m 45s" },
                    { id: "#1233", status: "success", branch: "feature/auth", time: "1 hour ago", duration: "4m 12s" },
                    { id: "#1232", status: "failed", branch: "feature/ui", time: "2 hours ago", duration: "2m 30s" },
                    { id: "#1231", status: "success", branch: "main", time: "4 hours ago", duration: "3m 55s" },
                  ].map((run) => (
                    <div key={run.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {run.status === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <div className="font-medium">{run.id}</div>
                          <div className="text-sm text-gray-600">{run.branch}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{run.time}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {run.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Docker Configuration</CardTitle>
                <CardDescription>Multi-stage Docker builds for optimized containers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Container Images</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-mono">app:latest</span>
                        <Badge variant="outline">45.2 MB</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-mono">app:v1.2.3</span>
                        <Badge variant="outline">45.2 MB</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-mono">app:staging</span>
                        <Badge variant="outline">47.1 MB</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Build Stages</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Dependencies</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Build</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">Production</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Scanning Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">Critical</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <div className="text-sm text-gray-600">Medium</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kubernetes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kubernetes Deployment</CardTitle>
                <CardDescription>AWS EKS cluster with auto-scaling and load balancing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Nodes</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">6</div>
                    <div className="text-sm text-gray-600">Pods</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2</div>
                    <div className="text-sm text-gray-600">Services</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cluster Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage Usage</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Dashboard</CardTitle>
                <CardDescription>Real-time metrics with Prometheus and Grafana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-gray-600">Requests/min</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156ms</div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">0.02%</div>
                    <div className="text-sm text-gray-600">Error Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">99.98%</div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Active Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">High memory usage on node-2</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">All systems operational</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Health Checks</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Application Health</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Database Connection</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">External APIs</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Documentation</CardTitle>
                <CardDescription>Complete documentation and team communication logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Documentation
                    </h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        📋 Project Setup Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        🔧 Pipeline Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        🐳 Docker Best Practices
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        ☸️ Kubernetes Deployment
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        📊 Monitoring Setup
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        🚨 Troubleshooting Guide
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Team Communication
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium">Daily Standup - Today</div>
                        <div className="text-xs text-gray-600">Pipeline optimization discussion</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium">Code Review - Yesterday</div>
                        <div className="text-xs text-gray-600">Security improvements approved</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium">Sprint Planning - 2 days ago</div>
                        <div className="text-xs text-gray-600">Monitoring enhancements planned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Deliverables Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Git Repository Link</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">CI/CD Pipeline Setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Docker Configuration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Kubernetes Deployment Files</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Monitoring Dashboard Screenshot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Project Documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Team Communication Log</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Team Presentation (Scheduled)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
