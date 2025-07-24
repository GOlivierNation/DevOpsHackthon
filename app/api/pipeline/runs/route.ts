import { NextResponse } from 'next/server'

interface PipelineRun {
  id: string
  number: number
  status: 'pending' | 'running' | 'success' | 'failure' | 'cancelled'
  branch: string
  commit: {
    sha: string
    message: string
    author: string
    timestamp: string
  }
  stages: {
    name: string
    status: 'pending' | 'running' | 'success' | 'failure' | 'skipped'
    duration?: number
    startTime?: string
    endTime?: string
    logs?: string[]
  }[]
  startTime: string
  endTime?: string
  duration?: number
  triggeredBy: string
  environment: string
}

// Mock pipeline runs data
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const branch = searchParams.get('branch')
    const environment = searchParams.get('environment')
    
    let runs = mockPipelineRuns
    
    // Apply filters
    if (status) {
      runs = runs.filter(run => run.status === status)
    }
    
    if (branch) {
      runs = runs.filter(run => run.branch === branch)
    }
    
    if (environment) {
      runs = runs.filter(run => run.environment === environment)
    }
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedRuns = runs.slice(startIndex, endIndex)
    
    // Calculate statistics
    const stats = {
      total: runs.length,
      success: runs.filter(r => r.status === 'success').length,
      failure: runs.filter(r => r.status === 'failure').length,
      running: runs.filter(r => r.status === 'running').length,
      pending: runs.filter(r => r.status === 'pending').length,
      cancelled: runs.filter(r => r.status === 'cancelled').length,
      successRate: runs.length > 0 ? Math.round((runs.filter(r => r.status === 'success').length / runs.length) * 100) : 0,
      averageDuration: runs.filter(r => r.duration).reduce((acc, r) => acc + (r.duration || 0), 0) / runs.filter(r => r.duration).length || 0
    }
    
    return NextResponse.json({
      runs: paginatedRuns,
      pagination: {
        page,
        limit,
        total: runs.length,
        totalPages: Math.ceil(runs.length / limit),
        hasNext: endIndex < runs.length,
        hasPrev: page > 1
      },
      stats,
      filters: {
        statuses: ['pending', 'running', 'success', 'failure', 'cancelled'],
        branches: ['main', 'develop', 'feature/auth', 'feature/monitoring', 'hotfix/security'],
        environments: ['production', 'staging', 'development']
      }
    }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error('Error fetching pipeline runs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pipeline runs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { branch = 'main', environment = 'production', triggeredBy = 'Manual' } = body
    
    // Simulate creating a new pipeline run
    const newRun: PipelineRun = {
      id: `run-${Date.now()}`,
      number: 1001,
      status: 'pending',
      branch,
      commit: {
        sha: Math.random().toString(36).substring(2, 9),
        message: 'Manual pipeline trigger',
        author: triggeredBy,
        timestamp: new Date().toISOString()
      },
      stages: [
        { name: 'Checkout', status: 'pending' },
        { name: 'Install Dependencies', status: 'pending' },
        { name: 'Run Tests', status: 'pending' },
        { name: 'Build', status: 'pending' },
        { name: 'Deploy', status: 'pending' }
      ],
      startTime: new Date().toISOString(),
      triggeredBy,
      environment
    }
    
    return NextResponse.json({
      message: 'Pipeline run created successfully',
      run: newRun
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating pipeline run:', error)
    return NextResponse.json(
      { error: 'Failed to create pipeline run' },
      { status: 500 }
    )
  }
}
