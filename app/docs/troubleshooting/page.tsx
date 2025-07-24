export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🚨 Troubleshooting Guide</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Common Issues</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">🔴 Application Won't Start</h3>
                <div className="text-sm text-red-700 mb-2">
                  <strong>Symptoms:</strong> Application crashes on startup, port binding errors
                </div>
                <div className="text-sm text-red-700 mb-2">
                  <strong>Common Causes:</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Port 3000 already in use</li>
                    <li>Missing environment variables</li>
                    <li>Database connection failure</li>
                    <li>Missing dependencies</li>
                  </ul>
                </div>
                <div className="text-sm text-red-700">
                  <strong>Solutions:</strong>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    <pre className="text-xs">
{`# Check what's using port 3000
lsof -i :3000
kill -9 <PID>

# Check environment variables
cat .env.local

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check logs
npm run dev 2>&1 | tee debug.log`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">🟠 Docker Build Failures</h3>
                <div className="text-sm text-orange-700 mb-2">
                  <strong>Symptoms:</strong> Docker build fails, image size too large, slow builds
                </div>
                <div className="text-sm text-orange-700 mb-2">
                  <strong>Common Causes:</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Docker daemon not running</li>
                    <li>Insufficient disk space</li>
                    <li>Network connectivity issues</li>
                    <li>Invalid Dockerfile syntax</li>
                  </ul>
                </div>
                <div className="text-sm text-orange-700">
                  <strong>Solutions:</strong>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    <pre className="text-xs">
{`# Check Docker status
docker --version
docker info

# Clean up Docker
docker system prune -a

# Build with verbose output
docker build --no-cache --progress=plain -t devops-pipeline .

# Check disk space
df -h`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🟡 Deployment Issues</h3>
                <div className="text-sm text-yellow-700 mb-2">
                  <strong>Symptoms:</strong> Vercel deployment fails, environment variables not working
                </div>
                <div className="text-sm text-yellow-700 mb-2">
                  <strong>Common Causes:</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Build command failures</li>
                    <li>Missing environment variables</li>
                    <li>Incorrect build settings</li>
                    <li>Function timeout errors</li>
                  </ul>
                </div>
                <div className="text-sm text-yellow-700">
                  <strong>Solutions:</strong>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    <pre className="text-xs">
{`# Check Vercel logs
vercel logs

# Redeploy with force
vercel --prod --force

# Check environment variables
vercel env ls

# Local build test
npm run build`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🔵 Kubernetes Issues</h3>
                <div className="text-sm text-blue-700 mb-2">
                  <strong>Symptoms:</strong> Pods not starting, services unreachable, resource limits
                </div>
                <div className="text-sm text-blue-700 mb-2">
                  <strong>Common Causes:</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Image pull errors</li>
                    <li>Resource constraints</li>
                    <li>Configuration errors</li>
                    <li>Network policies</li>
                  </ul>
                </div>
                <div className="text-sm text-blue-700">
                  <strong>Solutions:</strong>
                  <div className="bg-gray-100 p-2 rounded mt-1">
                    <pre className="text-xs">
{`# Check pod status
kubectl get pods -n production

# Describe pod for details
kubectl describe pod <pod-name> -n production

# Check logs
kubectl logs -f <pod-name> -n production

# Check events
kubectl get events -n production --sort-by='.lastTimestamp'`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Debugging Commands</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🔍 Application Debugging</h3>
                <div className="bg-gray-100 p-2 rounded">
                  <pre className="text-xs">
{`# Check application logs
npm run dev 2>&1 | tee app.log

# Check network connections
netstat -tulpn | grep :3000

# Monitor resource usage
top -p $(pgrep node)

# Check environment
printenv | grep -E "(NODE|DATABASE|AWS)"`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🐳 Docker Debugging</h3>
                <div className="bg-gray-100 p-2 rounded">
                  <pre className="text-xs">
{`# Check running containers
docker ps -a

# Inspect container
docker inspect <container-id>

# Execute shell in container
docker exec -it <container-id> /bin/sh

# Check container logs
docker logs -f <container-id>`}
                  </pre>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance Issues</h2>
            
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-purple-800 mb-2">🚀 Performance Optimization</h3>
              <div className="text-sm text-purple-700">
                <strong>Common Performance Issues:</strong>
                <ul className="list-disc pl-6 mt-2 mb-4">
                  <li>Slow page load times</li>
                  <li>High memory usage</li>
                  <li>Database query bottlenecks</li>
                  <li>Large bundle sizes</li>
                </ul>
                <strong>Debugging Tools:</strong>
                <div className="bg-gray-100 p-2 rounded mt-2">
                  <pre className="text-xs">
{`# Analyze bundle size
npm run build
npm run analyze

# Memory profiling
node --inspect app.js

# Database query analysis
EXPLAIN ANALYZE SELECT * FROM users;

# Network analysis
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:3000"`}
                  </pre>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monitoring and Alerts</h2>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800 mb-2">📊 Health Check Commands</h3>
              <div className="bg-gray-100 p-2 rounded">
                <pre className="text-xs">
{`# Application health
curl http://localhost:3000/api/health

# Metrics endpoint
curl http://localhost:3000/api/metrics

# Database connectivity
pg_isready -h localhost -p 5432

# Kubernetes health
kubectl get componentstatuses`}
                </pre>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Procedures</h2>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-red-800 mb-2">🚨 Emergency Response</h3>
              <div className="text-sm text-red-700">
                <strong>Production Outage:</strong>
                <ol className="list-decimal pl-6 mt-2 mb-4">
                  <li>Check application health endpoints</li>
                  <li>Review recent deployments</li>
                  <li>Check monitoring dashboards</li>
                  <li>Scale up resources if needed</li>
                  <li>Rollback if necessary</li>
                  <li>Communicate with stakeholders</li>
                </ol>
                <strong>Rollback Commands:</strong>
                <div className="bg-gray-100 p-2 rounded mt-2">
                  <pre className="text-xs">
{`# Vercel rollback
vercel rollback <deployment-url>

# Kubernetes rollback
kubectl rollout undo deployment/devops-pipeline-app -n production

# Docker rollback
docker run -d -p 3000:3000 devops-pipeline:previous-tag`}
                  </pre>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Help</h2>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📞 Support Resources</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li><strong>Documentation:</strong> Check the setup guide and configuration docs</li>
                <li><strong>Logs:</strong> Always include relevant logs when asking for help</li>
                <li><strong>GitHub Issues:</strong> Search existing issues or create a new one</li>
                <li><strong>Community:</strong> Join our Discord/Slack for real-time help</li>
                <li><strong>Monitoring:</strong> Check Grafana dashboards for system health</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">📋 Issue Report Template</h3>
              <pre className="text-sm text-gray-700">
{`**Environment:**
- OS: [e.g., macOS 12.0]
- Node.js: [e.g., 18.17.0]
- Docker: [e.g., 20.10.21]

**Issue Description:**
[Describe the problem]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [Third step]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Logs:**
[Include relevant logs]

**Additional Context:**
[Any other relevant information]`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
