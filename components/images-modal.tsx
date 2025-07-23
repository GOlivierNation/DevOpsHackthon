"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Container, Shield, Activity, Download, RefreshCw, ExternalLink } from "lucide-react"

interface ImagesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImagesModal({ open, onOpenChange }: ImagesModalProps) {
  const [imagesData, setImagesData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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

  if (!imagesData && !loading) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Container className="w-5 h-5" />
                Container Images
              </DialogTitle>
              <DialogDescription>Registry: {imagesData?.registry}</DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchImagesData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    imagesData?.registryUrl ||
                      "https://github.com/GOlivierNation/DevOpsHackthon/pkgs/container/devops-pipeline-app",
                    "_blank",
                  )
                }
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Registry
              </Button>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            Loading images data...
          </div>
        ) : (
          <Tabs defaultValue="images" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="builds">Build History</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{imagesData?.totalImages}</div>
                  <div className="text-sm text-gray-600">Total Images</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{imagesData?.totalSize}</div>
                  <div className="text-sm text-gray-600">Total Size</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{imagesData?.registryStats.totalPulls}</div>
                  <div className="text-sm text-gray-600">Total Pulls</div>
                </div>
              </div>

              <div className="space-y-3">
                {imagesData?.images.map((image: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Container className="w-4 h-4" />
                        <span className="font-medium">{image.name}</span>
                        <Badge variant="outline">{image.tag}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Download className="w-3 h-3" />
                        <span>{image.pulls} pulls</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">
                          Size: <span className="font-medium">{image.size}</span>
                        </div>
                        <div className="text-gray-600">
                          Layers: <span className="font-medium">{image.layers}</span>
                        </div>
                        <div className="text-gray-600">
                          Created: <span className="font-medium">{image.created}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600">
                          Last Pull: <span className="font-medium">{image.lastPull}</span>
                        </div>
                        <div className="text-gray-600">
                          Digest: <code className="text-xs">{image.digest}</code>
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-600 mb-1">Vulnerabilities:</div>
                        <div className="flex gap-2 text-xs">
                          <span className={getVulnerabilityColor("critical")}>C: {image.vulnerabilities.critical}</span>
                          <span className={getVulnerabilityColor("high")}>H: {image.vulnerabilities.high}</span>
                          <span className={getVulnerabilityColor("medium")}>M: {image.vulnerabilities.medium}</span>
                          <span className={getVulnerabilityColor("low")}>L: {image.vulnerabilities.low}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <span>Scan Duration:</span>
                      <span className="font-medium">{imagesData?.securityScan.scanDuration}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Vulnerabilities:</span>
                      <span className="font-medium">{imagesData?.securityScan.totalVulnerabilities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fixable:</span>
                      <span className="font-medium text-green-600">
                        {imagesData?.securityScan.fixableVulnerabilities}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {imagesData?.images.reduce((sum: number, img: any) => sum + img.vulnerabilities.critical, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Critical</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {imagesData?.images.reduce((sum: number, img: any) => sum + img.vulnerabilities.high, 0)}
                  </div>
                  <div className="text-sm text-gray-600">High</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {imagesData?.images.reduce((sum: number, img: any) => sum + img.vulnerabilities.medium, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Medium</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {imagesData?.images.reduce((sum: number, img: any) => sum + img.vulnerabilities.low, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Low</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="builds" className="space-y-4">
              <div className="space-y-3">
                {imagesData?.buildHistory.map((build: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={build.status === "success" ? "default" : "destructive"}>{build.status}</Badge>
                      <div>
                        <div className="font-medium">{build.tag}</div>
                        <div className="text-sm text-gray-600">{build.triggeredBy}</div>
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
                ))}
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
                        <span>Unique Pullers:</span>
                        <span className="font-medium">{imagesData?.registryStats.uniquePullers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bandwidth:</span>
                        <span className="font-medium">{imagesData?.registryStats.bandwidth}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Build Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Avg Build Time:</span>
                      <span className="font-medium">2m 58s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium text-green-600">96.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache Hit Rate:</span>
                      <span className="font-medium text-blue-600">84.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Builds:</span>
                      <span className="font-medium">234</span>
                    </div>
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
