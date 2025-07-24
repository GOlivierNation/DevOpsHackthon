import { NextResponse } from "next/server"

export async function GET() {
  try {
    const imagesData = {
      registry: {
        name: "GitHub Container Registry",
        url: "https://ghcr.io",
        namespace: "goliviernation",
        isPrivate: false,
      },
      images: [
        {
          name: "devops-pipeline-app",
          repository: "ghcr.io/goliviernation/devops-pipeline-app",
          tags: [
            {
              name: "latest",
              digest: "sha256:abc123...",
              size: "245 MB",
              created: "2 hours ago",
              lastPulled: "5 min ago",
              vulnerabilities: {
                critical: 0,
                high: 1,
                medium: 3,
                low: 8,
              },
            },
            {
              name: "v1.2.3",
              digest: "sha256:def456...",
              size: "243 MB",
              created: "1 day ago",
              lastPulled: "2 hours ago",
              vulnerabilities: {
                critical: 0,
                high: 2,
                medium: 5,
                low: 12,
              },
            },
            {
              name: "v1.2.2",
              digest: "sha256:ghi789...",
              size: "241 MB",
              created: "3 days ago",
              lastPulled: "1 day ago",
              vulnerabilities: {
                critical: 1,
                high: 3,
                medium: 7,
                low: 15,
              },
            },
          ],
          totalSize: "729 MB",
          pullCount: 1247,
          lastUpdated: "2 hours ago",
        },
        {
          name: "devops-pipeline-worker",
          repository: "ghcr.io/goliviernation/devops-pipeline-worker",
          tags: [
            {
              name: "latest",
              digest: "sha256:jkl012...",
              size: "156 MB",
              created: "4 hours ago",
              lastPulled: "10 min ago",
              vulnerabilities: {
                critical: 0,
                high: 0,
                medium: 2,
                low: 5,
              },
            },
            {
              name: "v1.1.0",
              digest: "sha256:mno345...",
              size: "154 MB",
              created: "2 days ago",
              lastPulled: "4 hours ago",
              vulnerabilities: {
                critical: 0,
                high: 1,
                medium: 4,
                low: 8,
              },
            },
          ],
          totalSize: "310 MB",
          pullCount: 892,
          lastUpdated: "4 hours ago",
        },
      ],
      stats: {
        totalImages: 2,
        totalTags: 5,
        totalSize: "1.04 GB",
        totalPulls: 2139,
        lastActivity: "5 min ago",
      },
      recentActivity: [
        {
          action: "push",
          image: "devops-pipeline-app:latest",
          user: "github-actions",
          timestamp: "2 hours ago",
        },
        {
          action: "pull",
          image: "devops-pipeline-app:latest",
          user: "production-cluster",
          timestamp: "5 min ago",
        },
        {
          action: "push",
          image: "devops-pipeline-worker:latest",
          user: "github-actions",
          timestamp: "4 hours ago",
        },
        {
          action: "pull",
          image: "devops-pipeline-worker:v1.1.0",
          user: "staging-cluster",
          timestamp: "4 hours ago",
        },
      ],
    }

    return NextResponse.json(imagesData, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images data" }, { status: 500 })
  }
}
