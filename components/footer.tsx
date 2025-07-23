export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">DevOps Pipeline Dashboard</h3>
            <p className="text-gray-400 text-sm">Complete CI/CD solution with monitoring</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">© 2025 All rights reserved by Olivier</p>
            <p className="text-gray-500 text-xs mt-1">Built with Next.js, Docker, Kubernetes & AWS</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="/docs/setup-guide" className="hover:text-white transition-colors">
                Documentation
              </a>
              <a
                href="https://github.com/GOlivierNation/DevOpsHackthon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a href="/docs/troubleshooting" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
            <div className="text-xs">Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
