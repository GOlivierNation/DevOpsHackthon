"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { GitBranch, GitCommit, Users, Code, ExternalLink, RefreshCw } from "lucide-react"

interface RepositoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RepositoryModal({ open, onOpenChange }: RepositoryModalProps) {
  const [repositoryData, setRepositoryData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchRepositoryData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/repository")
      if (response.ok) {
        const data = await response.json()
        setRepositoryData(data)
      }
    } catch (error) {
      console.error("Failed to fetch repository data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchRepositoryData()
    }
  }, [open])

  if (!repositoryData && !loading) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                {repositoryData?.name || "Repository"}
              </DialogTitle>
              <DialogDescription>Git repository information and recent activity</DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchRepositoryData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={repositoryData?.url || "https://github.com/GOlivierNation/DevOpsHackthon"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open GitHub
                </a>
              </Button>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            Loading repository data...
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="branches">Branches</TabsTrigger>
              <TabsTrigger value="commits">Commits</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Repository Stats</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Commits:</span>
                        <span className="font-medium">{repositoryData?.stats.commits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Branches:</span>
                        <span className="font-medium">{repositoryData?.stats.branches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contributors:</span>
                        <span className="font-medium">{repositoryData?.stats.contributors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Issues:</span>
                        <span className="font-medium">{repositoryData?.stats.issues}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Last Commit</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <GitCommit className="w-4 h-4" />
                        <code className="text-sm">{repositoryData?.lastCommit.hash}</code>
                      </div>
                      <p className="text-sm">{repositoryData?.lastCommit.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <Users className="w-3 h-3" />
                        <span>{repositoryData?.lastCommit.author}</span>
                        <span>•</span>
                        <span>{repositoryData?.lastCommit.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Languages</h4>
                  <div className="space-y-2">
                    {repositoryData?.languages &&
                      Object.entries(repositoryData.languages).map(([lang, percentage]: [string, any]) => (
                        <div key={lang}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{lang}</span>
                            <span>{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branches" className="space-y-4">
              <div className="space-y-2">
                {repositoryData?.branches.map((branch: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      <span className="font-medium">{branch.name}</span>
                      <Badge variant={branch.status === "active" ? "default" : "secondary"}>{branch.status}</Badge>
                    </div>
                    <span className="text-sm text-gray-600">{branch.lastCommit}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commits" className="space-y-4">
              <div className="space-y-3">
                {repositoryData?.recentCommits.map((commit: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <GitCommit className="w-4 h-4" />
                      <code className="text-sm">{commit.hash}</code>
                      <Badge variant="outline">{commit.branch}</Badge>
                    </div>
                    <p className="text-sm mb-2">{commit.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{commit.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Code Activity
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total commits:</span>
                      <span className="font-medium">{repositoryData?.stats.commits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This week:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This month:</span>
                      <span className="font-medium">89</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Collaboration
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Contributors:</span>
                      <span className="font-medium">{repositoryData?.stats.contributors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pull requests:</span>
                      <span className="font-medium">{repositoryData?.stats.pullRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Open issues:</span>
                      <span className="font-medium">{repositoryData?.stats.issues}</span>
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
