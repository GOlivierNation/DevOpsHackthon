export default function KubernetesDeploymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">☸️ Kubernetes Deployment</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deployment Architecture</h2>
            <p className="mb-4">Our Kubernetes deployment consists of multiple components working together:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-blue-700">Worker Nodes</div>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-green-700">Application Pods</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">2</div>
                <div className="text-sm text-purple-700">Load Balancers</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-orange-700">Uptime SLA</div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deployment Manifests</h2>
            <p className="mb-4">Application deployment configuration:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-pipeline-app
  namespace: production
  labels:
    app: devops-pipeline
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: devops-pipeline
  template:
    metadata:
      labels:
        app: devops-pipeline
    spec:
      containers:
      - name: app
        image: ghcr.io/goliviernation/devops-pipeline:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
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
          periodSeconds: 5`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Configuration</h2>
            <p className="mb-4">Service to expose the application:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`apiVersion: v1
kind: Service
metadata:
  name: devops-pipeline-service
  namespace: production
spec:
  selector:
    app: devops-pipeline
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: devops-pipeline-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - devops-pipeline.example.com
    secretName: devops-pipeline-tls
  rules:
  - host: devops-pipeline.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: devops-pipeline-service
            port:
              number: 80`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">ConfigMap and Secrets</h2>
            <p className="mb-4">Configuration management:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  NODE_ENV: "production"
  PORT: "3000"
  LOG_LEVEL: "info"

---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: production
type: Opaque
data:
  database-url: <base64-encoded-database-url>
  jwt-secret: <base64-encoded-jwt-secret>
  api-key: <base64-encoded-api-key>`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Horizontal Pod Autoscaler</h2>
            <p className="mb-4">Auto-scaling configuration:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: devops-pipeline-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: devops-pipeline-app
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
        averageUtilization: 80`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">AWS EKS Setup</h2>
            <p className="mb-4">Commands to create an EKS cluster:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin

# Create EKS cluster
eksctl create cluster \\
  --name devops-pipeline-cluster \\
  --region us-west-2 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 3 \\
  --nodes-min 1 \\
  --nodes-max 4 \\
  --managed

# Update kubeconfig
aws eks update-kubeconfig --region us-west-2 --name devops-pipeline-cluster`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monitoring and Logging</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📊 Monitoring Stack</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Prometheus for metrics collection</li>
                  <li>• Grafana for visualization</li>
                  <li>• AlertManager for notifications</li>
                  <li>• Node Exporter for node metrics</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">📝 Logging Stack</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Fluentd for log collection</li>
                  <li>• Elasticsearch for log storage</li>
                  <li>• Kibana for log visualization</li>
                  <li>• Structured JSON logging</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Useful kubectl Commands</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Deploy application
kubectl apply -f k8s/

# Check deployment status
kubectl get deployments -n production

# View pods
kubectl get pods -n production

# Check logs
kubectl logs -f deployment/devops-pipeline-app -n production

# Scale deployment
kubectl scale deployment devops-pipeline-app --replicas=5 -n production

# Port forward for testing
kubectl port-forward svc/devops-pipeline-service 3000:80 -n production

# Delete resources
kubectl delete -f k8s/`}
              </pre>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Production Considerations:</h3>
              <ul className="list-disc pl-6 text-yellow-700">
                <li>Always use resource limits and requests</li>
                <li>Implement proper health checks</li>
                <li>Use rolling updates for zero-downtime deployments</li>
                <li>Monitor cluster resources and costs</li>
                <li>Implement proper RBAC and security policies</li>
                <li>Regular backup of persistent volumes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
