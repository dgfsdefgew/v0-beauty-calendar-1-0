"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, Scissors, Package, FileText, Settings, LayoutDashboard, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

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
    <nav className="w-64 min-h-screen bg-card/50 backdrop-blur-xl border-r border-border relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-sm">Beauty Calendar</h2>
              <p className="text-xs text-muted-foreground">by Patfer 3D</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group",
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary font-medium shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
                <Icon className={cn("w-5 h-5 transition-transform duration-300", isActive && "scale-110")} />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground font-medium">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
