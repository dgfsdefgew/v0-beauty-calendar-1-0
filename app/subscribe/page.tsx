import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PricingPlans } from "@/components/pricing-plans"

export default async function SubscribePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: business } = await supabase.from("businesses").select("*").eq("owner_id", user.id).single()

  if (!business) {
    redirect("/onboarding")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6 py-12">
      <PricingPlans trialEndsAt={business.trial_ends_at} />
    </div>
  )
}
