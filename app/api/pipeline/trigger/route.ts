import { NextResponse } from 'next/server'

interface TriggerRequest {
  branch?: string
  environment?: string
  triggeredBy?: string
  parameters?: Record<string, any>
}

interface TriggerResponse {
  success: boolean
  message: string
  runId: string
  runNumber: number
  estimatedDuration: number
  queuePosition?: number
}

export async function POST(request: Request) {
  try {
    const body: TriggerRequest = await request.json()
    const {
      branch = 'main',
      environment = 'production',
      triggeredBy = 'API',
      parameters = {}
    } = body
    
    // Validate branch
    const allowedBranches = ['main', 'develop', 'staging', 'feature/*', 'hotfix/*']
    const isValidBranch = allowedBranches.some(pattern => {
      if (pattern.endsWith('*')) {
        return branch.startsWith(pattern.slice(0, -1))
      }
      return branch === pattern
    })
    
    if (!isValidBranch) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid branch',
          message: `Branch '${branch}' is not allowed. Allowed branches: ${allowedBranches.join(', ')}`,
          allowedBranches
        },
        { status: 400 }
      )
    }
    
    // Validate environment
    const allowedEnvironments = ['development', 'staging', 'production']
    if (!allowedEnvironments.includes(environment)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid environment',
          message: `Environment '${environment}' is not allowed. Allowed environments: ${allowedEnvironments.join(', ')}`,
          allowedEnvironments
        },
        { status: 400 }
      )
    }
    
    // Check if production deployment is allowed
    if (environment === 'production' && branch !== 'main') {
      return NextResponse.json(
        {
          success: false,
          error: 'Production deployment restricted',
          message: 'Production deployments are only allowed from the main branch',
          currentBranch: branch,
          requiredBranch: 'main'
        },
        { status: 403 }
      )
    }
    
    // Simulate pipeline queue check
    const queueLength = Math.floor(Math.random() * 3)
    const estimatedDuration = 300 + Math.floor(Math.random() * 300) // 5-10 minutes
    
    // Generate unique run ID and number
    const runId = `run-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const runNumber = 1000 + Math.floor(Math.random() * 1000)
    
    // Simulate different response scenarios
    const scenarios = ['success', 'queued', 'rate_limited']
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    
    switch (scenario) {
      case 'success':
        return NextResponse.json({
          success: true,
          message: 'Pipeline triggered successfully',
          runId,
          runNumber,
          branch,
          environment,
          triggeredBy,
          estimatedDuration,
          status: 'pending',
          stages: [
            'Checkout',
            'Install Dependencies',
            'Run Tests',
            'Build',
            'Deploy'
          ],
          startTime: new Date().toISOString(),
          parameters,
          links: {
            run: `/api/pipeline/runs/${runId}`,
            logs: `/api/pipeline/runs/${runId}/logs`,
            cancel: `/api/pipeline/runs/${runId}/cancel`
          }
        })
      
      case 'queued':
        return NextResponse.json({
          success: true,
          message: 'Pipeline queued successfully',
          runId,
          runNumber,
          branch,
          environment,
          triggeredBy,
          estimatedDuration: estimatedDuration + (queueLength * 60),
          status: 'queued',
          queuePosition: queueLength + 1,
          estimatedStartTime: new Date(Date.now() + (queueLength * 60000)).toISOString(),
          parameters,
          links: {
            run: `/api/pipeline/runs/${runId}`,
            cancel: `/api/pipeline/runs/${runId}/cancel`
          }
        })
      
      case 'rate_limited':
        return NextResponse.json({
          success: false,
          error: 'Rate limit exceeded',
          message: 'Too many pipeline triggers. Please wait before triggering again.',
          retryAfter: 300,
          retryAfterFormatted: '5 minutes',
          currentRate: '10 triggers per hour',
          resetTime: new Date(Date.now() + 300000).toISOString()
        }, { status: 429 })
      
      default:
        // Simulate pipeline trigger
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newRun = {
          id: `#${Math.floor(Math.random() * 9000) + 1000}`,
          status: "running",
          branch: branch,
          time: "just now",
          duration: "0s",
          commit: Math.random().toString(36).substring(2, 9),
          author: triggeredBy,
          message: "Manual trigger",
        }

        return NextResponse.json(newRun, { status: 201 })
    }
  } catch (error) {
    console.error('Error triggering pipeline:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to trigger pipeline due to server error',
      timestamp: new Date().toISOString(),
      requestId: Math.random().toString(36).substring(2, 9)
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Return pipeline trigger configuration and status
    return NextResponse.json({
      available: true,
      allowedBranches: ['main', 'develop', 'staging', 'feature/*', 'hotfix/*'],
      allowedEnvironments: ['development', 'staging', 'production'],
      restrictions: {
        production: {
          allowedBranches: ['main'],
          requiresApproval: true,
          maxConcurrentRuns: 1
        },
        staging: {
          allowedBranches: ['main', 'develop', 'feature/*'],
          requiresApproval: false,
          maxConcurrentRuns: 2
        },
        development: {
          allowedBranches: ['*'],
          requiresApproval: false,
          maxConcurrentRuns: 5
        }
      },
      rateLimits: {
        perUser: '10 per hour',
        perBranch: '20 per hour',
        global: '100 per hour'
      },
      estimatedDurations: {
        development: '3-5 minutes',
        staging: '5-8 minutes',
        production: '8-12 minutes'
      },
      currentQueue: {
        length: Math.floor(Math.random() * 3),
        estimatedWaitTime: Math.floor(Math.random() * 180) + 30 // 30-210 seconds
      },
      lastTrigger: {
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        branch: 'main',
        environment: 'production',
        triggeredBy: 'Olivier',
        status: 'success'
      }
    })
  } catch (error) {
    console.error('Error getting pipeline trigger info:', error)
    return NextResponse.json(
      { error: 'Failed to get pipeline trigger information' },
      { status: 500 }
    )
  }
}
