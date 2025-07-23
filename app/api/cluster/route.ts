import { NextResponse } from "next/server"

export async function GET() {
  try {
    const clusterInfo = {
      name: "production-cluster",
      provider: "AWS EKS",
      region: "us-west-2",
      version: "1.28",
      status: "active",
      nodes: {
        total: 3,
        ready: 3,
        capacity: {
          cpu: "12 cores",
          memory: "48 GB",
          storage: "300 GB",
        },
        utilization: {
          cpu: 45,
          memory: 62,
          storage: 28,
        },
      },
      namespaces: [
        { name: "production", pods: 6, services: 2, status: "active" },
        { name: "staging", pods: 2, services: 1, status: "active" },
        { name: "monitoring", pods: 4, services: 3, status: "active" },
        { name: "kube-system", pods: 12, services: 5, status: "active" },
      ],
      workloads: {
        deployments: 8,
        services: 11,
        ingresses: 3,
        configMaps: 15,
        secrets: 8,
      },
      networking: {
        clusterIP: "10.100.0.0/16",
        serviceIP: "10.100.0.1",
        dnsName: "cluster.local",
        loadBalancers: 2,
      },
      security: {
        rbacEnabled: true,
        networkPolicies: 5,
        podSecurityPolicies: 3,
        serviceAccounts: 12,
      },
      monitoring: {
        prometheus: "active",
        grafana: "active",
        alertManager: "active",
        uptime: "99.9%",
      },
      recentEvents: [
        {
          type: "Normal",
          reason: "Scheduled",
          message: "Successfully assigned production/app-production-xyz to node-1",
          timestamp: "2 min ago",
        },
        {
          type: "Normal",
          reason: "Pulled",
          message: "Container image pulled successfully",
          timestamp: "5 min ago",
        },
        {
          type: "Warning",
          reason: "FailedMount",
          message: "Unable to mount volumes for pod (resolved)",
          timestamp: "10 min ago",
        },
      ],
    }

    return NextResponse.json(clusterInfo, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cluster info" }, { status: 500 })
  }
}
