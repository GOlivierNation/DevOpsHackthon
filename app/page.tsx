"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, GitBranch, Package, Cloud, Play, RefreshCw, CheckCircle, XCircle, Clock, TrendingUp, Server, Database, Zap } from 'lucide-react'
import { RepositoryModal } from "@/components/repository-modal"
import { ImagesModal } from "@/components/images-modal"
import { ClusterModal } from "@/components/cluster-modal"
import Image from 'next/image';
import Link from 'next/link';

interface PipelineRun {
  id: string
  status: "success" | "failure" | "running" | "pending"
  branch: string
  time: string
  duration: string
  commit: string
  author: string
  message: string
}

interface Metric {
  name: string
  value: number
  unit: string
  change: number
  trend: "up" | "down" | "stable"
}

export default function Dashboard() {
  const [repositoryModalOpen, setRepositoryModalOpen] = useState(false)
  const [imagesModalOpen, setImagesModalOpen] = useState(false)
  const [clusterModalOpen, setClusterModalOpen] = useState(false)
  const [pipelineRuns, setPipelineRuns] = useState<PipelineRun[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Mock data for pipeline runs
  const mockPipelineRuns: PipelineRun[] = [
    {
      id: "#1234",
      status: "success",
      branch: "main",
      time: "2 min ago",
      duration: "3m 45s",
      commit: "abc123f",
      author: "Olivier",
      message: "Add monitoring dashboard",
    },
    {
      id: "#1233",
      status: "running",
      branch: "feature/auth",
      time: "5 min ago",
      duration: "2m 30s",
      commit: "def456a",
      author: "DevOps Bot",
      message: "Implement OAuth integration",
    },
    {
      id: "#1232",
      status: "failure",
      branch: "feature/ui",
      time: "1 hour ago",
      duration: "1m 15s",
      commit: "ghi789b",
      author: "Developer",
      message: "Update dashboard components",
    },
    {
      id: "#1231",
      status: "success",
      branch: "main",
      time: "4 hours ago",
      duration: "3m 55s",
      commit: "jkl012c",
      author: "CI System",
      message: "Performance improvements",
    },
  ]

  // Mock metrics data
  const mockMetrics: Metric[] = [
    {
      name: "Response Time",
      value: 245,
      unit: "ms",
      change: -12,
      trend: "down"
    },
    {
      name: "Success Rate",
      value: 99.2,
      unit: "%",
      change: 0.3,
      trend: "up"
    },
    {
      name: "Active Deployments",
      value: 8,
      unit: "",
      change: 2,
      trend: "up"
    },
    {
      name: "CPU Usage",
      value: 45,
      unit: "%",
      change: -5,
      trend: "down"
    }
  ]

  const fetchData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPipelineRuns(mockPipelineRuns)
      setMetrics(mockMetrics)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const triggerPipeline = async () => {
    try {
      const response = await fetch("/api/pipeline/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branch: "main",
          environment: "production",
          triggeredBy: "Manual"
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Pipeline triggered:", result)
        // Add the new run to the beginning of the list
        const newRun: PipelineRun = {
          id: `#${Math.floor(Math.random() * 9000) + 1000}`,
          status: "running",
          branch: "main",
          time: "just now",
          duration: "0s",
          commit: Math.random().toString(36).substring(2, 9),
          author: "Manual",
          message: "Manual pipeline trigger",
        }
        setPipelineRuns(prev => [newRun, ...prev])
      }
    } catch (error) {
      console.error("Failed to trigger pipeline:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failure":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failure":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-600" />
      case "down":
        return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
      default:
        return <div className="w-3 h-3" />
    }
  }

  useEffect(() => {
    fetchData()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              DevOps Pipeline Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor your CI/CD pipeline, deployments, and infrastructure
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button onClick={fetchData} disabled={loading} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={triggerPipeline} className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Trigger Pipeline
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setRepositoryModalOpen(true)}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repository</CardTitle>
              <GitBranch className="w-4 h-4 ml-auto text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">DevOpsHackthon</div>
              <p className="text-xs text-gray-600">156 commits • 8 branches</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setClusterModalOpen(true)}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cluster</CardTitle>
              <Cloud className="w-4 h-4 ml-auto text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">AWS EKS</div>
              <p className="text-xs text-gray-600">3 nodes • 12 pods running</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setImagesModalOpen(true)}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Images</CardTitle>
              <Package className="w-4 h-4 ml-auto text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2 Images</div>
              <p className="text-xs text-gray-600">5 tags • 1.04 GB total</p>
            </CardContent>
          </Card>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                {getTrendIcon(metric.trend)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit}
                </div>
                <p className={`text-xs ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}{metric.unit} from last hour
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Pipeline Runs
                </CardTitle>
                <CardDescription>
                  Latest CI/CD pipeline executions and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineRuns.map((run, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(run.status)}
                        <div>
                          <div className="font-medium">{run.id}</div>
                          <div className="text-sm text-gray-600">{run.message}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">{run.branch}</Badge>
                        <span className="text-gray-600">{run.author}</span>
                        <span className="text-gray-600">{run.time}</span>
                        <Badge className={getStatusColor(run.status)}>
                          {run.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production</CardTitle>
                  <CardDescription>Current production deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Version:</span>
                      <code className="text-sm">v1.2.3</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deployed:</span>
                      <span className="text-sm">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Uptime:</span>
                      <span className="text-sm">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staging</CardTitle>
                  <CardDescription>Staging environment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Version:</span>
                      <code className="text-sm">v1.3.0-beta</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deployed:</span>
                      <span className="text-sm">30 min ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tests:</span>
                      <span className="text-sm text-green-600">Passing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk Usage</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Connection Pool:</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Connections:</span>
                    <span>15/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Query Time (avg):</span>
                    <span>12ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cache Hit Rate:</span>
                    <span>94.2%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Setup Guide</CardTitle>
                  <CardDescription>Get started with the pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Complete setup instructions for development and production environments.
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Pipeline Config</CardTitle>
                  <CardDescription>CI/CD configuration guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Learn how to configure and customize your CI/CD pipeline.
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Docker Practices</CardTitle>
                  <CardDescription>Container best practices</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Best practices for Docker containerization and optimization.
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Kubernetes Deploy</CardTitle>
                  <CardDescription>K8s deployment guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Deploy and manage applications on Kubernetes clusters.
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Monitoring Setup</CardTitle>
                  <CardDescription>Observability configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Set up monitoring, logging, and alerting for your applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Troubleshooting</CardTitle>
                  <CardDescription>Common issues and solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Troubleshoot common problems and find solutions quickly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p>© 2025 DevOps Pipeline Dashboard. Built with Next.js and Tailwind CSS.</p>
            </div>
            <div className="flex items-center gap-4">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last deployment: 2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RepositoryModal open={repositoryModalOpen} onOpenChange={setRepositoryModalOpen} />
      <ImagesModal open={imagesModalOpen} onOpenChange={setImagesModalOpen} />
      <ClusterModal open={clusterModalOpen} onOpenChange={setClusterModalOpen} />
    </div>
  )
}
