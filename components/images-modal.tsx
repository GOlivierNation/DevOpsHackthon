"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Container, Shield, Activity, Download, RefreshCw, ExternalLink, Copy, Terminal, Eye } from "lucide-react"

interface ImagesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImagesModal({ open, onOpenChange }: ImagesModalProps) {
  const [imagesData, setImagesData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const fetchImagesData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/images")
      if (response.ok) {
        const data = await response.json()
        setImagesData(data)
      }
    } catch (error) {
      console.error("Failed to fetch images data:", error)
    } finally {
      setLoading(false)
    }
  }

  const openRegistry = () => {
    const registryUrl =
      imagesData?.registryUrl ||
      "https://github.com/users/GOlivierNation/packages/container/package/devops-hackathon-pipeline"
    window.open(registryUrl, "_blank", "noopener,noreferrer")
  }

  const copyToClipboard = async (text: string, commandType: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(commandType)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  useEffect(() => {
    if (open) {
      fetchImagesData()
    }
  }, [open])

  const getVulnerabilityColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return <Badge variant="destructive">{severity}</Badge>
      case "MEDIUM":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {severity}
          </Badge>
        )
      case "LOW":
        return <Badge variant="outline">{severity}</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  if (!imagesData && !loading) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Container className="w-5 h-5" />
                {imagesData?.packageName || "Container Images"}
              </DialogTitle>
              <DialogDescription>
                Registry: {imagesData?.registry} • {imagesData?.visibility} • {imagesData?.totalImages} versions
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchImagesData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={openRegistry}>
                <ExternalLink className="w-4 h-4 mr-1" />
                Registry
              </Button>
            </div>
          </div>
          {imagesData?.description && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">{imagesData.description}</p>
            </div>
          )}
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            Loading container registry data...
          </div>
        ) : (
          <Tabs defaultValue="images" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="builds">Builds</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{imagesData?.totalImages}</div>
                  <div className="text-sm text-gray-600">Total Versions</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{imagesData?.totalSize}</div>
                  <div className="text-sm text-gray-600">Total Size</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{imagesData?.registryStats.totalPulls}</div>
                  <div className="text-sm text-gray-600">Total Pulls</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{imagesData?.registryStats.uniquePullers}</div>
                  <div className="text-sm text-gray-600">Unique Pullers</div>
                </div>
              </div>

              <div className="space-y-3">
                {imagesData?.images.map((image: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Container className="w-4 h-4" />
                        <span className="font-medium">{image.name}</span>
                        <Badge variant={image.tag === "latest" ? "default" : "outline"}>{image.tag}</Badge>
                        {image.tag === "latest" && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Latest
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          <span>{image.pulls} pulls</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{image.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600 mb-1">Image Details</div>
                        <div className="space-y-1">
                          <div>
                            Size: <span className="font-medium">{image.size}</span>
                          </div>
                          <div>
                            Layers: <span className="font-medium">{image.layers}</span>
                          </div>
                          <div>
                            Arch: <span className="font-medium">{image.architecture}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600 mb-1">Build Info</div>
                        <div className="space-y-1">
                          <div>
                            Workflow: <span className="font-medium">{image.buildInfo.workflow}</span>
                          </div>
                          <div>
                            Branch: <span className="font-medium">{image.buildInfo.branch}</span>
                          </div>
                          <div>
                            Time: <span className="font-medium">{image.buildInfo.buildTime}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600 mb-1">Timestamps</div>
                        <div className="space-y-1">
                          <div>
                            Created: <span className="font-medium">{image.created}</span>
                          </div>
                          <div>
                            Last Pull: <span className="font-medium">{image.lastPull}</span>
                          </div>
                          <div>
                            Pushed by: <span className="font-medium">{image.pushedBy}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600 mb-1">Security Scan</div>
                        <div className="flex gap-2 text-xs">
                          <span className={getVulnerabilityColor("critical")}>C: {image.vulnerabilities.critical}</span>
                          <span className={getVulnerabilityColor("high")}>H: {image.vulnerabilities.high}</span>
                          <span className={getVulnerabilityColor("medium")}>M: {image.vulnerabilities.medium}</span>
                          <span className={getVulnerabilityColor("low")}>L: {image.vulnerabilities.low}</span>
                        </div>
                        <div className="mt-1">
                          <code className="text-xs bg-gray-100 px-1 rounded">{image.digest.substring(0, 20)}...</code>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Scan Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last Scan:</span>
                      <span className="font-medium">{imagesData?.securityScan.lastScan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scanner:</span>
                      <span className="font-medium">{imagesData?.securityScan.scanner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{imagesData?.securityScan.scanDuration}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Issues:</span>
                      <span className="font-medium">{imagesData?.securityScan.totalVulnerabilities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixable:</span>
                      <span className="font-medium text-green-600">
                        {imagesData?.securityScan.fixableVulnerabilities}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fix Rate:</span>
                      <span className="font-medium text-blue-600">
                        {Math.round(
                          (imagesData?.securityScan.fixableVulnerabilities /
                            imagesData?.securityScan.totalVulnerabilities) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="text-lg font-bold text-red-600">
                        {imagesData?.images.reduce((sum: number, img: any) => sum + img.vulnerabilities.critical, 0)}
                      </div>
                      <div className="text-xs text-gray-600">Critical</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">
                        {imagesData?.images.reduce((sum: number, img: any) => sum + img.vulnerabilities.high, 0)}
                      </div>
                      <div className="text-xs text-gray-600">High</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Vulnerability Details</h4>
                {imagesData?.securityScan.scanResults.map((vuln: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(vuln.severity)}
                        <span className="font-medium">{vuln.package}</span>
                        <code className="text-sm bg-gray-100 px-1 rounded">{vuln.version}</code>
                      </div>
                      {vuln.fixedVersion && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Fix: {vuln.fixedVersion}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{vuln.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="builds" className="space-y-4">
              <div className="space-y-3">
                {imagesData?.buildHistory.map((build: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={build.status === "success" ? "default" : "destructive"}>{build.status}</Badge>
                        <div>
                          <div className="font-medium">{build.tag}</div>
                          <div className="text-sm text-gray-600">{build.workflow}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{build.timestamp}</div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {build.buildTime}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">
                          Trigger: <span className="font-medium">{build.triggeredBy}</span>
                        </div>
                        <div className="text-gray-600">
                          Author: <span className="font-medium">{build.author}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">
                          Commit: <code className="text-xs bg-gray-100 px-1 rounded">{build.commit}</code>
                        </div>
                        <div className="text-gray-600">
                          Workflow: <span className="font-medium">{build.workflow}</span>
                        </div>
                      </div>
                      <div>
                        {build.error && (
                          <div className="text-red-600 text-xs bg-red-50 p-2 rounded">Error: {build.error}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Docker Commands
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Pull Image</div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-gray-900 text-green-400 p-2 rounded text-sm">
                          {imagesData?.usageInstructions.pullCommand}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(imagesData?.usageInstructions.pullCommand, "pull")}
                        >
                          <Copy className="w-3 h-3" />
                          {copiedCommand === "pull" ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Run Container</div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-gray-900 text-green-400 p-2 rounded text-sm">
                          {imagesData?.usageInstructions.runCommand}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(imagesData?.usageInstructions.runCommand, "run")}
                        >
                          <Copy className="w-3 h-3" />
                          {copiedCommand === "run" ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Kubernetes Deployment</h4>
                  <div className="flex items-start gap-2">
                    <pre className="flex-1 bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                      {imagesData?.usageInstructions.kubernetesExample}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(imagesData?.usageInstructions.kubernetesExample, "k8s")}
                    >
                      <Copy className="w-3 h-3" />
                      {copiedCommand === "k8s" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dockerfile" className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Dockerfile Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Base Image</div>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {imagesData?.dockerfileInfo.baseImage}
                      </code>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Build Stages</div>
                      <div className="flex gap-1">
                        {imagesData?.dockerfileInfo.stages.map((stage: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {stage}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Total Layers</div>
                      <span className="font-medium">{imagesData?.dockerfileInfo.totalLayers}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Exposed Ports</div>
                      <div className="flex gap-1">
                        {imagesData?.dockerfileInfo.exposedPorts.map((port: number, index: number) => (
                          <Badge key={index} variant="outline">
                            {port}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Health Check</div>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {imagesData?.dockerfileInfo.healthCheck}
                      </code>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Working Directory</div>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {imagesData?.dockerfileInfo.workdir}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Optimizations</div>
                  <div className="flex flex-wrap gap-2">
                    {imagesData?.dockerfileInfo.optimizations.map((opt: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {opt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Registry Usage</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Used</span>
                        <span>
                          {imagesData?.registryStats.storageUsed} / {imagesData?.registryStats.storageLimit}
                        </span>
                      </div>
                      <Progress
                        value={
                          (Number.parseFloat(imagesData?.registryStats.storageUsed) /
                            Number.parseFloat(imagesData?.registryStats.storageLimit)) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Pulls:</span>
                        <span className="font-medium">{imagesData?.registryStats.totalPulls}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Week:</span>
                        <span className="font-medium">{imagesData?.registryStats.weeklyPulls}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Month:</span>
                        <span className="font-medium">{imagesData?.registryStats.monthlyPulls}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bandwidth:</span>
                        <span className="font-medium">{imagesData?.registryStats.bandwidth}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Top Pullers</h4>
                  <div className="space-y-2">
                    {imagesData?.registryStats.topPullers.map((puller: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{puller.name}</span>
                        <Badge variant="outline">{puller.pulls} pulls</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Build Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2m 58s</div>
                    <div className="text-sm text-gray-600">Avg Build Time</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">96.2%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">84.5%</div>
                    <div className="text-sm text-gray-600">Cache Hit Rate</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">234</div>
                    <div className="text-sm text-gray-600">Total Builds</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
