"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Users, Scissors, Package, FileText, Settings, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const tiles = [
  {
    title: "Calendar",
    description: "View and manage appointments",
    icon: Calendar,
    href: "/calendar",
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "Book Appointment",
    description: "Schedule new appointments",
    icon: Calendar,
    href: "/booking",
    color: "from-accent/20 to-primary/20",
  },
  {
    title: "POS",
    description: "Point of sale system",
    icon: ShoppingCart,
    href: "/pos",
    color: "from-primary/20 to-accent/30",
  },
  {
    title: "Clients",
    description: "Manage client information",
    icon: Users,
    href: "/clients",
    color: "from-primary/20 to-muted",
  },
  {
    title: "Services",
    description: "Manage services offered",
    icon: Scissors,
    href: "/services",
    color: "from-accent/20 to-muted",
  },
  {
    title: "Stylists",
    description: "Manage staff members",
    icon: Users,
    href: "/stylists",
    color: "from-muted to-primary/20",
  },
  {
    title: "Products",
    description: "Inventory management",
    icon: Package,
    href: "/products",
    color: "from-muted to-accent/20",
  },
  {
    title: "Reports",
    description: "View analytics and reports",
    icon: FileText,
    href: "/reports",
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "Settings",
    description: "Configure your business",
    icon: Settings,
    href: "/settings",
    color: "from-accent/20 to-primary/20",
  },
]

export default function DashboardPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Beauty Calendar 1.0</h1>
              <p className="text-xs text-muted-foreground">Patfer 3D Coding</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link href="/settings" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">What would you like to do today?</p>
        </div>

        {/* Animated Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, index) => {
            const Icon = tile.icon
            return (
              <Link
                key={tile.title}
                href={tile.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  className={`
                    p-6 h-full cursor-pointer
                    transition-all duration-300 ease-out
                    hover:shadow-2xl hover:-translate-y-2
                    border border-border/50
                    bg-gradient-to-br ${tile.color}
                    backdrop-blur-sm
                    ${hoveredIndex === index ? "scale-105" : "scale-100"}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div
                      className={`
                      w-16 h-16 rounded-2xl
                      bg-gradient-to-br from-primary/30 to-accent/30
                      flex items-center justify-center
                      border border-primary/20
                      transition-transform duration-300
                      ${hoveredIndex === index ? "rotate-12 scale-110" : "rotate-0 scale-100"}
                    `}
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">{tile.title}</h3>
                      <p className="text-sm text-muted-foreground">{tile.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
                <p className="text-3xl font-bold text-foreground mt-1">12</p>
              </div>
              <Calendar className="w-10 h-10 text-primary/50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-3xl font-bold text-foreground mt-1">248</p>
              </div>
              <Users className="w-10 h-10 text-accent/50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month's Revenue</p>
                <p className="text-3xl font-bold text-foreground mt-1">$8.2K</p>
              </div>
              <FileText className="w-10 h-10 text-primary/50" />
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
