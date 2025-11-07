"use client"

import { Card } from "@/components/ui/card"
import { Clock, User, Scissors } from "lucide-react"

interface Appointment {
  id: string
  time: string
  duration: number
  clientName: string
  service: string
  stylist: string
  status: "confirmed" | "pending" | "completed"
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: "1",
    time: "09:00",
    duration: 60,
    clientName: "Emma Wilson",
    service: "Haircut & Style",
    stylist: "Sarah Johnson",
    status: "confirmed",
  },
  {
    id: "2",
    time: "10:30",
    duration: 90,
    clientName: "Michael Brown",
    service: "Color Treatment",
    stylist: "Sarah Johnson",
    status: "confirmed",
  },
  {
    id: "3",
    time: "13:00",
    duration: 45,
    clientName: "Lisa Anderson",
    service: "Manicure",
    stylist: "Jessica Lee",
    status: "pending",
  },
  {
    id: "4",
    time: "14:00",
    duration: 60,
    clientName: "David Martinez",
    service: "Haircut",
    stylist: "Sarah Johnson",
    status: "confirmed",
  },
  {
    id: "5",
    time: "15:30",
    duration: 120,
    clientName: "Sophie Taylor",
    service: "Full Treatment",
    stylist: "Jessica Lee",
    status: "confirmed",
  },
]

const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM

export function CalendarDayView({ currentDate }: { currentDate: Date }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-primary/10 border-primary/30 text-primary"
      case "pending":
        return "bg-accent/10 border-accent/30 text-accent-foreground"
      case "completed":
        return "bg-muted border-border text-muted-foreground"
      default:
        return "bg-muted border-border"
    }
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-2">
        {hours.map((hour) => {
          const timeStr = `${hour.toString().padStart(2, "0")}:00`
          const appointment = mockAppointments.find((apt) => apt.time === timeStr)

          return (
            <div key={hour} className="flex gap-4 min-h-[80px]">
              {/* Time Label */}
              <div className="w-20 text-sm text-muted-foreground font-medium pt-1">
                {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
              </div>

              {/* Appointment Slot */}
              <div className="flex-1 border-l-2 border-border/50 pl-4">
                {appointment ? (
                  <div
                    className={`p-4 rounded-lg border-2 ${getStatusColor(appointment.status)} transition-all hover:shadow-md cursor-pointer`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{appointment.clientName}</h3>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Scissors className="w-3 h-3" />
                            <span>{appointment.service}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span>{appointment.stylist}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{appointment.duration} minutes</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          appointment.status === "confirmed"
                            ? "bg-primary/20"
                            : appointment.status === "pending"
                              ? "bg-accent/20"
                              : "bg-muted"
                        }`}
                      >
                        {appointment.status}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[60px] flex items-center justify-center text-muted-foreground text-sm opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-xs">+ Add appointment</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
