"use client"

import { Card } from "@/components/ui/card"
import {
  Calendar,
  Users,
  Scissors,
  Package,
  FileText,
  Settings,
  ShoppingCart,
  BookOpen,
  DollarSign,
  TrendingUp,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const tiles = [
  {
    title: "Calendar",
    description: "View and manage appointments",
    icon: Calendar,
    href: "/calendar",
    color: "from-rose-200/30 to-pink-200/30",
  },
  {
    title: "Book Appointment",
    description: "Schedule new appointments",
    icon: BookOpen,
    href: "/booking",
    color: "from-amber-200/30 to-rose-200/30",
  },
  {
    title: "POS",
    description: "Point of sale system",
    icon: ShoppingCart,
    href: "/pos",
    color: "from-pink-200/30 to-purple-200/30",
  },
  {
    title: "Clients",
    description: "Manage client information",
    icon: Users,
    href: "/clients",
    color: "from-blue-200/30 to-teal-200/30",
  },
  {
    title: "Services",
    description: "Manage services offered",
    icon: Scissors,
    href: "/services",
    color: "from-amber-200/30 to-orange-200/30",
  },
  {
    title: "Stylists",
    description: "Manage staff members",
    icon: Users,
    href: "/stylists",
    color: "from-purple-200/30 to-pink-200/30",
  },
  {
    title: "Products",
    description: "Inventory management",
    icon: Package,
    href: "/products",
    color: "from-green-200/30 to-emerald-200/30",
  },
  {
    title: "Reports",
    description: "View analytics and reports",
    icon: FileText,
    href: "/reports",
    color: "from-orange-200/30 to-amber-200/30",
  },
  {
    title: "Settings",
    description: "Configure your business",
    icon: Settings,
    href: "/settings",
    color: "from-slate-200/30 to-gray-200/30",
  },
]

export default function DashboardPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-300 to-amber-200 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">BC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Beauty Calendar 1.0</h1>
              <p className="text-[10px] text-muted-foreground">Powered by Patfer 3D Coding</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg hover:bg-muted/50 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="rounded-lg hover:bg-muted/50 transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-pink-300 flex items-center justify-center shadow-md ml-2">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative h-52 bg-gradient-to-r from-neutral-800 via-stone-700 to-neutral-800">
            {/* Beauty tools pattern overlay */}
            <div className="absolute inset-0 opacity-40">
              <Image
                src="/beauty-tools-hair-dryer-scissors-comb-on-dark-wood.jpg"
                alt="Beauty tools"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

            <div className="relative h-full flex items-center justify-between px-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2 text-balance">Welcome. Style Your World.</h2>
                <p className="text-white/90 text-lg">Manage appointments with modern elegance</p>
              </div>

              <Card className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-0 shadow-xl p-6 w-64">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-300 to-amber-200 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Book Now</h3>
                    <p className="text-xs text-muted-foreground">Schedule your transformations</p>
                  </div>
                </div>

                {/* Mini calendar preview */}
                <div className="grid grid-cols-7 gap-1 text-[10px] text-center mb-3">
                  {["M", "Tu", "W", "Th", "F", "Sa", "Su"].map((day) => (
                    <div key={day} className="text-muted-foreground font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className={`py-1 rounded ${
                        i === 10 || i === 15 || i === 22
                          ? "bg-rose-300 text-white"
                          : i > 5 && i < 30
                            ? "text-foreground hover:bg-muted cursor-pointer"
                            : "text-muted-foreground/50"
                      }`}
                    >
                      {i > 5 && i < 30 ? i - 5 : ""}
                    </div>
                  ))}
                </div>

                <Link href="/booking">
                  <Button className="w-full bg-gradient-to-r from-rose-300 to-amber-200 hover:from-rose-400 hover:to-amber-300 text-white border-0 shadow-md">
                    Book Appointment
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>

        {/* Feature tiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tiles.map((tile, index) => {
            const Icon = tile.icon
            return (
              <Link
                key={tile.title}
                href={tile.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group"
              >
                <Card
                  className={`
                    p-6 h-full
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:-translate-y-1
                    border border-border/50
                    bg-gradient-to-br ${tile.color}
                    backdrop-blur-sm
                    ${hoveredIndex === index ? "scale-[1.02]" : "scale-100"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      w-12 h-12 rounded-xl
                      bg-gradient-to-br from-rose-300 to-amber-200
                      flex items-center justify-center
                      shadow-md
                      transition-transform duration-300
                      ${hoveredIndex === index ? "scale-110" : "scale-100"}
                    `}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-foreground mb-0.5">{tile.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tile.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-rose-100/50 to-pink-100/50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200/50 dark:border-rose-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Today's Appointments</p>
                <p className="text-4xl font-bold text-foreground">12</p>
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +3 from yesterday
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-300 to-pink-300 flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200/50 dark:border-amber-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
                <p className="text-4xl font-bold text-foreground">248</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12 this month
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-300 flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
                <p className="text-4xl font-bold text-foreground">$8.2K</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18% from last month
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-300 to-emerald-300 flex items-center justify-center shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
