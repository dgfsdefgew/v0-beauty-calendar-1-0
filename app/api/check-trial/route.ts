import { type NextRequest, NextResponse } from "next/server"
import { checkTrialEligibility, checkSuspiciousActivity } from "@/lib/trial-fraud-detection"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ allowed: false, reason: "Email is required" }, { status: 400 })
    }

    // Check trial eligibility by email
    const trialCheck = await checkTrialEligibility(email)

    if (!trialCheck.allowed) {
      return NextResponse.json(trialCheck)
    }

    // Get IP address for additional fraud detection
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Check for suspicious activity from this IP
    const isSuspicious = await checkSuspiciousActivity(ipAddress)

    if (isSuspicious) {
      return NextResponse.json({
        allowed: false,
        reason: "Multiple trial attempts detected. Please contact support.",
      })
    }

    return NextResponse.json({ allowed: true })
  } catch (error) {
    console.error("Trial check error:", error)
    return NextResponse.json(
      { allowed: true }, // Allow on error to avoid blocking legitimate users
      { status: 200 },
    )
  }
}
