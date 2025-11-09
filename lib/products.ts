export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  priceInCents: number
  billingPeriod: "monthly" | "yearly" | "lifetime"
  features: string[]
  popular?: boolean
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "monthly",
    name: "Monthly Plan",
    description: "14-day free trial included",
    priceInCents: 999, // $9.99
    billingPeriod: "monthly",
    features: [
      "Unlimited appointments",
      "Client management",
      "POS system",
      "Inventory tracking",
      "Reports & analytics",
      "Email support",
    ],
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    description: "Save $70 per year",
    priceInCents: 5000, // $50
    billingPeriod: "yearly",
    features: ["All Monthly features", "Priority support", "Advanced analytics", "Custom branding", "2 months free"],
    popular: true,
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    description: "Pay once, use forever",
    priceInCents: 30000, // $300
    billingPeriod: "lifetime",
    features: [
      "All Yearly features",
      "Lifetime updates",
      "Premium support",
      "Early access to new features",
      "One-time payment",
    ],
  },
]
