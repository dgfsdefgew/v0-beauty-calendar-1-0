"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarMonthView } from "@/components/calendar-month-view"
import { CalendarWeekView } from "@/components/calendar-week-view"
import { CalendarDayView } from "@/components/calendar-day-view"
import Link from "next/link"

type ViewType = "day" | "week" | "month"

export default function CalendarPage() {
  const [viewType, setViewType] = useState<ViewType>("week")
  const [currentDate, setCurrentDate] = useState(new Date())

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    if (viewType === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewType === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }

    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
      ...(viewType === "day" ? { day: "numeric" } : {}),
    }
    return currentDate.toLocaleDateString("en-US", options)
  }

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
              <h1 className="text-xl font-bold text-foreground">Calendar</h1>
              <p className="text-xs text-muted-foreground">Manage your appointments</p>
            </div>
          </div>

          <Link href="/booking">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Calendar Controls */}
        <Card className="p-4 mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate("prev")}
                className="hover:bg-primary/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="min-w-[200px] text-center">
                <h2 className="text-xl font-semibold text-foreground">{formatDateHeader()}</h2>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate("next")}
                className="hover:bg-primary/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button variant="outline" onClick={goToToday} className="ml-2 hover:bg-primary/10 bg-transparent">
                Today
              </Button>
            </div>

            {/* View Type Selector */}
            <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
              <Button
                variant={viewType === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("day")}
                className={viewType === "day" ? "bg-primary text-primary-foreground" : ""}
              >
                Day
              </Button>
              <Button
                variant={viewType === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("week")}
                className={viewType === "week" ? "bg-primary text-primary-foreground" : ""}
              >
                Week
              </Button>
              <Button
                variant={viewType === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType("month")}
                className={viewType === "month" ? "bg-primary text-primary-foreground" : ""}
              >
                Month
              </Button>
            </div>
          </div>
        </Card>

        {/* Calendar View */}
        <div className="animate-in fade-in duration-300">
          {viewType === "day" && <CalendarDayView currentDate={currentDate} />}
          {viewType === "week" && <CalendarWeekView currentDate={currentDate} />}
          {viewType === "month" && <CalendarMonthView currentDate={currentDate} />}
        </div>
      </main>
    </div>
  )
}
