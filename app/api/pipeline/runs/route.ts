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
const generateMockRuns = (): PipelineRun[] => {
  const statuses: PipelineRun['status'][] = ['success', 'failure', 'running', 'pending']
  const branches = ['main', 'develop', 'feature/auth', 'feature/monitoring', 'hotfix/security']
  const authors = ['Olivier', 'DevOps Bot', 'CI System', 'Developer']
  const environments = ['production', 'staging', 'development']

  const runs: PipelineRun[] = []

  for (let i = 1; i <= 20; i++) {
    const status = i === 1 ? 'running' : statuses[Math.floor(Math.random() * statuses.length)]
    const branch = branches[Math.floor(Math.random() * branches.length)]
    const author = authors[Math.floor(Math.random() * authors.length)]
    const environment = environments[Math.floor(Math.random() * environments.length)]
    
    const startTime = new Date(Date.now() - (i * 3600000) - Math.random() * 3600000).toISOString()
    const duration = status === 'running' ? undefined : Math.floor(Math.random() * 600) + 60
    const endTime = duration ? new Date(new Date(startTime).getTime() + duration * 1000).toISOString() : undefined
    
    const stages = [
      {
        name: 'Checkout',
        status: status === 'pending' ? 'pending' : 'success' as const,
        duration: status === 'pending' ? undefined : 15,
        startTime: status === 'pending' ? undefined : startTime,
        endTime: status === 'pending' ? undefined : new Date(new Date(startTime).getTime() + 15000).toISOString(),
        logs: status === 'pending' ? undefined : [
          'Checking out repository...',
          'Repository checked out successfully',
          'Setting up workspace...'
        ]
      },
      {
        name: 'Install Dependencies',
        status: status === 'pending' ? 'pending' : (status === 'running' && i === 1 ? 'running' : 'success') as const,
        duration: status === 'pending' ? undefined : (status === 'running' && i === 1 ? undefined : 45),
        startTime: status === 'pending' ? undefined : new Date(new Date(startTime).getTime() + 15000).toISOString(),
        endTime: status === 'pending' || (status === 'running' && i === 1) ? undefined : new Date(new Date(startTime).getTime() + 60000).toISOString(),
        logs: status === 'pending' ? undefined : [
          'Installing npm dependencies...',
          'npm install completed',
          'Dependencies cached successfully'
        ]
      },
      {
        name: 'Run Tests',
        status: status === 'pending' || (status === 'running' && i === 1) ? 'pending' : (status === 'failure' ? 'failure' : 'success') as const,
        duration: status === 'pending' || (status === 'running' && i === 1) ? undefined : (status === 'failure' ? 30 : 90),
        startTime: status === 'pending' || (status === 'running' && i === 1) ? undefined : new Date(new Date(startTime).getTime() + 60000).toISOString(),
        endTime: status === 'pending' || (status === 'running' && i === 1) ? undefined : new Date(new Date(startTime).getTime() + 150000).toISOString(),
        logs: status === 'pending' || (status === 'running' && i === 1) ? undefined : 
          status === 'failure' ? [
            'Running test suite...',
            'Test failed: Authentication test',
            'Error: Expected 200 but got 401'
          ] : [
            'Running test suite...',
            'All tests passed successfully',
            'Coverage: 95.2%'
          ]
      },
      {
        name: 'Build',
        status: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? 'pending' : 'success' as const,
        duration: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : 120,
        startTime: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : new Date(new Date(startTime).getTime() + 150000).toISOString(),
        endTime: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : new Date(new Date(startTime).getTime() + 270000).toISOString(),
        logs: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : [
          'Building application...',
          'Docker image built successfully',
          'Image pushed to registry'
        ]
      },
      {
        name: 'Deploy',
        status: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? 'pending' : 'success' as const,
        duration: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : 60,
        startTime: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : new Date(new Date(startTime).getTime() + 270000).toISOString(),
        endTime: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : new Date(new Date(startTime).getTime() + 330000).toISOString(),
        logs: status === 'pending' || (status === 'running' && i === 1) || status === 'failure' ? undefined : [
          'Deploying to ' + environment + '...',
          'Deployment successful',
          'Health checks passed'
        ]
      }
    ]
    
    runs.push({
      id: `run-${i.toString().padStart(3, '0')}`,
      number: 1000 - i + 1,
      status,
      branch,
      commit: {
        sha: Math.random().toString(36).substring(2, 9),
        message: [
          'Add authentication middleware',
          'Fix memory leak in pipeline',
          'Update dependencies',
          'Improve error handling',
          'Add monitoring dashboard',
          'Fix security vulnerability',
          'Optimize database queries',
          'Add unit tests',
          'Update documentation',
          'Refactor API endpoints'
        ][Math.floor(Math.random() * 10)],
        author,
        timestamp: startTime
      },
      stages,
      startTime,
      endTime,
      duration,
      triggeredBy: author,
      environment
    })
  }

  return runs
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const branch = searchParams.get('branch')
    const environment = searchParams.get('environment')
    
    let runs = generateMockRuns()
    
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
