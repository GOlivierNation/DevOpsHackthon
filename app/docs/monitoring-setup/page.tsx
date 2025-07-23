import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Activity, BarChart3, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { job } from "@/utils/job" // Declare the variable here

export default function MonitoringSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📊 Monitoring Setup</h1>
            <p className="text-gray-600">Complete monitoring stack with Prometheus and Grafana</p>
          </div>
        </div>

        {/* Monitoring Stack Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Monitoring Stack Architecture
            </CardTitle>
            <CardDescription>Comprehensive observability solution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold">Prometheus</h4>
                <p className="text-sm text-gray-600">Metrics Collection & Storage</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold">Grafana</h4>
                <p className="text-sm text-gray-600">Visualization & Dashboards</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold">AlertManager</h4>
                <p className="text-sm text-gray-600">Alert Routing & Notifications</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Data Flow</h4>
              <div className="text-sm text-gray-600">
                Application → Prometheus (scrape metrics) → Grafana (visualize) → AlertManager (notify)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prometheus Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Prometheus Configuration
            </CardTitle>
            <CardDescription>Metrics collection and storage setup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`global:
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
- job_name: 'kubernetes-pods'
  kubernetes_sd_configs:
  - role: pod
  relabel_configs:
  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
    action: keep
    regex: true
  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
    action: replace
    target_label: __metrics_path__
    regex: (.+)

- job_name: 'devops-pipeline-app'
  kubernetes_sd_configs:
  - role: pod
    namespaces:
      names:
      - production
      - staging
  relabel_configs:
  - source_labels: [__meta_kubernetes_pod_label_app]
    action: keep
    regex: devops-pipeline-app`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Grafana Dashboards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Grafana Dashboards
            </CardTitle>
            <CardDescription>Pre-configured dashboards for comprehensive monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Application Dashboard</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Request Rate:</span>
                    <Badge variant="outline">rate(http_requests_total[5m])</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <Badge variant="outline">histogram_quantile(0.95, ...)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate:</span>
                    <Badge variant="outline">rate(http_errors_total[5m])</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability:</span>
                    <Badge variant="outline">{`up{job="${job}"}`}</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Infrastructure Dashboard</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU Usage:</span>
                    <Badge variant="outline">rate(container_cpu_usage...)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Usage:</span>
                    <Badge variant="outline">container_memory_usage_bytes</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Network I/O:</span>
                    <Badge variant="outline">rate(container_network...)</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Disk Usage:</span>
                    <Badge variant="outline">container_fs_usage_bytes</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`{
  "dashboard": {
    "title": "DevOps Pipeline Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{status}}"
          }
        ]
      },
      {
        "title": "Response Time P95",
        "type": "singlestat",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      }
    ]
  }
}`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Alert Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Alert Rules Configuration
            </CardTitle>
            <CardDescription>Proactive monitoring with intelligent alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2">Critical Alerts</h4>
                <div className="space-y-1 text-sm">
                  <div>• High error rate (&gt; 10%)</div>
                  <div>• Pod crash looping</div>
                  <div>• Service unavailable</div>
                  <div>• Memory usage &gt; 90%</div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-700 mb-2">Warning Alerts</h4>
                <div className="space-y-1 text-sm">
                  <div>• High memory usage (&gt; 80%)</div>
                  <div>• Slow response time</div>
                  <div>• High CPU usage</div>
                  <div>• Disk space low</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`groups:
- name: devops-pipeline-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} errors per second"
  
  - alert: HighMemoryUsage
    expr: (container_memory_usage_bytes / container_spec_memory_limit_bytes) > 0.8
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage"
      description: "Memory usage is above 80%"
  
  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Pod is crash looping"
      description: "Pod {{ $labels.pod }} is restarting frequently"`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Application Metrics
            </CardTitle>
            <CardDescription>Custom metrics exposed by the application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Business Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div>• Pipeline executions per hour</div>
                    <div>• Deployment success rate</div>
                    <div>• Build duration trends</div>
                    <div>• User activity metrics</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Technical Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div>• HTTP request duration</div>
                    <div>• Database query performance</div>
                    <div>• Cache hit/miss ratios</div>
                    <div>• API endpoint latency</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Custom metrics endpoint: /api/metrics
export async function GET() {
  const metrics = {
    timestamp: new Date().toISOString(),
    application: {
      requests_per_minute: Math.floor(Math.random() * 1000) + 800,
      response_time_ms: Math.floor(Math.random() * 100) + 100,
      error_rate: (Math.random() * 0.1).toFixed(3),
      availability: (99.5 + Math.random() * 0.5).toFixed(2),
    },
    infrastructure: {
      cpu_usage: Math.floor(Math.random() * 40) + 30,
      memory_usage: Math.floor(Math.random() * 30) + 50,
      storage_usage: Math.floor(Math.random() * 20) + 20,
      network_io: Math.floor(Math.random() * 100) + 50,
    }
  }
  return NextResponse.json(metrics)
}`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Commands */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoring Stack Deployment</CardTitle>
            <CardDescription>Step-by-step setup commands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Deploy Prometheus</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div># Create monitoring namespace</div>
                  <div>kubectl create namespace monitoring</div>
                  <div></div>
                  <div># Deploy Prometheus</div>
                  <div>kubectl apply -f k8s/monitoring/prometheus.yml</div>
                  <div></div>
                  <div># Verify deployment</div>
                  <div>kubectl get pods -n monitoring</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Deploy Grafana</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div># Deploy Grafana with dashboards</div>
                  <div>kubectl apply -f k8s/monitoring/grafana.yml</div>
                  <div></div>
                  <div># Get Grafana service URL</div>
                  <div>kubectl get svc grafana-service -n monitoring</div>
                  <div></div>
                  <div># Port forward for local access</div>
                  <div>kubectl port-forward svc/grafana-service 3001:3000 -n monitoring</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Configure Alerts</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div># Test alert rules</div>
                  <div>promtool check rules alert_rules.yml</div>
                  <div></div>
                  <div># Reload Prometheus config</div>
                  <div>curl -X POST http://prometheus:9090/-/reload</div>
                  <div></div>
                  <div># Check alert status</div>
                  <div>curl http://prometheus:9090/api/v1/alerts</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Information */}
        <Card>
          <CardHeader>
            <CardTitle>Access URLs & Credentials</CardTitle>
            <CardDescription>How to access your monitoring tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Prometheus</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    URL: <code>http://prometheus:9090</code>
                  </div>
                  <div>
                    Port Forward: <code>kubectl port-forward svc/prometheus-service 9090:9090 -n monitoring</code>
                  </div>
                  <div>
                    Local: <code>http://localhost:9090</code>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Grafana</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    URL: <code>http://grafana:3000</code>
                  </div>
                  <div>
                    Username: <code>admin</code>
                  </div>
                  <div>
                    Password: <code>admin123</code>
                  </div>
                  <div>
                    Local: <code>http://localhost:3001</code>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Application</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    Health: <code>/api/health</code>
                  </div>
                  <div>
                    Metrics: <code>/api/metrics</code>
                  </div>
                  <div>
                    Dashboard: <code>/</code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
