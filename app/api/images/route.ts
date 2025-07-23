import { NextResponse } from "next/server"

export async function GET() {
  try {
    const imagesInfo = {
      registry: "ghcr.io/goliviernation",
      registryUrl: "https://github.com/GOlivierNation/DevOpsHackthon/pkgs/container/devops-hackathon-pipeline",
      repositoryName: "DevOpsHackthon",
      packageName: "devops-hackathon-pipeline",
      totalImages: 12,
      totalSize: "542.8 MB",
      visibility: "public",
      description: "Complete DevOps CI/CD pipeline demonstration with Next.js, Docker, Kubernetes, and monitoring",
      images: [
        {
          name: "devops-hackathon-pipeline",
          tag: "latest",
          size: "45.2 MB",
          created: "2 minutes ago",
          digest: "sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
          layers: 8,
          architecture: "linux/amd64",
          os: "linux",
          vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 3,
            low: 7,
          },
          pulls: 156,
          lastPull: "1 minute ago",
          pushedBy: "github-actions[bot]",
          buildInfo: {
            workflow: "CI/CD Pipeline",
            commit: "abc123f",
            branch: "main",
            buildTime: "2m 45s",
          },
        },
        {
          name: "devops-hackathon-pipeline",
          tag: "v1.2.3",
          size: "45.2 MB",
          created: "1 hour ago",
          digest: "sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a",
          layers: 8,
          architecture: "linux/amd64",
          os: "linux",
          vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 3,
            low: 7,
          },
          pulls: 89,
          lastPull: "30 minutes ago",
          pushedBy: "github-actions[bot]",
          buildInfo: {
            workflow: "Release",
            commit: "def456a",
            branch: "main",
            buildTime: "3m 12s",
          },
        },
        {
          name: "devops-hackathon-pipeline",
          tag: "staging",
          size: "47.1 MB",
          created: "3 hours ago",
          digest: "sha256:c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2",
          layers: 9,
          architecture: "linux/amd64",
          os: "linux",
          vulnerabilities: {
            critical: 0,
            high: 2,
            medium: 4,
            low: 8,
          },
          pulls: 34,
          lastPull: "2 hours ago",
          pushedBy: "github-actions[bot]",
          buildInfo: {
            workflow: "Staging Deploy",
            commit: "ghi789b",
            branch: "develop",
            buildTime: "2m 58s",
          },
        },
        {
          name: "devops-hackathon-pipeline",
          tag: "v1.2.2",
          size: "44.8 MB",
          created: "1 day ago",
          digest: "sha256:d4e5f6789012345678901234567890abcdef1234567890abcdef1234567abc3",
          layers: 8,
          architecture: "linux/amd64",
          os: "linux",
          vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 2,
            low: 5,
          },
          pulls: 203,
          lastPull: "4 hours ago",
          pushedBy: "github-actions[bot]",
          buildInfo: {
            workflow: "Release",
            commit: "jkl012c",
            branch: "main",
            buildTime: "2m 55s",
          },
        },
        {
          name: "devops-hackathon-pipeline",
          tag: "v1.2.1",
          size: "44.5 MB",
          created: "3 days ago",
          digest: "sha256:e5f6789012345678901234567890abcdef1234567890abcdef1234567abcd4",
          layers: 8,
          architecture: "linux/amd64",
          os: "linux",
          vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 1,
            low: 4,
          },
          pulls: 145,
          lastPull: "1 day ago",
          pushedBy: "github-actions[bot]",
          buildInfo: {
            workflow: "Release",
            commit: "mno345d",
            branch: "main",
            buildTime: "3m 05s",
          },
        },
        {
          name: "devops-hackathon-pipeline",
          tag: "feature-monitoring",
          size: "46.8 MB",
          created: "5 days ago",
          digest: "sha256:f6789012345678901234567890abcdef1234567890abcdef1234567abcde5",
          layers: 9,
          architecture: "linux/amd64",
          os: "linux",
          vulnerabilities: {
            critical: 0,
            high: 1,
            medium: 5,
            low: 9,
          },
          pulls: 67,
          lastPull: "3 days ago",
          pushedBy: "github-actions[bot]",
          buildInfo: {
            workflow: "Feature Branch",
            commit: "pqr678e",
            branch: "feature/monitoring",
            buildTime: "3m 18s",
          },
        },
      ],
      buildHistory: [
        {
          tag: "latest",
          buildTime: "2m 45s",
          status: "success",
          timestamp: "2 minutes ago",
          triggeredBy: "Push to main",
          workflow: "CI/CD Pipeline",
          commit: "abc123f",
          author: "john.doe",
        },
        {
          tag: "v1.2.3",
          buildTime: "3m 12s",
          status: "success",
          timestamp: "1 hour ago",
          triggeredBy: "Release v1.2.3",
          workflow: "Release",
          commit: "def456a",
          author: "jane.smith",
        },
        {
          tag: "staging",
          buildTime: "2m 58s",
          status: "success",
          timestamp: "3 hours ago",
          triggeredBy: "Push to develop",
          workflow: "Staging Deploy",
          commit: "ghi789b",
          author: "bob.wilson",
        },
        {
          tag: "v1.2.2",
          buildTime: "2m 55s",
          status: "success",
          timestamp: "1 day ago",
          triggeredBy: "Release v1.2.2",
          workflow: "Release",
          commit: "jkl012c",
          author: "alice.brown",
        },
        {
          tag: "feature-auth",
          buildTime: "4m 23s",
          status: "failed",
          timestamp: "2 days ago",
          triggeredBy: "Push to feature/auth",
          workflow: "Feature Branch",
          commit: "stu901f",
          author: "mike.johnson",
          error: "Test failures in authentication module",
        },
      ],
      registryStats: {
        totalPulls: 1247,
        uniquePullers: 23,
        bandwidth: "15.2 GB",
        storageUsed: "542.8 MB",
        storageLimit: "10 GB",
        weeklyPulls: 89,
        monthlyPulls: 456,
        topPullers: [
          { name: "production-cluster", pulls: 234 },
          { name: "staging-cluster", pulls: 156 },
          { name: "dev-environment", pulls: 89 },
          { name: "ci-runner-1", pulls: 67 },
          { name: "local-dev", pulls: 45 },
        ],
      },
      securityScan: {
        lastScan: "2 minutes ago",
        scanner: "Trivy v0.45.0",
        totalVulnerabilities: 11,
        fixableVulnerabilities: 8,
        scanDuration: "45s",
        scanResults: [
          {
            severity: "HIGH",
            package: "openssl",
            version: "1.1.1f",
            fixedVersion: "1.1.1g",
            description: "Buffer overflow in SSL certificate parsing",
          },
          {
            severity: "MEDIUM",
            package: "curl",
            version: "7.68.0",
            fixedVersion: "7.74.0",
            description: "Information disclosure vulnerability",
          },
          {
            severity: "MEDIUM",
            package: "libxml2",
            version: "2.9.10",
            fixedVersion: "2.9.12",
            description: "XML external entity injection",
          },
        ],
      },
      dockerfileInfo: {
        baseImage: "node:18-alpine",
        stages: ["dependencies", "build", "production"],
        totalLayers: 8,
        optimizations: [
          "Multi-stage build",
          "Non-root user",
          "Minimal base image",
          "Layer caching",
          "Production dependencies only",
        ],
        healthCheck: "/api/health",
        exposedPorts: [3000],
        environmentVars: ["NODE_ENV", "PORT"],
        workdir: "/app",
      },
      usageInstructions: {
        pullCommand: "docker pull ghcr.io/goliviernation/devops-hackathon-pipeline:latest",
        runCommand: "docker run -p 3000:3000 ghcr.io/goliviernation/devops-hackathon-pipeline:latest",
        kubernetesExample: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devops-app
  template:
    metadata:
      labels:
        app: devops-app
    spec:
      containers:
      - name: app
        image: ghcr.io/goliviernation/devops-hackathon-pipeline:latest
        ports:
        - containerPort: 3000`,
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
