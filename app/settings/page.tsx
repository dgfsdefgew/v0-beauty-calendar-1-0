"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar, Building2, Bell, Clock, DollarSign, Save } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Beauty Salon & Spa")
  const [businessAddress, setBusinessAddress] = useState("Av. Insurgentes Sur 1234, Col. Del Valle, CDMX 03100, México")
  const [businessPhone, setBusinessPhone] = useState("+52 55 1234 5678")
  const [businessEmail, setBusinessEmail] = useState("info@beautysalon.com.mx")
  const [businessWebsite, setBusinessWebsite] = useState("www.beautysalon.com.mx")
  const [businessRFC, setBusinessRFC] = useState("BSS123456ABC")
  const [businessHours, setBusinessHours] = useState("Lun-Vie: 9AM-7PM, Sáb: 9AM-5PM, Dom: Cerrado")

  const [currency, setCurrency] = useState("USD")
  const [taxRate, setTaxRate] = useState("8.5")
  const [depositRequired, setDepositRequired] = useState(true)
  const [depositAmount, setDepositAmount] = useState("25")

  const [appointmentDuration, setAppointmentDuration] = useState("30")
  const [bookingBuffer, setBookingBuffer] = useState("15")
  const [advanceBooking, setAdvanceBooking] = useState("60")
  const [cancellationPolicy, setCancellationPolicy] = useState("24 hours notice required for cancellations")

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [reminderTime, setReminderTime] = useState("24")
  const [marketingEmails, setMarketingEmails] = useState(true)

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/30 cursor-pointer hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Settings</h1>
              <p className="text-xs text-muted-foreground">Configure your business</p>
            </div>
          </div>

          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* Business Information */}
          <TabsContent value="business">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Business Information
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your Business Name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="businessAddress">Address</Label>
                  <Textarea
                    id="businessAddress"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="Street address, city, state, zip"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessPhone">Phone Number</Label>
                    <Input
                      id="businessPhone"
                      type="tel"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="+52 55 1234 5678"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessEmail">Email Address</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="info@business.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessWebsite">Website</Label>
                    <Input
                      id="businessWebsite"
                      type="url"
                      value={businessWebsite}
                      onChange={(e) => setBusinessWebsite(e.target.value)}
                      placeholder="www.business.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessRFC">RFC (México)</Label>
                    <Input
                      id="businessRFC"
                      value={businessRFC}
                      onChange={(e) => setBusinessRFC(e.target.value.toUpperCase())}
                      placeholder="ABC123456XYZ"
                      className="mt-1"
                      maxLength={13}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessHours">Business Hours</Label>
                  <Textarea
                    id="businessHours"
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    placeholder="Lun-Vie: 9AM-7PM"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Company Branding</h3>
                  <p className="text-xs text-muted-foreground mb-3">Patfer 3D Coding by Patrick Blanks</p>
                  <p className="text-xs text-muted-foreground">
                    Beauty Calendar 1.0 - Professional Appointment Management System
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Financial Settings */}
          <TabsContent value="financial">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Financial Settings
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      placeholder="USD"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      placeholder="8.5"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Deposit Settings</h3>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label htmlFor="depositRequired" className="text-base">
                        Require Deposit
                      </Label>
                      <p className="text-sm text-muted-foreground">Collect a deposit when booking appointments</p>
                    </div>
                    <Switch id="depositRequired" checked={depositRequired} onCheckedChange={setDepositRequired} />
                  </div>

                  {depositRequired && (
                    <div>
                      <Label htmlFor="depositAmount">Deposit Amount ($)</Label>
                      <Input
                        id="depositAmount"
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="25"
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Fixed amount or percentage based on service</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Cash</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Credit Card</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Digital Wallet</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Appointment Settings */}
          <TabsContent value="appointments">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Appointment Settings
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointmentDuration">Default Duration (minutes)</Label>
                    <Input
                      id="appointmentDuration"
                      type="number"
                      value={appointmentDuration}
                      onChange={(e) => setAppointmentDuration(e.target.value)}
                      placeholder="30"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bookingBuffer">Buffer Between Appointments (minutes)</Label>
                    <Input
                      id="bookingBuffer"
                      type="number"
                      value={bookingBuffer}
                      onChange={(e) => setBookingBuffer(e.target.value)}
                      placeholder="15"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="advanceBooking">Maximum Advance Booking (days)</Label>
                  <Input
                    id="advanceBooking"
                    type="number"
                    value={advanceBooking}
                    onChange={(e) => setAdvanceBooking(e.target.value)}
                    placeholder="60"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How far in advance clients can book appointments</p>
                </div>

                <div>
                  <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
                  <Textarea
                    id="cancellationPolicy"
                    value={cancellationPolicy}
                    onChange={(e) => setCancellationPolicy(e.target.value)}
                    placeholder="Describe your cancellation policy"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Booking Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Online Booking</Label>
                        <p className="text-sm text-muted-foreground">Clients can book via website</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Account for Booking</Label>
                        <p className="text-sm text-muted-foreground">Clients must create account</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-Confirm Appointments</Label>
                        <p className="text-sm text-muted-foreground">Skip manual confirmation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-primary" />
                Notification Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="text-base">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Send appointment reminders via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications" className="text-base">
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Send appointment reminders via text</p>
                  </div>
                  <Switch id="smsNotifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>

                <div>
                  <Label htmlFor="reminderTime">Reminder Time (hours before)</Label>
                  <Input
                    id="reminderTime"
                    type="number"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    placeholder="24"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">When to send appointment reminders</p>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Email Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Appointment Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notify when new booking is made</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Cancellation Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notify when appointment is cancelled</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Send promotional emails to clients</p>
                      </div>
                      <Switch id="marketingEmails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-semibold text-foreground mb-2">Daily Reports</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Summary Email</Label>
                      <p className="text-sm text-muted-foreground">Receive daily business summary</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
