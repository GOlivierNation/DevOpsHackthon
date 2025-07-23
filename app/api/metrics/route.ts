import { NextResponse } from "next/server"

export async function GET() {
  try {
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
      },
      kubernetes: {
        pods_running: 6,
        pods_pending: 0,
        pods_failed: 0,
        nodes_ready: 3,
        services_active: 2,
      },
    }

    return NextResponse.json(metrics, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}
