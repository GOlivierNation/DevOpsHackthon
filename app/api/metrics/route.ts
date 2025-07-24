import { NextResponse } from 'next/server'

interface MetricValue {
  timestamp: string
  value: number
}

interface Metric {
  name: string
  help: string
  type: 'counter' | 'gauge' | 'histogram' | 'summary'
  values: MetricValue[]
  labels?: Record<string, string>
}

// Generate mock metrics data
const generateMetrics = (): Metric[] => {
  const now = Date.now()
  const timePoints = Array.from({ length: 60 }, (_, i) => now - (i * 60000)).reverse()
  
  return [
    {
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      type: 'counter',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.floor(Math.random() * 100) + 50
      })),
      labels: { method: 'GET', status: '200' }
    },
    {
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      type: 'histogram',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.random() * 2 + 0.1
      }))
    },
    {
      name: 'pipeline_runs_total',
      help: 'Total number of pipeline runs',
      type: 'counter',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.floor(Math.random() * 10) + 1
      })),
      labels: { status: 'success' }
    },
    {
      name: 'pipeline_run_duration_seconds',
      help: 'Pipeline run duration in seconds',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.random() * 600 + 120
      }))
    },
    {
      name: 'active_deployments',
      help: 'Number of active deployments',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.floor(Math.random() * 5)
      }))
    },
    {
      name: 'container_memory_usage_bytes',
      help: 'Container memory usage in bytes',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.random() * 1073741824 + 268435456 // 256MB to 1.25GB
      })),
      labels: { container: 'devops-pipeline' }
    },
    {
      name: 'container_cpu_usage_percent',
      help: 'Container CPU usage percentage',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.random() * 80 + 10
      })),
      labels: { container: 'devops-pipeline' }
    },
    {
      name: 'database_connections_active',
      help: 'Number of active database connections',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.floor(Math.random() * 20) + 5
      }))
    },
    {
      name: 'error_rate',
      help: 'Error rate percentage',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.random() * 5
      }))
    },
    {
      name: 'response_time_p95',
      help: '95th percentile response time in milliseconds',
      type: 'gauge',
      values: timePoints.map(timestamp => ({
        timestamp: new Date(timestamp).toISOString(),
        value: Math.random() * 500 + 100
      }))
    }
  ]
}

// Convert metrics to Prometheus format
const formatPrometheusMetrics = (metrics: Metric[]): string => {
  let output = ''
  
  for (const metric of metrics) {
    output += `# HELP ${metric.name} ${metric.help}\n`
    output += `# TYPE ${metric.name} ${metric.type}\n`
    
    for (const value of metric.values) {
      const labels = metric.labels 
        ? `{${Object.entries(metric.labels).map(([k, v]) => `${k}="${v}"`).join(',')}}`
        : ''
      output += `${metric.name}${labels} ${value.value} ${new Date(value.timestamp).getTime()}\n`
    }
    output += '\n'
  }
  
  return output
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const metric = searchParams.get('metric')
    const timeRange = searchParams.get('range') || '1h'
    
    let metrics = generateMetrics()
    
    // Filter by specific metric if requested
    if (metric) {
      metrics = metrics.filter(m => m.name === metric)
      if (metrics.length === 0) {
        return NextResponse.json(
          { error: `Metric '${metric}' not found` },
          { status: 404 }
        )
      }
    }
    
    // Handle different time ranges
    const now = Date.now()
    let timeFilter: (timestamp: string) => boolean
    
    switch (timeRange) {
      case '5m':
        timeFilter = (timestamp) => new Date(timestamp).getTime() > now - 5 * 60 * 1000
        break
      case '15m':
        timeFilter = (timestamp) => new Date(timestamp).getTime() > now - 15 * 60 * 1000
        break
      case '1h':
        timeFilter = (timestamp) => new Date(timestamp).getTime() > now - 60 * 60 * 1000
        break
      case '6h':
        timeFilter = (timestamp) => new Date(timestamp).getTime() > now - 6 * 60 * 60 * 1000
        break
      case '24h':
        timeFilter = (timestamp) => new Date(timestamp).getTime() > now - 24 * 60 * 60 * 1000
        break
      default:
        timeFilter = () => true
    }
    
    // Apply time filter
    metrics = metrics.map(m => ({
      ...m,
      values: m.values.filter(v => timeFilter(v.timestamp))
    }))
    
    // Return in requested format
    if (format === 'prometheus') {
      const prometheusOutput = formatPrometheusMetrics(metrics)
      return new Response(prometheusOutput, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      })
    }
    
    // Calculate summary statistics
    const summary = {
      totalMetrics: metrics.length,
      timeRange,
      dataPoints: metrics.reduce((sum, m) => sum + m.values.length, 0),
      lastUpdate: new Date().toISOString(),
      availableMetrics: metrics.map(m => ({
        name: m.name,
        type: m.type,
        help: m.help,
        dataPoints: m.values.length,
        labels: m.labels
      }))
    }
    
    return NextResponse.json({
      metrics,
      summary,
      query: {
        format,
        metric,
        timeRange,
        timestamp: new Date().toISOString()
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch metrics',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { metric, value, labels = {}, timestamp } = body
    
    if (!metric || value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: metric and value' },
        { status: 400 }
      )
    }
    
    // Simulate storing the metric
    const storedMetric = {
      name: metric,
      value: parseFloat(value),
      labels,
      timestamp: timestamp || new Date().toISOString(),
      stored: true
    }
    
    return NextResponse.json({
      message: 'Metric stored successfully',
      metric: storedMetric
    }, { status: 201 })
  } catch (error) {
    console.error('Error storing metric:', error)
    return NextResponse.json(
      { error: 'Failed to store metric' },
      { status: 500 }
    )
  }
}
