"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ExternalLink, RefreshCw, Shield, Download, Clock } from 'lucide-react'

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

  const openRegistry = () => {
    if (imagesData?.registry?.url) {
      window.open(`${imagesData.registry.url}/${imagesData.registry.namespace}`, "_blank")
    }
  }

  const getVulnerabilityColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  useEffect(() => {
    if (open) {
      fetchImagesData()
    }
  }, [open])

  if (!imagesData && !loading) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Container Images
              </DialogTitle>
              <DialogDescription>
                {imagesData?.registry?.name} - {imagesData?.stats?.totalImages} images, {imagesData?.stats?.totalTags} tags
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
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            Loading images data...
          </div>
        ) : (
          <Tabs defaultValue="images" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="space-y-4">
              {imagesData?.images?.map((image: any, imageIndex: number) => (
                <div key={imageIndex} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{image.name}</h3>
                      <p className="text-sm text-gray-600">{image.repository}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>Total Size: {image.totalSize}</div>
                      <div>Pulls: {image.pullCount.toLocaleString()}</div>
                      <div>Updated: {image.lastUpdated}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {image.tags?.map((tag: any, tagIndex: number) => (
                      <div key={tagIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{tag.name}</div>
                            <div className="text-xs text-gray-600">{tag.digest.substring(0, 20)}...</div>
                          </div>
                          <div className="text-sm">
                            <div>{tag.size}</div>
                            <div className="text-gray-600">Created {tag.created}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <div className="text-xs">
                              {tag.vulnerabilities.critical > 0 && (
                                <span className={getVulnerabilityColor('critical')}>
                                  {tag.vulnerabilities.critical}C
                                </span>
                              )}
                              {tag.vulnerabilities.high > 0 && (
                                <span className={`${getVulnerabilityColor('high')} ml-1`}>
                                  {tag.vulnerabilities.high}H
                                </span>
                              )}
                              {tag.vulnerabilities.medium > 0 && (
                                <span className={`${getVulnerabilityColor('medium')} ml-1`}>
                                  {tag.vulnerabilities.medium}M
                                </span>
                              )}
                              {tag.vulnerabilities.low > 0 && (
                                <span className={`${getVulnerabilityColor('low')} ml-1`}>
                                  {tag.vulnerabilities.low}L
                                </span>
                              )}
                              {Object.values(tag.vulnerabilities).every(v => v === 0) && (
                                <span className="text-green-600">Clean</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Download className="w-3 h-3" />
                            <span>Last pulled {tag.lastPulled}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-3">
                {imagesData?.recentActivity?.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.action === 'push' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <div className="font-medium">
                          {activity.action === 'push' ? 'Pushed' : 'Pulled'} {activity.image}
                        </div>
                        <div className="text-sm text-gray-600">by {activity.user}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{imagesData?.stats?.totalImages}</div>
                  <div className="text-sm text-gray-600">Total Images</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{imagesData?.stats?.totalTags}</div>
                  <div className="text-sm text-gray-600">Total Tags</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{imagesData?.stats?.totalSize}</div>
                  <div className="text-sm text-gray-600">Total Size</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{imagesData?.stats?.totalPulls?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Pulls</div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Registry Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Registry:</span>
                      <span className="font-medium">{imagesData?.registry?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>URL:</span>
                      <code className="text-xs">{imagesData?.registry?.url}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Namespace:</span>
                      <code className="text-xs">{imagesData?.registry?.namespace}</code>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Visibility:</span>
                      <Badge variant={imagesData?.registry?.isPrivate ? "destructive" : "default"}>
                        {imagesData?.registry?.isPrivate ? "Private" : "Public"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Activity:</span>
                      <span className="font-medium">{imagesData?.stats?.lastActivity}</span>
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
