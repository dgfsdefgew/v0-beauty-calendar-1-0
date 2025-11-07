"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, Scissors, Package, FileText, Settings, LayoutDashboard, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Booking", href: "/booking", icon: Calendar },
  { title: "POS", href: "/pos", icon: ShoppingCart },
  { title: "Clients", href: "/clients", icon: Users },
  { title: "Services", href: "/services", icon: Scissors },
  { title: "Stylists", href: "/stylists", icon: Users },
  { title: "Products", href: "/products", icon: Package },
  { title: "Reports", href: "/reports", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen bg-card border-r border-border/50 p-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Beauty Calendar</h2>
            <p className="text-xs text-muted-foreground">Patfer 3D Coding</p>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
