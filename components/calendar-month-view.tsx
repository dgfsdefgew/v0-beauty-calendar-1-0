"use client"

import { Card } from "@/components/ui/card"

interface MonthAppointment {
  id: string
  date: number
  count: number
  revenue: number
}

// Mock data
const mockMonthData: MonthAppointment[] = [
  { id: "1", date: 5, count: 8, revenue: 640 },
  { id: "2", date: 8, count: 12, revenue: 980 },
  { id: "3", date: 12, count: 6, revenue: 480 },
  { id: "4", date: 15, count: 10, revenue: 850 },
  { id: "5", date: 18, count: 9, revenue: 720 },
  { id: "6", date: 22, count: 15, revenue: 1200 },
  { id: "7", date: 25, count: 11, revenue: 890 },
  { id: "8", date: 28, count: 7, revenue: 560 },
]

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function CalendarMonthView({ currentDate }: { currentDate: Date }) {
  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1 // Adjust for Monday start

    const days: (number | null)[] = []

    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null)
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const monthDays = getMonthDays()
  const today = new Date().getDate()
  const isCurrentMonth =
    currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {monthDays.map((day, index) => {
          const dayData = day ? mockMonthData.find((d) => d.date === day) : null
          const isToday = isCurrentMonth && day === today

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 rounded-lg border transition-all ${
                day
                  ? "border-border/50 hover:border-primary/50 hover:shadow-md cursor-pointer bg-card"
                  : "border-transparent bg-muted/20"
              } ${isToday ? "ring-2 ring-primary" : ""}`}
            >
              {day && (
                <>
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      isToday
                        ? "w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                        : "text-foreground"
                    }`}
                  >
                    {day}
                  </div>

                  {dayData && (
                    <div className="space-y-1">
                      <div className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                        {dayData.count} appointments
                      </div>
                      <div className="text-xs text-muted-foreground px-2">${dayData.revenue}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/10 border border-primary/30" />
          <span>Has appointments</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded ring-2 ring-primary" />
          <span>Today</span>
        </div>
      </div>
    </Card>
  )
}
