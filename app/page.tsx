"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  GitBranch,
  Container,
  Cloud,
  Activity,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Play,
} from "lucide-react"

import { RepositoryModal } from "@/components/repository-modal"
import { ClusterModal } from "@/components/cluster-modal"
import { ImagesModal } from "@/components/images-modal"
import { Footer } from "@/components/footer"

interface PipelineRun {
  id: string
  status: "success" | "failed" | "running"
  branch: string
  time: string
  duration: string
  commit: string
}

interface SystemMetrics {
  cpu: number
  memory: number
  storage: number
  requests: number
  responseTime: number
  errorRate: number
  availability: number
}

interface ContainerImage {
  name: string
  size: string
  tag: string
  lastUpdated: string
}

export default function DevOpsPipelineDashboard() {
  const [pipelineStatus, setPipelineStatus] = useState<"active" | "inactive" | "error">("active")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pipelineRuns, setPipelineRuns] = useState<PipelineRun[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    storage: 28,
    requests: 1247,
    responseTime: 156,
    errorRate: 0.02,
    availability: 99.98,
  })
  const [containerImages, setContainerImages] = useState<ContainerImage[]>([])
  const [alerts, setAlerts] = useState<Array<{ type: "warning" | "success"; message: string }>>([])

  const [repositoryModalOpen, setRepositoryModalOpen] = useState(false)
  const [clusterModalOpen, setClusterModalOpen] = useState(false)
  const [imagesModalOpen, setImagesModalOpen] = useState(false)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with slight variations
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        requests: Math.max(800, Math.min(2000, prev.requests + Math.floor((Math.random() - 0.5) * 200))),
        responseTime: Math.max(50, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 20)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Load initial data
  useEffect(() => {
    loadPipelineData()
    loadContainerImages()
    loadAlerts()
  }, [])

  const loadPipelineData = async () => {
    try {
      const response = await fetch("/api/pipeline/runs")
      if (response.ok) {
        const data = await response.json()
        setPipelineRuns(data)
      }
    } catch (error) {
      console.error("Failed to load pipeline data:", error)
      // Fallback to mock data
      setPipelineRuns([
        { id: "#1234", status: "success", branch: "main", time: "2 min ago", duration: "3m 45s", commit: "abc123f" },
        {
          id: "#1233",
          status: "running",
          branch: "feature/auth",
          time: "5 min ago",
          duration: "2m 30s",
          commit: "def456a",
        },
        {
          id: "#1232",
          status: "failed",
          branch: "feature/ui",
          time: "1 hour ago",
          duration: "1m 15s",
          commit: "ghi789b",
        },
        { id: "#1231", status: "success", branch: "main", time: "4 hours ago", duration: "3m 55s", commit: "jkl012c" },
      ])
    }
  }

  const loadContainerImages = () => {
    setContainerImages([
      { name: "app:latest", size: "45.2 MB", tag: "latest", lastUpdated: "2 min ago" },
      { name: "app:v1.2.3", size: "45.2 MB", tag: "v1.2.3", lastUpdated: "1 hour ago" },
      { name: "app:staging", size: "47.1 MB", tag: "staging", lastUpdated: "3 hours ago" },
    ])
  }

  const loadAlerts = () => {
    setAlerts([
      { type: "warning", message: "High memory usage on node-2 (85%)" },
      { type: "success", message: "All health checks passing" },
    ])
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await Promise.all([
      loadPipelineData(),
      new Promise((resolve) => setTimeout(resolve, 1000)), // Simulate API delay
    ])
    setIsRefreshing(false)
  }

  const triggerPipeline = async () => {
    try {
      const response = await fetch("/api/pipeline/trigger", { method: "POST" })
      if (response.ok) {
        const newRun = await response.json()
        setPipelineRuns((prev) => [newRun, ...prev])
      }
    } catch (error) {
      console.error("Failed to trigger pipeline:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      case "running":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "running":
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-6">
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
          <Card
            className={`border-2 ${pipelineStatus === "active" ? "border-green-200 bg-green-50" : pipelineStatus === "error" ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle
                  className={`flex items-center gap-2 ${pipelineStatus === "active" ? "text-green-800" : pipelineStatus === "error" ? "text-red-800" : "text-gray-800"}`}
                >
                  {pipelineStatus === "active" ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : pipelineStatus === "error" ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Clock className="w-6 h-6" />
                  )}
                  Pipeline Status: {pipelineStatus.charAt(0).toUpperCase() + pipelineStatus.slice(1)}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
                    <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                  <Button variant="default" size="sm" onClick={triggerPipeline}>
                    <Play className="w-4 h-4 mr-1" />
                    Trigger Build
                  </Button>
                </div>
              </div>
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
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5" />
                      Repository
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Structured Git repository with feature branches</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>Commits this week</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Active branches</span>
                        <span className="font-medium">5</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setRepositoryModalOpen(true)}
                    >
                      View Repository
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Container className="w-5 h-5" />
                      Containerization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Docker containers with multi-stage builds</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>Images built</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Avg build time</span>
                        <span className="font-medium">2m 45s</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setImagesModalOpen(true)}
                    >
                      View Images
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="w-5 h-5" />
                      Cloud Deployment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Kubernetes cluster on AWS EKS</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>Deployments</span>
                        <span className="font-medium">42</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Success rate</span>
                        <span className="font-medium">98.5%</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setClusterModalOpen(true)}
                    >
                      View Cluster
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Live System Metrics</CardTitle>
                  <CardDescription>Real-time performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{metrics.requests.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Requests/min</div>
                      <div className="text-xs text-blue-500 mt-1">↑ 12% from last hour</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{metrics.responseTime}ms</div>
                      <div className="text-sm text-gray-600">Avg Response</div>
                      <div className="text-xs text-green-500 mt-1">↓ 5% from last hour</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">{metrics.errorRate}%</div>
                      <div className="text-sm text-gray-600">Error Rate</div>
                      <div className="text-xs text-red-500 mt-1">↑ 0.01% from last hour</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{metrics.availability}%</div>
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="text-xs text-purple-500 mt-1">→ Stable</div>
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
                          <li>• Unit tests (98% coverage)</li>
                        </ul>
                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-1">Avg Duration: 2m 15s</div>
                          <Progress value={85} className="h-2" />
                        </div>
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
                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-1">Avg Duration: 1m 30s</div>
                          <Progress value={92} className="h-2" />
                        </div>
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
                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-1">Avg Duration: 45s</div>
                          <Progress value={78} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Pipeline Runs</CardTitle>
                    <Button variant="outline" size="sm" onClick={loadPipelineData}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pipelineRuns.map((run) => (
                      <div
                        key={run.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(run.status)}
                          <div>
                            <div className="font-medium">{run.id}</div>
                            <div className="text-sm text-gray-600">
                              {run.branch} • {run.commit}
                            </div>
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
                        {containerImages.map((image, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="text-sm font-mono font-medium">{image.name}</div>
                              <div className="text-xs text-gray-500">{image.lastUpdated}</div>
                            </div>
                            <Badge variant="outline">{image.size}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Build Performance</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Build Success Rate</span>
                            <span>96%</span>
                          </div>
                          <Progress value={96} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Cache Hit Rate</span>
                            <span>84%</span>
                          </div>
                          <Progress value={84} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Image Optimization</span>
                            <span>78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Scanning Results</CardTitle>
                  <CardDescription>Automated vulnerability detection with Trivy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-gray-600">Critical</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">1</div>
                      <div className="text-sm text-gray-600">High</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">3</div>
                      <div className="text-sm text-gray-600">Medium</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">7</div>
                      <div className="text-sm text-gray-600">Low</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-orange-50 border border-orange-200 rounded">
                      <span className="text-sm">CVE-2023-1234: Outdated dependency</span>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <span className="text-sm">CVE-2023-5678: Minor security issue</span>
                      <Badge variant="secondary">Medium</Badge>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-gray-600">Nodes</div>
                      <div className="text-xs text-green-500 mt-1">All healthy</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">6</div>
                      <div className="text-sm text-gray-600">Pods</div>
                      <div className="text-xs text-green-500 mt-1">Running</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2</div>
                      <div className="text-sm text-gray-600">Services</div>
                      <div className="text-xs text-green-500 mt-1">Active</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                      <div className="text-xs text-green-500 mt-1">30 days</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Cluster Resources</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>CPU Usage</span>
                            <span>{Math.round(metrics.cpu)}%</span>
                          </div>
                          <Progress value={metrics.cpu} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Memory Usage</span>
                            <span>{Math.round(metrics.memory)}%</span>
                          </div>
                          <Progress value={metrics.memory} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Storage Usage</span>
                            <span>{Math.round(metrics.storage)}%</span>
                          </div>
                          <Progress value={metrics.storage} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Pod Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">app-deployment-1</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Running
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">app-deployment-2</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Running
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">app-deployment-3</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Running
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Monitoring Dashboard</CardTitle>
                  <CardDescription>Real-time metrics with Prometheus and Grafana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{metrics.requests.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Requests/min</div>
                      <div className="text-xs text-blue-500 mt-1">Live</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{metrics.responseTime}ms</div>
                      <div className="text-sm text-gray-600">Avg Response</div>
                      <div className="text-xs text-green-500 mt-1">P95: 280ms</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{metrics.errorRate}%</div>
                      <div className="text-sm text-gray-600">Error Rate</div>
                      <div className="text-xs text-red-500 mt-1">24h avg</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{metrics.availability}%</div>
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="text-xs text-purple-500 mt-1">SLA: 99.9%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Active Alerts</h4>
                      <div className="space-y-2">
                        {alerts.map((alert, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-2 p-3 rounded-lg border ${
                              alert.type === "warning"
                                ? "bg-yellow-50 border-yellow-200"
                                : "bg-green-50 border-green-200"
                            }`}
                          >
                            {alert.type === "warning" ? (
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                            <span className="text-sm">{alert.message}</span>
                          </div>
                        ))}
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
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Load Balancer</span>
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
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => window.open("/docs/setup-guide", "_blank")}
                        >
                          📋 Project Setup Guide
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => window.open("/docs/pipeline-config", "_blank")}
                        >
                          🔧 Pipeline Configuration
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => window.open("/docs/docker-practices", "_blank")}
                        >
                          🐳 Docker Best Practices
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => window.open("/docs/kubernetes-deployment", "_blank")}
                        >
                          ☸️ Kubernetes Deployment
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => window.open("/docs/monitoring-setup", "_blank")}
                        >
                          📊 Monitoring Setup
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => window.open("/docs/troubleshooting", "_blank")}
                        >
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
                          <div className="text-xs text-blue-600 mt-1">3 participants</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm font-medium">Code Review - Yesterday</div>
                          <div className="text-xs text-gray-600">Security improvements approved</div>
                          <div className="text-xs text-green-600 mt-1">2 approvals</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm font-medium">Sprint Planning - 2 days ago</div>
                          <div className="text-xs text-gray-600">Monitoring enhancements planned</div>
                          <div className="text-xs text-purple-600 mt-1">5 story points</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Deliverables Checklist</CardTitle>
                  <CardDescription>Project completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Git Repository Link</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">CI/CD Pipeline Setup</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Docker Configuration</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Kubernetes Deployment Files</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Monitoring Dashboard</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Project Documentation</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Team Communication Log</span>
                        <Badge variant="secondary" className="ml-auto">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Team Presentation</span>
                        <Badge variant="outline" className="ml-auto">
                          Scheduled
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <RepositoryModal open={repositoryModalOpen} onOpenChange={setRepositoryModalOpen} />
          <ClusterModal open={clusterModalOpen} onOpenChange={setClusterModalOpen} />
          <ImagesModal open={imagesModalOpen} onOpenChange={setImagesModalOpen} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
