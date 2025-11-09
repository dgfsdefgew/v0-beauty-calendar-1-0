"use server"

import { stripe } from "@/lib/stripe"
import { SUBSCRIPTION_PLANS } from "@/lib/products"
import { createClient } from "@/lib/supabase/server"

export async function startCheckoutSession(planId: string) {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)
  if (!plan) {
    throw new Error(`Plan with id "${planId}" not found`)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Get business info
  const { data: business } = await supabase.from("businesses").select("*").eq("owner_id", user.id).single()

  if (!business) {
    throw new Error("Business not found")
  }

  // Determine mode based on billing period
  const mode = plan.billingPeriod === "lifetime" ? "payment" : "subscription"

  // Create Stripe customer if doesn't exist
  let customerId = business.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: {
        user_id: user.id,
        business_id: business.id,
      },
    })
    customerId = customer.id

    // Update business with stripe customer ID
    await supabase.from("businesses").update({ stripe_customer_id: customerId }).eq("id", business.id)
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    customer: customerId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.name,
            description: plan.description,
          },
          unit_amount: plan.priceInCents,
          ...(mode === "subscription" && {
            recurring: {
              interval: plan.billingPeriod as "month" | "year",
            },
          }),
        },
        quantity: 1,
      },
    ],
    mode,
    metadata: {
      user_id: user.id,
      business_id: business.id,
      plan_id: planId,
    },
  })

  return session.client_secret
}

export async function handlePaymentSuccess(sessionId: string) {
  const supabase = await createClient()

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
      const businessId = session.metadata?.business_id
      const planId = session.metadata?.plan_id

      if (!businessId || !planId) {
        throw new Error("Missing metadata")
      }

      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)
      if (!plan) {
        throw new Error("Plan not found")
      }

      // Update business subscription status
      await supabase
        .from("businesses")
        .update({
          subscription_status: "active",
          subscription_plan: planId,
          subscription_amount: plan.priceInCents / 100,
          subscription_started_at: new Date().toISOString(),
          ...(session.subscription && {
            stripe_subscription_id: session.subscription as string,
          }),
        })
        .eq("id", businessId)

      return { success: true }
    }

    return { success: false, error: "Payment not completed" }
  } catch (error) {
    console.error("Payment success handler error:", error)
    return { success: false, error: "Failed to process payment" }
  }
}
