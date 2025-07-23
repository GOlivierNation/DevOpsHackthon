import { NextResponse } from "next/server"

export async function GET() {
  try {
    const repositoryInfo = {
      name: "devops-pipeline-app",
      url: "https://github.com/your-org/devops-pipeline-app",
      branch: "main",
      lastCommit: {
        hash: "abc123f",
        message: "Add monitoring dashboard",
        author: "DevOps Team",
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      stats: {
        commits: 156,
        branches: 8,
        contributors: 5,
        issues: 3,
        pullRequests: 12,
      },
      branches: [
        { name: "main", lastCommit: "2 min ago", status: "active" },
        { name: "develop", lastCommit: "1 hour ago", status: "active" },
        { name: "feature/auth", lastCommit: "3 hours ago", status: "active" },
        { name: "feature/monitoring", lastCommit: "1 day ago", status: "merged" },
        { name: "hotfix/security", lastCommit: "2 days ago", status: "merged" },
      ],
      recentCommits: [
        {
          hash: "abc123f",
          message: "Add monitoring dashboard",
          author: "john.doe",
          timestamp: "2 min ago",
          branch: "main",
        },
        {
          hash: "def456a",
          message: "Fix authentication bug",
          author: "jane.smith",
          timestamp: "1 hour ago",
          branch: "main",
        },
        {
          hash: "ghi789b",
          message: "Update CI/CD pipeline",
          author: "bob.wilson",
          timestamp: "4 hours ago",
          branch: "develop",
        },
      ],
      languages: {
        TypeScript: 65.2,
        JavaScript: 20.1,
        CSS: 8.7,
        HTML: 4.2,
        Shell: 1.8,
      },
    }

    return NextResponse.json(repositoryInfo, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch repository info" }, { status: 500 })
  }
}
