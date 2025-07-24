export default function DockerPracticesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🐳 Docker Best Practices</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Multi-Stage Dockerfile</h2>
            <p className="mb-4">Our Dockerfile uses multi-stage builds for optimal image size and security:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Image Optimization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Best Practices</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Use Alpine Linux base images</li>
                  <li>• Leverage multi-stage builds</li>
                  <li>• Use .dockerignore file</li>
                  <li>• Run as non-root user</li>
                  <li>• Minimize layer count</li>
                  <li>• Use specific version tags</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">❌ Avoid These</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Using latest tags in production</li>
                  <li>• Installing unnecessary packages</li>
                  <li>• Running as root user</li>
                  <li>• Copying entire project directory</li>
                  <li>• Ignoring layer caching</li>
                  <li>• Hardcoding secrets in images</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Docker Compose Configuration</h2>
            <p className="mb-4">For local development, use Docker Compose:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">
{`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/devops_pipeline
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: devops_pipeline
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Scanning</h2>
            <p className="mb-4">We use Trivy for container security scanning:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Scan for vulnerabilities
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy image devops-pipeline:latest

# Scan with specific severity
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy image --severity HIGH,CRITICAL devops-pipeline:latest`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Container Registry</h2>
            <p className="mb-4">We use GitHub Container Registry (ghcr.io) for storing images:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Tag and push image
docker tag devops-pipeline:latest ghcr.io/username/devops-pipeline:latest
docker push ghcr.io/username/devops-pipeline:latest

# Pull image
docker pull ghcr.io/username/devops-pipeline:latest`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance Optimization</h2>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Image Size Optimization:</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li><strong>Base Image:</strong> Use Alpine Linux (5MB vs 100MB+)</li>
                <li><strong>Dependencies:</strong> Only install production dependencies</li>
                <li><strong>Layers:</strong> Combine RUN commands to reduce layers</li>
                <li><strong>Cache:</strong> Order commands by frequency of change</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Checks</h2>
            <p className="mb-4">Add health checks to your Dockerfile:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <pre className="text-sm">
{`HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Useful Commands</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm">
{`# Build image
docker build -t devops-pipeline .

# Run container
docker run -p 3000:3000 devops-pipeline

# View logs
docker logs container_name

# Execute shell in container
docker exec -it container_name /bin/sh

# Clean up
docker system prune -a`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
