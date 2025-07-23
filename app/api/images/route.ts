import { NextResponse } from "next/server"

export async function GET() {
  try {
    const imagesInfo = {
      registry: "ghcr.io/GOlivierNation",
      registryUrl: "https://github.com/GOlivierNation/DevOpsHackthon/pkgs/container/devops-pipeline-app",
      totalImages: 45,
      totalSize: "2.1 GB",
      images: [
        {
          name: "devops-pipeline-app",
          tag: "latest",
          size: "45.2 MB",
          created: "2 min ago",
          digest: "sha256:abc123...",
          layers: 8,
          vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 3,
            low: 7,
          },
          pulls: 156,
          lastPull: "1 min ago",
        },
        {
          name: "devops-pipeline-app",
          tag: "v1.2.3",
          size: "45.2 MB",
          created: "1 hour ago",
          digest: "sha256:def456...",
          layers: 8,
          vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 3,
            low: 7,
          },
          pulls: 89,
          lastPull: "30 min ago",
        },
        {
          name: "devops-pipeline-app",
          tag: "staging",
          size: "47.1 MB",
          created: "3 hours ago",
          digest: "sha256:ghi789...",
          layers: 9,
          vulnerabilities: {
            critical: 0,
            high: 2,
            medium: 4,
            low: 8,
          },
          pulls: 34,
          lastPull: "2 hours ago",
        },
        {
          name: "devops-pipeline-app",
          tag: "v1.2.2",
          size: "44.8 MB",
          created: "1 day ago",
          digest: "sha256:jkl012...",
          layers: 8,
          vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 2,
            low: 5,
          },
          pulls: 203,
          lastPull: "4 hours ago",
        },
      ],
      buildHistory: [
        {
          tag: "latest",
          buildTime: "2m 45s",
          status: "success",
          timestamp: "2 min ago",
          triggeredBy: "GitHub Actions",
        },
        {
          tag: "v1.2.3",
          buildTime: "3m 12s",
          status: "success",
          timestamp: "1 hour ago",
          triggeredBy: "Release",
        },
        {
          tag: "staging",
          buildTime: "2m 58s",
          status: "success",
          timestamp: "3 hours ago",
          triggeredBy: "Push to develop",
        },
      ],
      registryStats: {
        totalPulls: 1247,
        uniquePullers: 23,
        bandwidth: "15.2 GB",
        storageUsed: "2.1 GB",
        storageLimit: "10 GB",
      },
      securityScan: {
        lastScan: "2 min ago",
        scanner: "Trivy",
        totalVulnerabilities: 11,
        fixableVulnerabilities: 8,
        scanDuration: "45s",
      },
    }

    return NextResponse.json(imagesInfo, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images info" }, { status: 500 })
  }
}
