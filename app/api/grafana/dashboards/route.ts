import { NextResponse } from "next/server"

export async function GET() {
  try {
    const grafanaDashboards = {
      dashboards: [
        {
          id: 1,
          title: "DevOps Pipeline Overview",
          description: "Main dashboard showing pipeline health and performance",
          url: "/grafana/d/devops-overview",
          panels: ["Pipeline Success Rate", "Build Duration Trends", "Deployment Frequency", "Error Rate Monitoring"],
          status: "active",
          lastUpdated: "2 minutes ago",
        },
        {
          id: 2,
          title: "Application Performance",
          description: "Real-time application metrics and performance indicators",
          url: "/grafana/d/app-performance",
          panels: ["Request Rate", "Response Time P95", "Memory Usage", "CPU Utilization"],
          status: "active",
          lastUpdated: "1 minute ago",
        },
        {
          id: 3,
          title: "Infrastructure Monitoring",
          description: "Kubernetes cluster and infrastructure health",
          url: "/grafana/d/infrastructure",
          panels: ["Pod Status", "Node Resources", "Network Traffic", "Storage Usage"],
          status: "active",
          lastUpdated: "30 seconds ago",
        },
        {
          id: 4,
          title: "Security & Compliance",
          description: "Security metrics and compliance monitoring",
          url: "/grafana/d/security",
          panels: ["Vulnerability Scans", "Access Logs", "Failed Authentications", "Compliance Score"],
          status: "active",
          lastUpdated: "5 minutes ago",
        },
      ],
      summary: {
        totalDashboards: 4,
        activeDashboards: 4,
        totalPanels: 16,
        dataRetention: "30 days",
        refreshInterval: "5s",
      },
    }

    return NextResponse.json(grafanaDashboards, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Grafana dashboards" }, { status: 500 })
  }
}
