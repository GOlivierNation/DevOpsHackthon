import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Container, Shield, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DockerPracticesPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">🐳 Docker Best Practices</h1>
            <p className="text-gray-600">Optimized containerization strategies</p>
          </div>
        </div>

        {/* Multi-stage Build */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Container className="w-5 h-5 text-blue-600" />
              Multi-stage Dockerfile
            </CardTitle>
            <CardDescription>Optimized production-ready container</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`# Multi-stage build for optimized production image
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Security Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Security Best Practices
            </CardTitle>
            <CardDescription>Hardening your containers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Non-root User</h4>
                    <p className="text-sm text-gray-600">Always run containers as non-root user</p>
                    <div className="bg-gray-100 p-2 rounded mt-2 font-mono text-xs">
                      RUN adduser -S nextjs -u 1001
                      <br />
                      USER nextjs
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Minimal Base Image</h4>
                    <p className="text-sm text-gray-600">Use Alpine Linux for smaller attack surface</p>
                    <div className="bg-gray-100 p-2 rounded mt-2 font-mono text-xs">FROM node:18-alpine</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Vulnerability Scanning</h4>
                    <p className="text-sm text-gray-600">Regular security scans with Trivy</p>
                    <div className="bg-gray-100 p-2 rounded mt-2 font-mono text-xs">trivy image your-image:latest</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Resource Limits</h4>
                    <p className="text-sm text-gray-600">Set memory and CPU limits</p>
                    <div className="bg-gray-100 p-2 rounded mt-2 font-mono text-xs">
                      resources:
                      <br />
                      &nbsp;&nbsp;limits:
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;memory: "512Mi"
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;cpu: "500m"
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Health Checks</h4>
                    <p className="text-sm text-gray-600">Built-in container health monitoring</p>
                    <div className="bg-gray-100 p-2 rounded mt-2 font-mono text-xs">
                      HEALTHCHECK --interval=30s
                      <br />
                      CMD curl -f /api/health
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Secrets Management</h4>
                    <p className="text-sm text-gray-600">Never embed secrets in images</p>
                    <div className="bg-gray-100 p-2 rounded mt-2 font-mono text-xs">
                      # Use environment variables
                      <br />
                      ENV DATABASE_URL=""
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Performance Optimization
            </CardTitle>
            <CardDescription>Making containers faster and smaller</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">45.2 MB</div>
                  <div className="text-sm text-gray-600">Final Image Size</div>
                  <Badge variant="secondary" className="mt-2">
                    Optimized
                  </Badge>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2m 45s</div>
                  <div className="text-sm text-gray-600">Build Time</div>
                  <Badge variant="secondary" className="mt-2">
                    Fast
                  </Badge>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">84%</div>
                  <div className="text-sm text-gray-600">Cache Hit Rate</div>
                  <Badge variant="secondary" className="mt-2">
                    Efficient
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Optimization Techniques</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Layer caching optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Multi-stage builds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Production dependencies only</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Minimal base images</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Build cache utilization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Proper .dockerignore</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Docker Commands */}
        <Card>
          <CardHeader>
            <CardTitle>Essential Docker Commands</CardTitle>
            <CardDescription>Common commands for development and deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3">Development Commands</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm space-y-1">
                  <div># Build image</div>
                  <div>docker build -t app .</div>
                  <div></div>
                  <div># Run container</div>
                  <div>docker run -p 3000:3000 app</div>
                  <div></div>
                  <div># Run with env vars</div>
                  <div>docker run -e NODE_ENV=dev app</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Production Commands</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm space-y-1">
                  <div># Tag for registry</div>
                  <div>docker tag app ghcr.io/user/app</div>
                  <div></div>
                  <div># Push to registry</div>
                  <div>docker push ghcr.io/user/app</div>
                  <div></div>
                  <div># Security scan</div>
                  <div>trivy image app:latest</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Docker Compose */}
        <Card>
          <CardHeader>
            <CardTitle>Docker Compose Configuration</CardTitle>
            <CardDescription>Local development with multiple services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123`}</pre>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="mr-2">
                docker-compose up
              </Badge>
              <Badge variant="outline" className="mr-2">
                docker-compose down
              </Badge>
              <Badge variant="outline">docker-compose logs -f</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
