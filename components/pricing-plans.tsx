"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SUBSCRIPTION_PLANS } from "@/lib/products"
import { startCheckoutSession, handlePaymentSuccess } from "@/app/actions/stripe"
import { Check, Sparkles } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function PricingPlans({ trialEndsAt }: { trialEndsAt?: string }) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const fetchClientSecret = useCallback(async () => {
    if (!selectedPlan) return ""
    return startCheckoutSession(selectedPlan)
  }, [selectedPlan])

  const handlePaymentComplete = async (sessionId: string) => {
    setIsProcessing(true)
    const result = await handlePaymentSuccess(sessionId)
    if (result.success) {
      router.push("/dashboard?payment=success")
      router.refresh()
    } else {
      alert("Payment processing failed. Please contact support.")
    }
    setIsProcessing(false)
  }

  if (selectedPlan) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedPlan(null)} disabled={isProcessing}>
            ← Back to Plans
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>Secure payment powered by Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </CardContent>
        </Card>
      </div>
    )
  }

  const daysRemaining = trialEndsAt
    ? Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="w-full max-w-6xl mx-auto">
      {daysRemaining !== null && daysRemaining > 0 && (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {daysRemaining} days left in your free trial
          </div>
        </div>
      )}

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">Select the plan that works best for your business</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border/50"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  MOST POPULAR
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${(plan.priceInCents / 100).toFixed(2)}</span>
                <span className="text-muted-foreground">
                  {plan.billingPeriod === "monthly" && "/month"}
                  {plan.billingPeriod === "yearly" && "/year"}
                  {plan.billingPeriod === "lifetime" && " once"}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => setSelectedPlan(plan.id)}
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                Choose {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>All plans include 14-day free trial. Cancel anytime.</p>
        <p>Payments processed securely by Stripe.</p>
      </div>
    </div>
  )
}
