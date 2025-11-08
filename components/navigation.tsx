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
    <nav className="w-64 min-h-screen bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border grid-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="relative p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center backdrop-blur-sm border border-primary/50 neon-glow relative overflow-hidden">
              <div className="absolute inset-0 holographic opacity-20" />
              <Calendar className="w-5 h-5 text-primary relative z-10" />
            </div>
            <div>
              <h2 className="font-bold text-foreground tracking-wider">BEAUTY CALENDAR</h2>
              <p className="text-xs text-primary font-mono">v1.0 // PATFER 3D</p>
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative group overflow-hidden",
                  isActive
                    ? "bg-primary/20 text-primary font-medium border border-primary/50"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground border border-transparent hover:border-primary/30",
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                )}
                <div
                  className={cn(
                    "relative z-10 transition-transform duration-300 group-hover:scale-110",
                    isActive && "text-primary",
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="relative z-10 tracking-wide uppercase text-sm font-medium">{item.title}</span>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-sidebar-border">
          <div className="space-y-2 text-xs font-mono text-muted-foreground px-2">
            <div className="flex items-center justify-between">
              <span>SYSTEM</span>
              <span className="text-accent">ONLINE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>STATUS</span>
              <span className="text-primary animate-pulse">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
