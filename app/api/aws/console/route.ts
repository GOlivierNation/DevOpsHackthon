import { NextResponse } from "next/server"

export async function GET() {
  try {
    // AWS Console URLs for different services
    const awsConsoleUrls = {
      eks: `https://console.aws.amazon.com/eks/home?region=${process.env.AWS_REGION || "us-west-2"}#/clusters`,
      ec2: `https://console.aws.amazon.com/ec2/v2/home?region=${process.env.AWS_REGION || "us-west-2"}#Instances:`,
      cloudwatch: `https://console.aws.amazon.com/cloudwatch/home?region=${process.env.AWS_REGION || "us-west-2"}#dashboards:`,
      iam: `https://console.aws.amazon.com/iam/home#/roles`,
      vpc: `https://console.aws.amazon.com/vpc/home?region=${process.env.AWS_REGION || "us-west-2"}#vpcs:`,
      s3: `https://s3.console.aws.amazon.com/s3/home?region=${process.env.AWS_REGION || "us-west-2"}`,
      rds: `https://console.aws.amazon.com/rds/home?region=${process.env.AWS_REGION || "us-west-2"}#databases:`,
      lambda: `https://console.aws.amazon.com/lambda/home?region=${process.env.AWS_REGION || "us-west-2"}#/functions`,
    }

    const clusterInfo = {
      region: process.env.AWS_REGION || "us-west-2",
      accountId: process.env.AWS_ACCOUNT_ID || "123456789012",
      clusterName: process.env.EKS_CLUSTER_NAME || "production-cluster",
      consoleUrls: awsConsoleUrls,
      directClusterUrl: `https://console.aws.amazon.com/eks/home?region=${process.env.AWS_REGION || "us-west-2"}#/clusters/${process.env.EKS_CLUSTER_NAME || "production-cluster"}`,
      isConfigured: !!(process.env.AWS_REGION && process.env.AWS_ACCOUNT_ID),
    }

    return NextResponse.json(clusterInfo, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get AWS console info" }, { status: 500 })
  }
}
