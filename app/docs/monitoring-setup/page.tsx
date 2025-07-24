export default function MonitoringSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">📊 Monitoring Setup</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monitoring Stack Overview</h2>
            <p className="mb-4">Our comprehensive monitoring solution includes:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-600">Prometheus</div>
                <div className="text-sm text-orange-700">Metrics Collection</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">Grafana</div>
                <div className="text-sm text-blue-700">Visualization</div>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-red-600">AlertManager</div>
                <div className="text-sm text-red-700">Notifications</div>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">Jaeger</div>
                <div className="text-sm text-green-700">Tracing</div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prometheus Configuration</h2>
            <p className="mb-4">Prometheus scrape configuration:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'devops-pipeline-app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/api/metrics'
    scrape_interval: 10s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grafana Dashboards</h2>
            <p className="mb-4">Key dashboards for monitoring:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Application Metrics</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Request rate and latency</li>
                  <li>• Error rate and status codes</li>
                  <li>• Database connection pool</li>
                  <li>• Memory and CPU usage</li>
                  <li>• Custom business metrics</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🏗️ Infrastructure Metrics</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Node CPU, memory, disk usage</li>
                  <li>• Network I/O and bandwidth</li>
                  <li>• Kubernetes cluster health</li>
                  <li>• Pod resource utilization</li>
                  <li>• Load balancer metrics</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Application Metrics</h2>
            <p className="mb-4">Custom metrics endpoint implementation:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`// app/api/metrics/route.ts
import { NextResponse } from 'next/server'

// Simulate metrics collection
const metrics = {
  http_requests_total: Math.floor(Math.random() * 10000),
  http_request_duration_seconds: Math.random() * 2,
  active_connections: Math.floor(Math.random() * 100),
  memory_usage_bytes: Math.floor(Math.random() * 1000000000),
  cpu_usage_percent: Math.random() * 100,
}

export async function GET() {
  const prometheusMetrics = \`
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{\${metrics.http_requests_total}

# HELP http_request_duration_seconds HTTP request duration
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds{\${metrics.http_request_duration_seconds}

# HELP active_connections Number of active connections
# TYPE active_connections gauge
active_connections{\${metrics.active_connections}

# HELP memory_usage_bytes Memory usage in bytes
# TYPE memory_usage_bytes gauge
memory_usage_bytes{\${metrics.memory_usage_bytes}

# HELP cpu_usage_percent CPU usage percentage
# TYPE cpu_usage_percent gauge
cpu_usage_percent{\${metrics.cpu_usage_percent}
\`

  return new NextResponse(prometheusMetrics, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Alert Rules</h2>
            <p className="mb-4">Critical alert configurations:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`groups:
  - name: application.rules
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is {{ $value }} seconds"

      - alert: HighMemoryUsage
        expr: memory_usage_bytes / 1024 / 1024 / 1024 > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value }}GB"

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Pod is crash looping"
          description: "Pod {{ $labels.pod }} is restarting frequently"`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grafana Dashboard JSON</h2>
            <p className="mb-4">Sample dashboard configuration:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`{
  "dashboard": {
    "title": "DevOps Pipeline Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "Requests/sec"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "Error Rate"
          }
        ]
      }
    ]
  }
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logging Configuration</h2>
            <p className="mb-4">Structured logging setup:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`// utils/logger.ts
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'devops-pipeline',
    version: process.env.APP_VERSION || '1.0.0'
  },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})

export default logger`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Check Endpoint</h2>
            <p className="mb-4">Comprehensive health check implementation:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION || '1.0.0',
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      external_api: await checkExternalAPI(),
    }
  }

  const isHealthy = Object.values(health.checks).every(check => check.status === 'healthy')
  
  return NextResponse.json(health, {
    status: isHealthy ? 200 : 503
  })
}

async function checkDatabase() {
  try {
    // Database connection check
    return { status: 'healthy', responseTime: '5ms' }
  } catch (error) {
    return { status: 'unhealthy', error: error.message }
  }
}`}
              </pre>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🎯 Monitoring Best Practices:</h3>
              <ul className="list-disc pl-6 text-green-700">
                <li>Monitor the four golden signals: latency, traffic, errors, saturation</li>
                <li>Set up meaningful alerts with proper thresholds</li>
                <li>Use structured logging with correlation IDs</li>
                <li>Implement distributed tracing for microservices</li>
                <li>Monitor business metrics, not just technical ones</li>
                <li>Create runbooks for common alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
