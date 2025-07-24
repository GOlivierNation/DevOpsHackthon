import { NextResponse } from 'next/server'
import os from 'os'

interface HealthCheck {
  status: 'healthy' | 'unhealthy'
  message?: string
  responseTime?: number
}

interface HealthStatus {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  uptime: number
  version: string
  environment: string
  checks: {
    database: HealthCheck
    redis: HealthCheck
    external_services: HealthCheck
    memory: { used: number, total: number, percentage: number }
    disk: { freeSpace: number }
    cpu: { load: number, cores: number }
  }
}

// Simulate database health check
async function checkDatabase(): Promise<HealthCheck> {
  try {
    const start = Date.now()
    // Simulate database connection check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 50))
    const responseTime = Date.now() - start
    
    return {
      status: 'healthy',
      message: 'Database connection successful',
      responseTime
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: 'Database connection failed'
    }
  }
}

// Simulate Redis health check
async function checkRedis(): Promise<HealthCheck> {
  try {
    const start = Date.now()
    // Simulate Redis ping
    await new Promise(resolve => setTimeout(resolve, Math.random() * 30))
    const responseTime = Date.now() - start
    
    return {
      status: 'healthy',
      message: 'Redis connection successful',
      responseTime
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: 'Redis connection failed'
    }
  }
}

// Check external services
async function checkExternalServices(): Promise<HealthCheck> {
  try {
    const start = Date.now()
    // Simulate external API check
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100))
    const responseTime = Date.now() - start
    
    return {
      status: 'healthy',
      message: 'External services accessible',
      responseTime
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: 'External services unavailable'
    }
  }
}

// Check memory usage
function checkMemory(): { used: number, total: number, percentage: number } {
  const memUsage = process.memoryUsage()
  const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024)
  const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024)
  const usage = (heapUsedMB / heapTotalMB) * 100
  
  return {
    used: heapUsedMB,
    total: heapTotalMB,
    percentage: Math.round(usage)
  }
}

// Check disk space (simulated)
function checkDisk(): { freeSpace: number } {
  // Simulate disk space check
  const freeSpace = Math.random() * 100
  
  return {
    freeSpace: Math.round(freeSpace)
  }
}

// Check CPU load (simulated)
function checkCPU(): { load: number, cores: number } {
  const load = Math.random() * 100
  const cores = os.cpus().length
  
  return {
    load: Math.round(load),
    cores
  }
}

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Run all health checks in parallel
    const [database, redis, externalServices] = await Promise.all([
      checkDatabase(),
      checkRedis(),
      checkExternalServices()
    ])
    
    const memory = checkMemory()
    const disk = checkDisk()
    const cpu = checkCPU()
    
    const checks = {
      database,
      redis,
      external_services: externalServices,
      memory,
      disk,
      cpu
    }
    
    // Determine overall health status
    const allHealthy = Object.values(checks).every(check => check.status === 'healthy')
    
    const healthStatus: HealthStatus = {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.APP_VERSION || '1.2.3',
      environment: process.env.NODE_ENV || 'development',
      checks
    }
    
    const statusCode = allHealthy ? 200 : 503
    const responseTime = Date.now() - startTime
    
    return NextResponse.json(
      {
        ...healthStatus,
        responseTime: `${responseTime}ms`
      },
      { 
        status: statusCode,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        version: process.env.APP_VERSION || '1.2.3',
        environment: process.env.NODE_ENV || 'development',
        error: 'Health check system failure',
        checks: {
          database: { status: 'unhealthy', message: 'Health check failed' },
          redis: { status: 'unhealthy', message: 'Health check failed' },
          external_services: { status: 'unhealthy', message: 'Health check failed' },
          memory: { used: 0, total: 0, percentage: 0 },
          disk: { freeSpace: 0 },
          cpu: { load: 0, cores: 0 }
        }
      },
      { status: 503 }
    )
  }
}

// Support HEAD requests for load balancer health checks
export async function HEAD() {
  try {
    const [database, redis] = await Promise.all([
      checkDatabase(),
      checkRedis()
    ])
    
    const isHealthy = database.status === 'healthy' && redis.status === 'healthy'
    
    return new Response(null, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    return new Response(null, { status: 503 })
  }
}
