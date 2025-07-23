"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Activity, ExternalLink, RefreshCw, TrendingUp } from "lucide-react"

interface GrafanaDashboardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GrafanaDashboardModal({ open, onOpenChange }: GrafanaDashboardModalProps) {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/grafana/dashboards")
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchDashboardData()
    }
  }, [open])

  if (!dashboardData && !loading) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Grafana Dashboards
              </DialogTitle>
              <DialogDescription>Visualization with Grafana dashboards</DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchDashboardData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Open Grafana
              </Button>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            Loading dashboard data...
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
              <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData?.summary.totalDashboards}</div>
                  <div className="text-sm text-gray-600">Total Dashboards</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{dashboardData?.summary.activeDashboards}</div>
                  <div className="text-sm text-gray-600">Active Dashboards</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{dashboardData?.summary.totalPanels}</div>
                  <div className="text-sm text-gray-600">Total Panels</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{dashboardData?.summary.refreshInterval}</div>
                  <div className="text-sm text-gray-600">Refresh Rate</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Dashboard Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div>✅ Real-time metrics visualization</div>
                    <div>✅ Custom dashboard creation</div>
                    <div>✅ Alert management system</div>
                    <div>✅ Historical data analysis</div>
                  </div>
                  <div className="space-y-1">
                    <div>✅ Multi-datasource support</div>
                    <div>✅ Interactive panels</div>
                    <div>✅ Automated reporting</div>
                    <div>✅ Team collaboration</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dashboards" className="space-y-4">
              <div className="space-y-4">
                {dashboardData?.dashboards.map((dashboard: any) => (
                  <div key={dashboard.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold">{dashboard.title}</h4>
                        <Badge variant={dashboard.status === "active" ? "default" : "secondary"}>
                          {dashboard.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{dashboard.lastUpdated}</div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{dashboard.description}</p>

                    <div className="mb-3">
                      <div className="text-sm font-medium mb-2">Panels:</div>
                      <div className="flex flex-wrap gap-2">
                        {dashboard.panels.map((panel: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {panel}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Open Dashboard
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Pipeline Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        98.5%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Build Time:</span>
                      <Badge variant="outline">2m 45s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Deployments Today:</span>
                      <Badge variant="outline">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Error Rate:</span>
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        0.02%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Time:</span>
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        156ms
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Throughput:</span>
                      <Badge variant="outline">1,247 req/min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Usage:</span>
                      <Badge variant="outline">45%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage:</span>
                      <Badge variant="outline">62%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Live Data Stream</h4>
                <div className="text-sm text-gray-600">
                  📊 Real-time metrics are being collected and visualized in Grafana dashboards
                  <br />🔄 Data refresh interval: 5 seconds
                  <br />📈 Historical data retention: 30 days
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
