import { NextResponse } from "next/server"

const mockPipelineRuns = [
  {
    id: "#1234",
    status: "success",
    branch: "main",
    time: "2 min ago",
    duration: "3m 45s",
    commit: "abc123f",
    author: "john.doe",
    message: "Fix authentication bug",
  },
  {
    id: "#1233",
    status: "running",
    branch: "feature/auth",
    time: "5 min ago",
    duration: "2m 30s",
    commit: "def456a",
    author: "jane.smith",
    message: "Add OAuth integration",
  },
  {
    id: "#1232",
    status: "failed",
    branch: "feature/ui",
    time: "1 hour ago",
    duration: "1m 15s",
    commit: "ghi789b",
    author: "bob.wilson",
    message: "Update dashboard components",
  },
  {
    id: "#1231",
    status: "success",
    branch: "main",
    time: "4 hours ago",
    duration: "3m 55s",
    commit: "jkl012c",
    author: "alice.brown",
    message: "Performance improvements",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockPipelineRuns, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pipeline runs" }, { status: 500 })
  }
}
