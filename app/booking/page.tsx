"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronLeft, ChevronRight, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type BookingStep = "service" | "stylist" | "datetime" | "client" | "confirm"

const services = [
  { id: "1", name: "Haircut & Style", duration: 60, price: 65, category: "Hair" },
  { id: "2", name: "Color Treatment", duration: 120, price: 150, category: "Hair" },
  { id: "3", name: "Highlights", duration: 180, price: 200, category: "Hair" },
  { id: "4", name: "Manicure", duration: 45, price: 35, category: "Nails" },
  { id: "5", name: "Pedicure", duration: 60, price: 50, category: "Nails" },
  { id: "6", name: "Gel Nails", duration: 90, price: 70, category: "Nails" },
  { id: "7", name: "Makeup Application", duration: 60, price: 80, category: "Makeup" },
  { id: "8", name: "Facial Treatment", duration: 90, price: 95, category: "Spa" },
]

const stylists = [
  { id: "1", name: "Sarah Johnson", specialty: "Hair Specialist", avatar: "/woman-hair-stylist.jpg" },
  { id: "2", name: "Jessica Lee", specialty: "Nail Technician", avatar: "/woman-nail-technician.png" },
  { id: "3", name: "Michael Chen", specialty: "Hair & Beard", avatar: "/man-barber.jpg" },
  { id: "4", name: "Emma Davis", specialty: "Makeup Artist", avatar: "/woman-makeup-artist.jpg" },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function BookingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<BookingStep>("service")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedStylist, setSelectedStylist] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientNotes, setClientNotes] = useState("")

  const steps: BookingStep[] = ["service", "stylist", "datetime", "client", "confirm"]
  const stepTitles = {
    service: "Select Service",
    stylist: "Choose Stylist",
    datetime: "Pick Date & Time",
    client: "Client Information",
    confirm: "Confirm Booking",
  }

  const currentStepIndex = steps.indexOf(currentStep)

  const canProceed = () => {
    switch (currentStep) {
      case "service":
        return selectedService !== ""
      case "stylist":
        return selectedStylist !== ""
      case "datetime":
        return selectedDate && selectedTime !== ""
      case "client":
        return clientName && clientPhone
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1])
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1])
    }
  }

  const handleConfirm = () => {
    // In a real app, this would save to database
    alert("Appointment booked successfully!")
    router.push("/calendar")
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedStylistData = stylists.find((s) => s.id === selectedStylist)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/30 cursor-pointer hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Book Appointment</h1>
              <p className="text-xs text-muted-foreground">Schedule a new appointment</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${
                      index <= currentStepIndex
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                  >
                    {index < currentStepIndex ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <p className="text-xs mt-2 text-muted-foreground hidden md:block">{stepTitles[step]}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-all duration-300 ${
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 min-h-[500px]">
          <h2 className="text-2xl font-bold text-foreground mb-6">{stepTitles[currentStep]}</h2>

          {/* Service Selection */}
          {currentStep === "service" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      selectedService === service.id
                        ? "border-primary bg-primary/10 shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <span className="text-primary font-bold">${service.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{service.category}</p>
                  <p className="text-xs text-muted-foreground">{service.duration} minutes</p>
                </div>
              ))}
            </div>
          )}

          {/* Stylist Selection */}
          {currentStep === "stylist" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stylists.map((stylist) => (
                <div
                  key={stylist.id}
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`
                    p-6 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      selectedStylist === stylist.id
                        ? "border-primary bg-primary/10 shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={stylist.avatar || "/placeholder.svg"}
                      alt={stylist.name}
                      className="w-20 h-20 rounded-full mb-4 border-4 border-primary/20"
                    />
                    <h3 className="font-semibold text-foreground mb-1">{stylist.name}</h3>
                    <p className="text-sm text-muted-foreground">{stylist.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Date & Time Selection */}
          {currentStep === "datetime" && (
            <div className="space-y-6">
              <div>
                <Label className="mb-2">Select Date</Label>
                <Input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label className="mb-2">Select Time</Label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all
                        ${
                          selectedTime === time
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Client Information */}
          {currentStep === "client" && (
            <div className="space-y-4 max-w-xl">
              <div>
                <Label htmlFor="name">Client Name *</Label>
                <Input
                  id="name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes">Special Requests / Notes</Label>
                <Textarea
                  id="notes"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Any special requests or notes..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Confirmation */}
          {currentStep === "confirm" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Appointment Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium text-foreground">{selectedServiceData?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stylist:</span>
                    <span className="font-medium text-foreground">{selectedStylistData?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-foreground">{selectedTime}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{selectedServiceData?.duration} minutes</span>
                  </div>

                  <div className="border-t border-border/50 pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-foreground">Total:</span>
                      <span className="font-bold text-primary">${selectedServiceData?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">Client Details</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Name:</span> {clientName}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Phone:</span> {clientPhone}
                  </p>
                  {clientEmail && (
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Email:</span> {clientEmail}
                    </p>
                  )}
                  {clientNotes && (
                    <p className="text-foreground mt-2">
                      <span className="text-muted-foreground">Notes:</span> {clientNotes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="min-w-[100px] bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep === "confirm" ? (
            <Button
              onClick={handleConfirm}
              className="min-w-[150px] bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="min-w-[100px] bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
