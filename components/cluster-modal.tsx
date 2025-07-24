"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Cloud, Server, Activity, Network, RefreshCw, ExternalLink, AlertTriangle } from 'lucide-react'

interface ClusterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClusterModal({ open, onOpenChange }: ClusterModalProps) {
  const [clusterData, setClusterData] = useState<any>(null)
  const [awsConsoleData, setAwsConsoleData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchClusterData = async () => {
    setLoading(true)
    try {
      const [clusterResponse, awsResponse] = await Promise.all([fetch("/api/cluster"), fetch("/api/aws/console")])

      if (clusterResponse.ok) {
        const data = await clusterResponse.json()
        setClusterData(data)
      }

      if (awsResponse.ok) {
        const awsData = await awsResponse.json()
        setAwsConsoleData(awsData)
      }
    } catch (error) {
      console.error("Failed to fetch cluster data:", error)
    } finally {
      setLoading(false)
    }
  }

  const openAWSConsole = () => {
    if (awsConsoleData?.directClusterUrl) {
      window.open(awsConsoleData.directClusterUrl, "_blank")
    } else {
      window.open(awsConsoleData?.consoleUrls?.eks || "https://console.aws.amazon.com/eks/", "_blank")
    }
  }

  useEffect(() => {
    if (open) {
      fetchClusterData()
    }
  }, [open])

  if (!clusterData && !loading) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5" />
                {clusterData?.name || "Kubernetes Cluster"}
              </DialogTitle>
              <DialogDescription>
                {clusterData?.provider} cluster in {awsConsoleData?.region || clusterData?.region}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchClusterData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              {awsConsoleData?.isConfigured ? (
                <Button variant="outline" size="sm" onClick={openAWSConsole}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  AWS Console
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Configure AWS
                </Button>
              )}
            </div>
          </div>
          {!awsConsoleData?.isConfigured && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">AWS Configuration Required</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Set AWS_REGION, AWS_ACCOUNT_ID, and EKS_CLUSTER_NAME environment variables to enable AWS Console
                integration.
              </p>
            </div>
          )}
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            Loading cluster data...
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nodes">Nodes</TabsTrigger>
              <TabsTrigger value="workloads">Workloads</TabsTrigger>
              <TabsTrigger value="networking">Network</TabsTrigger>
              <TabsTrigger value="aws">AWS Services</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Cluster Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span className="font-medium">{clusterData?.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="default">{clusterData?.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Region:</span>
                      <span className="font-medium">{awsConsoleData?.region || clusterData?.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nodes:</span>
                      <span className="font-medium">
                        {clusterData?.nodes.ready}/{clusterData?.nodes.total}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-medium">{clusterData?.monitoring.uptime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Resource Utilization</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU</span>
                        <span>{clusterData?.nodes.utilization.cpu}%</span>
                      </div>
                      <Progress value={clusterData?.nodes.utilization.cpu} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory</span>
                        <span>{clusterData?.nodes.utilization.memory}%</span>
                      </div>
                      <Progress value={clusterData?.nodes.utilization.memory} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage</span>
                        <span>{clusterData?.nodes.utilization.storage}%</span>
                      </div>
                      <Progress value={clusterData?.nodes.utilization.storage} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Namespaces</h4>
                  <div className="space-y-2">
                    {clusterData?.namespaces.map((ns: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{ns.name}</span>
                          <div className="text-xs text-gray-600">
                            {ns.pods} pods • {ns.services} services
                          </div>
                        </div>
                        <Badge variant={ns.status === "active" ? "default" : "secondary"}>{ns.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Monitoring Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Prometheus:</span>
                      <Badge variant="default">{clusterData?.monitoring.prometheus}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Grafana:</span>
                      <Badge variant="default">{clusterData?.monitoring.grafana}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>AlertManager:</span>
                      <Badge variant="default">{clusterData?.monitoring.alertManager}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nodes" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Node Capacity</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{clusterData?.nodes.capacity.cpu}</div>
                    <div className="text-sm text-gray-600">Total CPU</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{clusterData?.nodes.capacity.memory}</div>
                    <div className="text-sm text-gray-600">Total Memory</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{clusterData?.nodes.capacity.storage}</div>
                    <div className="text-sm text-gray-600">Total Storage</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workloads" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{clusterData?.workloads.deployments}</div>
                  <div className="text-sm text-gray-600">Deployments</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{clusterData?.workloads.services}</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{clusterData?.workloads.ingresses}</div>
                  <div className="text-sm text-gray-600">Ingresses</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{clusterData?.workloads.configMaps}</div>
                  <div className="text-sm text-gray-600">ConfigMaps</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{clusterData?.workloads.secrets}</div>
                  <div className="text-sm text-gray-600">Secrets</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="networking" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Network Configuration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cluster IP:</span>
                      <code className="text-xs">{clusterData?.networking.clusterIP}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Service IP:</span>
                      <code className="text-xs">{clusterData?.networking.serviceIP}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>DNS Name:</span>
                      <code className="text-xs">{clusterData?.networking.dnsName}</code>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Load Balancers:</span>
                      <span className="font-medium">{clusterData?.networking.loadBalancers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Policies:</span>
                      <span className="font-medium">{clusterData?.security.networkPolicies}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="aws" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  AWS Services Quick Access
                </h4>
                {awsConsoleData?.isConfigured ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.eks, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      EKS Clusters
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.ec2, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      EC2 Instances
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.cloudwatch, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      CloudWatch
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.vpc, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      VPC
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.iam, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      IAM Roles
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.s3, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      S3 Buckets
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.rds, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      RDS Databases
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start bg-transparent"
                      onClick={() => window.open(awsConsoleData.consoleUrls.lambda, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Lambda Functions
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h5 className="font-medium text-gray-900 mb-2">AWS Configuration Required</h5>
                    <p className="text-sm text-gray-600 mb-4">
                      Configure the following environment variables to enable AWS Console integration:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg text-left">
                      <code className="text-xs block mb-1">AWS_REGION=us-west-2</code>
                      <code className="text-xs block mb-1">AWS_ACCOUNT_ID=123456789012</code>
                      <code className="text-xs block">EKS_CLUSTER_NAME=production-cluster</code>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="space-y-2">
                {clusterData?.recentEvents.map((event: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg ${
                      event.type === "Warning" ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant={event.type === "Warning" ? "destructive" : "default"}>{event.type}</Badge>
                      <span className="text-xs text-gray-600">{event.timestamp}</span>
                    </div>
                    <div className="text-sm font-medium">{event.reason}</div>
                    <div className="text-sm text-gray-600">{event.message}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
