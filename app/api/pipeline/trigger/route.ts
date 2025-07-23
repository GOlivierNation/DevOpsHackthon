import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Simulate pipeline trigger
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newRun = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`,
      status: "running",
      branch: "main",
      time: "just now",
      duration: "0s",
      commit: Math.random().toString(36).substring(2, 9),
      author: "current.user",
      message: "Manual trigger",
    }

    return NextResponse.json(newRun, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to trigger pipeline" }, { status: 500 })
  }
}
