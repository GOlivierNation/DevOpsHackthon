import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, Bug, Wrench, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TroubleshootingPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">🚨 Troubleshooting Guide</h1>
            <p className="text-gray-600">Common issues and their solutions</p>
          </div>
        </div>

        {/* Quick Diagnostics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Quick Health Check
            </CardTitle>
            <CardDescription>Run these commands to check system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
              <div># Check application health</div>
              <div>curl -f http://localhost:3000/api/health</div>
              <div></div>
              <div># Check Kubernetes pods</div>
              <div>kubectl get pods -n production</div>
              <div></div>
              <div># Check services</div>
              <div>kubectl get svc -n production</div>
              <div></div>
              <div># Check recent events</div>
              <div>kubectl get events -n production --sort-by='.lastTimestamp'</div>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-600" />
              Pipeline Issues
            </CardTitle>
            <CardDescription>Common CI/CD pipeline problems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-red-700 mb-2">Build Failures</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: npm install fails</div>
                  <div className="text-sm text-gray-600 mb-2">Package installation errors or dependency conflicts</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Clear npm cache
                    <br />
                    npm cache clean --force
                    <br /># Delete node_modules and package-lock.json
                    <br />
                    rm -rf node_modules package-lock.json
                    <br /># Reinstall dependencies
                    <br />
                    npm install
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: TypeScript compilation errors</div>
                  <div className="text-sm text-gray-600 mb-2">Type checking failures during build</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check TypeScript errors
                    <br />
                    npx tsc --noEmit
                    <br /># Fix linting issues
                    <br />
                    npm run lint:fix
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Test failures</div>
                  <div className="text-sm text-gray-600 mb-2">Unit tests failing in CI environment</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Run tests locally
                    <br />
                    npm test
                    <br /># Update snapshots if needed
                    <br />
                    npm test -- --updateSnapshot
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-yellow-700 mb-2">Docker Build Issues</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: Docker build timeout</div>
                  <div className="text-sm text-gray-600 mb-2">Build process takes too long or hangs</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Build with verbose output
                    <br />
                    docker build --progress=plain -t app .<br /># Check .dockerignore file
                    <br />
                    cat .dockerignore
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Image size too large</div>
                  <div className="text-sm text-gray-600 mb-2">Final image exceeds expected size</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Analyze image layers
                    <br />
                    docker history app:latest
                    <br /># Use multi-stage builds
                    <br /># Remove unnecessary files
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-700 mb-2">GitHub Actions Issues</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: Workflow not triggering</div>
                  <div className="text-sm text-gray-600 mb-2">Pipeline doesn't start on push/PR</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check workflow file syntax
                    <br /># Verify branch names in triggers
                    <br /># Check repository permissions
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Secrets not available</div>
                  <div className="text-sm text-gray-600 mb-2">Environment variables or secrets missing</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Verify secrets in repository settings
                    <br /># Check secret names match workflow
                    <br /># Ensure proper environment context
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-600" />
              Deployment Issues
            </CardTitle>
            <CardDescription>Kubernetes and application deployment problems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-red-700 mb-2">Pod Issues</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: Pods stuck in Pending state</div>
                  <div className="text-sm text-gray-600 mb-2">Pods cannot be scheduled</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check pod events
                    <br />
                    kubectl describe pod &lt;pod-name&gt; -n production
                    <br /># Check node resources
                    <br />
                    kubectl top nodes
                    <br /># Check resource quotas
                    <br />
                    kubectl describe quota -n production
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Pods crash looping</div>
                  <div className="text-sm text-gray-600 mb-2">Pods restart continuously</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check pod logs
                    <br />
                    kubectl logs -f &lt;pod-name&gt; -n production
                    <br /># Check previous container logs
                    <br />
                    kubectl logs &lt;pod-name&gt; --previous -n production
                    <br /># Verify health check endpoints
                    <br />
                    curl http://pod-ip:3000/api/health
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: ImagePullBackOff</div>
                  <div className="text-sm text-gray-600 mb-2">Cannot pull container image</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check image name and tag
                    <br />
                    kubectl describe pod &lt;pod-name&gt; -n production
                    <br /># Verify registry credentials
                    <br />
                    kubectl get secrets -n production
                    <br /># Test image pull manually
                    <br />
                    docker pull &lt;image-name&gt;
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-yellow-700 mb-2">Service Issues</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: Service not accessible</div>
                  <div className="text-sm text-gray-600 mb-2">Cannot reach application through service</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check service endpoints
                    <br />
                    kubectl get endpoints -n production
                    <br /># Verify service selector
                    <br />
                    kubectl describe svc app-service-production -n production
                    <br /># Test service connectivity
                    <br />
                    kubectl run test-pod --image=busybox -it --rm -- wget -qO- http://app-service-production/api/health
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Load balancer not working</div>
                  <div className="text-sm text-gray-600 mb-2">External traffic not reaching pods</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check ingress status
                    <br />
                    kubectl get ingress -n production
                    <br /># Verify ingress controller
                    <br />
                    kubectl get pods -n ingress-nginx
                    <br /># Check DNS resolution
                    <br />
                    nslookup your-domain.com
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Application Issues
            </CardTitle>
            <CardDescription>Runtime and performance problems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-red-700 mb-2">Performance Issues</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: High response times</div>
                  <div className="text-sm text-gray-600 mb-2">API endpoints responding slowly</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check application metrics
                    <br />
                    curl http://localhost:3000/api/metrics
                    <br /># Monitor resource usage
                    <br />
                    kubectl top pods -n production
                    <br /># Check database connections
                    <br /># Review slow query logs
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Memory leaks</div>
                  <div className="text-sm text-gray-600 mb-2">Memory usage continuously increasing</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Monitor memory usage over time
                    <br />
                    kubectl top pods -n production --containers
                    <br /># Check for memory leaks in code
                    <br /># Review garbage collection logs
                    <br /># Implement memory profiling
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-yellow-700 mb-2">Configuration Issues</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm">Symptom: Environment variables not loaded</div>
                  <div className="text-sm text-gray-600 mb-2">Application cannot access configuration</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Check environment variables in pod
                    <br />
                    kubectl exec -it &lt;pod-name&gt; -n production -- env
                    <br /># Verify ConfigMap and Secrets
                    <br />
                    kubectl get configmap,secret -n production
                    <br /># Check deployment manifest
                    <br />
                    kubectl get deployment app-production -o yaml -n production
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">Symptom: Database connection failures</div>
                  <div className="text-sm text-gray-600 mb-2">Cannot connect to database</div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                    # Test database connectivity
                    <br />
                    kubectl run db-test --image=postgres:13 -it --rm -- psql $DATABASE_URL
                    <br /># Check network policies
                    <br />
                    kubectl get networkpolicy -n production
                    <br /># Verify database credentials
                    <br />
                    kubectl get secret app-secrets -o yaml -n production
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoring & Observability Issues</CardTitle>
            <CardDescription>Problems with metrics, logs, and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Prometheus Issues</h4>
                <div className="space-y-2 text-sm">
                  <div className="border-l-2 border-blue-500 pl-2">
                    <div className="font-medium">Metrics not being scraped</div>
                    <div className="text-gray-600">Check service discovery and annotations</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-2">
                    <div className="font-medium">High memory usage</div>
                    <div className="text-gray-600">Adjust retention period and storage</div>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-2">
                    <div className="font-medium">Targets down</div>
                    <div className="text-gray-600">Verify network connectivity and health endpoints</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Grafana Issues</h4>
                <div className="space-y-2 text-sm">
                  <div className="border-l-2 border-green-500 pl-2">
                    <div className="font-medium">Dashboards not loading</div>
                    <div className="text-gray-600">Check data source configuration</div>
                  </div>
                  <div className="border-l-2 border-green-500 pl-2">
                    <div className="font-medium">No data in graphs</div>
                    <div className="text-gray-600">Verify Prometheus queries and time ranges</div>
                  </div>
                  <div className="border-l-2 border-green-500 pl-2">
                    <div className="font-medium">Alerts not firing</div>
                    <div className="text-gray-600">Check alert rules and notification channels</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Procedures */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">🚨 Emergency Procedures</CardTitle>
            <CardDescription>Critical actions for production incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Immediate Actions</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                    <div># Scale down to stop traffic</div>
                    <div>kubectl scale deployment app-production --replicas=0 -n production</div>
                    <div></div>
                    <div># Rollback to previous version</div>
                    <div>kubectl rollout undo deployment/app-production -n production</div>
                    <div></div>
                    <div># Check rollback status</div>
                    <div>kubectl rollout status deployment/app-production -n production</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Communication</h4>
                  <div className="space-y-1 text-sm">
                    <div>• Notify team in Slack #incidents channel</div>
                    <div>• Update status page if customer-facing</div>
                    <div>• Document incident timeline</div>
                    <div>• Prepare post-incident review</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
            <CardDescription>Where to get help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Documentation</h4>
                <div className="space-y-1 text-sm">
                  <div>
                    •{" "}
                    <a href="/docs/setup-guide" className="text-blue-600 hover:underline">
                      Setup Guide
                    </a>
                  </div>
                  <div>
                    •{" "}
                    <a href="/docs/pipeline-config" className="text-blue-600 hover:underline">
                      Pipeline Config
                    </a>
                  </div>
                  <div>
                    •{" "}
                    <a href="/docs/kubernetes-deployment" className="text-blue-600 hover:underline">
                      K8s Deployment
                    </a>
                  </div>
                  <div>
                    •{" "}
                    <a href="/docs/monitoring-setup" className="text-blue-600 hover:underline">
                      Monitoring Setup
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Community</h4>
                <div className="space-y-1 text-sm">
                  <div>• GitHub Issues</div>
                  <div>• Stack Overflow</div>
                  <div>• Discord Community</div>
                  <div>• Reddit r/devops</div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Emergency</h4>
                <div className="space-y-1 text-sm">
                  <div>• On-call engineer</div>
                  <div>• Incident response team</div>
                  <div>• Escalation procedures</div>
                  <div>• Vendor support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
