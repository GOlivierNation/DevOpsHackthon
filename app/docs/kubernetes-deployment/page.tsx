import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Cloud, Server, Network, Shield } from "lucide-react"
import Link from "next/link"

export default function KubernetesDeploymentPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">☸️ Kubernetes Deployment</h1>
            <p className="text-gray-600">Production-ready Kubernetes configuration</p>
          </div>
        </div>

        {/* Deployment Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              Deployment Manifest
            </CardTitle>
            <CardDescription>Production deployment with auto-scaling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-production
  namespace: production
  labels:
    app: devops-pipeline-app
    environment: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: devops-pipeline-app
      environment: production
  template:
    metadata:
      labels:
        app: devops-pipeline-app
        environment: production
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3000"
        prometheus.io/path: "/api/metrics"
    spec:
      containers:
      - name: app
        image: ghcr.io/your-org/devops-pipeline-app:latest
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Service Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-green-600" />
              Service & Ingress
            </CardTitle>
            <CardDescription>Load balancing and external access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Configuration</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`apiVersion: v1
kind: Service
metadata:
  name: app-service-production
  namespace: production
spec:
  selector:
    app: devops-pipeline-app
    environment: production
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      name: http
  type: ClusterIP`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Ingress Configuration</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress-production
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: app-tls-production
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-service-production
            port:
              number: 80`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-scaling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-purple-600" />
              Horizontal Pod Autoscaler
            </CardTitle>
            <CardDescription>Automatic scaling based on metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Scaling Configuration</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    Min Replicas: <span className="font-medium">3</span>
                  </div>
                  <div>
                    Max Replicas: <span className="font-medium">10</span>
                  </div>
                  <div>
                    CPU Target: <span className="font-medium">70%</span>
                  </div>
                  <div>
                    Memory Target: <span className="font-medium">80%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Scaling Behavior</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    Scale Up: <span className="font-medium">2 pods/min</span>
                  </div>
                  <div>
                    Scale Down: <span className="font-medium">1 pod/5min</span>
                  </div>
                  <div>
                    Stabilization: <span className="font-medium">300s</span>
                  </div>
                  <div>
                    Policy: <span className="font-medium">Conservative</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa-production
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-production
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Security Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Security Configuration
            </CardTitle>
            <CardDescription>RBAC, Network Policies, and Pod Security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">RBAC</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• Service accounts</div>
                  <div>• Role-based access</div>
                  <div>• Least privilege</div>
                  <div>• Namespace isolation</div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Network Policies</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• Pod-to-pod traffic</div>
                  <div>• Ingress/egress rules</div>
                  <div>• Namespace segmentation</div>
                  <div>• Default deny policy</div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Pod Security</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• Non-root containers</div>
                  <div>• Read-only filesystem</div>
                  <div>• Security contexts</div>
                  <div>• Resource limits</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: app-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-role-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: production
roleRef:
  kind: Role
  name: app-role
  apiGroup: rbac.authorization.k8s.io`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Commands */}
        <Card>
          <CardHeader>
            <CardTitle>Essential kubectl Commands</CardTitle>
            <CardDescription>Common commands for managing deployments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3">Deployment Commands</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm space-y-1">
                  <div># Apply manifests</div>
                  <div>kubectl apply -f k8s/</div>
                  <div></div>
                  <div># Check deployment status</div>
                  <div>kubectl get deployments -n production</div>
                  <div></div>
                  <div># View pods</div>
                  <div>kubectl get pods -n production</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Troubleshooting Commands</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm space-y-1">
                  <div># View logs</div>
                  <div>kubectl logs -f deployment/app-production</div>
                  <div></div>
                  <div># Describe pod</div>
                  <div>kubectl describe pod &lt;pod-name&gt;</div>
                  <div></div>
                  <div># Execute into pod</div>
                  <div>kubectl exec -it &lt;pod-name&gt; -- /bin/sh</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoring Integration</CardTitle>
            <CardDescription>Prometheus and Grafana setup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">Prometheus Annotations</h4>
                  <div className="bg-gray-100 p-2 rounded font-mono text-xs">
                    prometheus.io/scrape: "true"
                    <br />
                    prometheus.io/port: "3000"
                    <br />
                    prometheus.io/path: "/api/metrics"
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">Health Checks</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      Liveness: <code>/api/health</code>
                    </div>
                    <div>
                      Readiness: <code>/api/health</code>
                    </div>
                    <div>
                      Startup: <code>/api/health</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Metrics Collection</Badge>
                <Badge variant="outline">Health Monitoring</Badge>
                <Badge variant="outline">Performance Tracking</Badge>
                <Badge variant="outline">Alert Integration</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
