import { createClient } from "@/lib/supabase/server"

export interface TrialCheckResult {
  allowed: boolean
  reason?: string
  previousTrials?: number
}

export async function checkTrialEligibility(email: string): Promise<TrialCheckResult> {
  const supabase = await createClient()

  // Check if email has already started a trial
  const { data: existingTrials, error } = await supabase
    .from("trial_tracking")
    .select("*")
    .eq("email", email.toLowerCase())

  if (error) {
    console.error("Trial check error:", error)
    return { allowed: true } // Allow on error to avoid blocking legitimate users
  }

  if (existingTrials && existingTrials.length > 0) {
    return {
      allowed: false,
      reason: "This email has already been used for a free trial.",
      previousTrials: existingTrials.length,
    }
  }

  return { allowed: true }
}

export async function trackTrialAttempt(email: string, ipAddress?: string, userAgent?: string, businessId?: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("trial_tracking").insert({
    email: email.toLowerCase(),
    ip_address: ipAddress,
    user_agent: userAgent,
    business_id: businessId,
  })

  if (error) {
    console.error("Trial tracking error:", error)
  }
}

// Check for suspicious patterns (multiple trials from same IP)
export async function checkSuspiciousActivity(ipAddress: string): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("trial_tracking").select("*").eq("ip_address", ipAddress)

  if (error) {
    console.error("Suspicious activity check error:", error)
    return false
  }

  // Flag as suspicious if more than 3 trials from same IP
  return data && data.length > 3
}
