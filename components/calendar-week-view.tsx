"use client"

import { Card } from "@/components/ui/card"

interface Appointment {
  id: string
  day: number
  startHour: number
  duration: number
  clientName: string
  service: string
  stylist: string
}

// Mock data
const mockAppointments: Appointment[] = [
  { id: "1", day: 1, startHour: 9, duration: 1, clientName: "Emma Wilson", service: "Haircut", stylist: "Sarah" },
  { id: "2", day: 1, startHour: 14, duration: 1.5, clientName: "Michael Brown", service: "Color", stylist: "Sarah" },
  { id: "3", day: 2, startHour: 10, duration: 1, clientName: "Lisa Anderson", service: "Manicure", stylist: "Jessica" },
  {
    id: "4",
    day: 3,
    startHour: 13,
    duration: 2,
    clientName: "David Martinez",
    service: "Full Treatment",
    stylist: "Sarah",
  },
  { id: "5", day: 4, startHour: 11, duration: 1, clientName: "Sophie Taylor", service: "Haircut", stylist: "Jessica" },
  {
    id: "6",
    day: 5,
    startHour: 15,
    duration: 1.5,
    clientName: "James Wilson",
    service: "Beard Trim",
    stylist: "Sarah",
  },
]

const hours = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function CalendarWeekView({ currentDate }: { currentDate: Date }) {
  const getWeekDates = () => {
    const curr = new Date(currentDate)
    const first = curr.getDate() - curr.getDay() + 1 // Monday

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(curr)
      date.setDate(first + i)
      return date
    })
  }

  const weekDates = getWeekDates()

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-8 gap-2 mb-4">
          <div className="text-sm text-muted-foreground font-medium"></div>
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString()
            return (
              <div key={index} className="text-center">
                <div className="text-sm text-muted-foreground mb-1">{daysOfWeek[index]}</div>
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold ${
                    isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time Grid */}
        <div className="space-y-1">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-2">
              {/* Time Label */}
              <div className="text-xs text-muted-foreground font-medium py-2">
                {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
              </div>

              {/* Day Slots */}
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const appointment = mockAppointments.find((apt) => apt.day === dayIndex && apt.startHour === hour)

                return (
                  <div
                    key={dayIndex}
                    className={`min-h-[60px] border border-border/50 rounded-md ${
                      appointment
                        ? "bg-primary/10 border-primary/30 p-2 cursor-pointer hover:shadow-md transition-all"
                        : "hover:bg-muted/30 cursor-pointer transition-colors"
                    }`}
                  >
                    {appointment && (
                      <div className="text-xs">
                        <div className="font-semibold text-foreground truncate">{appointment.clientName}</div>
                        <div className="text-muted-foreground truncate">{appointment.service}</div>
                        <div className="text-muted-foreground">{appointment.stylist}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
