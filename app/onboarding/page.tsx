"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Store, MapPin, Phone, Mail, Globe, FileText, Check, Sparkles } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [businessName, setBusinessName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [rfc, setRfc] = useState("")
  const [loadDemoData, setLoadDemoData] = useState(false)

  const steps = [
    { number: 1, title: "Business Info", icon: Store },
    { number: 2, title: "Contact Details", icon: Phone },
    { number: 3, title: "Demo Data", icon: Sparkles },
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("No user found")

      // Calculate trial end date (14 days from now)
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 14)

      // Create business
      const { data: business, error: businessError } = await supabase
        .from("businesses")
        .insert({
          owner_id: user.id,
          business_name: businessName,
          address,
          phone,
          email,
          website,
          rfc,
          subscription_status: "trial",
          trial_ends_at: trialEndsAt.toISOString(),
        })
        .select()
        .single()

      if (businessError) throw businessError

      // Update profile with business_id
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ business_id: business.id })
        .eq("id", user.id)

      if (profileError) throw profileError

      // Track trial for fraud detection
      const { error: trackingError } = await supabase.from("trial_tracking").insert({
        email: user.email!,
        business_id: business.id,
      })

      if (trackingError) console.error("Trial tracking error:", trackingError)

      // Load demo data if requested
      if (loadDemoData) {
        await loadDemoDataForBusiness(business.id)
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const loadDemoDataForBusiness = async (businessId: string) => {
    const supabase = createClient()

    // Demo services
    await supabase.from("services").insert([
      { business_id: businessId, name: "Haircut & Style", category: "Hair", duration: 60, price: 500 },
      { business_id: businessId, name: "Hair Coloring", category: "Hair", duration: 120, price: 1200 },
      { business_id: businessId, name: "Manicure", category: "Nails", duration: 45, price: 300 },
      { business_id: businessId, name: "Pedicure", category: "Nails", duration: 60, price: 400 },
      { business_id: businessId, name: "Facial Treatment", category: "Spa", duration: 90, price: 800 },
    ])

    // Demo stylists
    await supabase.from("stylists").insert([
      { business_id: businessId, name: "Sofia Martinez", specialties: ["Hair", "Coloring"] },
      { business_id: businessId, name: "Carlos Rodriguez", specialties: ["Nails", "Nail Art"] },
      { business_id: businessId, name: "Ana Garcia", specialties: ["Spa", "Facial"] },
    ])

    // Demo products
    await supabase.from("products").insert([
      { business_id: businessId, name: "Shampoo Professional", category: "Hair Care", price: 250, stock: 50 },
      { business_id: businessId, name: "Conditioner", category: "Hair Care", price: 280, stock: 45 },
      { business_id: businessId, name: "Nail Polish", category: "Nails", price: 120, stock: 100 },
      { business_id: businessId, name: "Face Cream", category: "Skincare", price: 450, stock: 30 },
    ])

    // Demo clients
    await supabase.from("clients").insert([
      {
        business_id: businessId,
        name: "Maria Lopez",
        email: "maria@example.com",
        phone: "555-0101",
        total_visits: 5,
        total_spent: 2500,
      },
      {
        business_id: businessId,
        name: "Juan Perez",
        email: "juan@example.com",
        phone: "555-0102",
        total_visits: 3,
        total_spent: 1500,
      },
      {
        business_id: businessId,
        name: "Laura Sanchez",
        email: "laura@example.com",
        phone: "555-0103",
        total_visits: 8,
        total_spent: 4000,
      },
    ])
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-orange-300 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to Beauty Calendar</h1>
          <p className="text-muted-foreground">Let's set up your business in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-4">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      step >= s.number
                        ? "border-primary bg-primary text-primary-foreground shadow-lg"
                        : "border-muted-foreground/30 bg-background text-muted-foreground"
                    }`}
                  >
                    {step > s.number ? <Check className="h-6 w-6" /> : <s.icon className="h-6 w-6" />}
                  </div>
                  <span className="text-xs font-medium">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-16 transition-all duration-300 ${
                      step > s.number ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 backdrop-blur-sm p-8">
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Business Information</h2>
                  <p className="text-sm text-muted-foreground">Tell us about your beauty business</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">
                      <Store className="inline h-4 w-4 mr-2" />
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="e.g. The Style Studio"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Your business address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="rfc">
                      <FileText className="inline h-4 w-4 mr-2" />
                      RFC (Tax ID) - Mexico
                    </Label>
                    <Input
                      id="rfc"
                      placeholder="e.g. XAXX010101000"
                      value={rfc}
                      onChange={(e) => setRfc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext} disabled={!businessName}>
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
                  <p className="text-sm text-muted-foreground">How can your clients reach you?</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +52 55 1234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Business Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@yourbusiness.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="website">
                      <Globe className="inline h-4 w-4 mr-2" />
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourbusiness.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Next Step</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Ready to Launch!</h2>
                  <p className="text-sm text-muted-foreground">Your 14-day free trial starts now</p>
                </div>

                <div className="rounded-lg border border-border bg-muted/50 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="loadDemo"
                      checked={loadDemoData}
                      onChange={(e) => setLoadDemoData(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border"
                    />
                    <div>
                      <Label htmlFor="loadDemo" className="cursor-pointer font-medium">
                        Load Demo Data
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll add sample services, stylists, products, and clients so you can explore the app right
                        away. You can delete this data anytime.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold mb-2">What you'll get with demo data:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 5 sample services (haircuts, nails, spa treatments)</li>
                      <li>• 3 sample stylists with specialties</li>
                      <li>• 4 sample products in your inventory</li>
                      <li>• 3 sample clients with visit history</li>
                    </ul>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleComplete} disabled={isLoading}>
                    {isLoading ? "Setting up..." : "Complete Setup"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Your trial includes full access to all features</p>
          <p>No credit card required until trial ends</p>
        </div>
      </div>
    </div>
  )
}
