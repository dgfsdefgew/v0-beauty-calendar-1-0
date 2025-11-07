"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SplashScreen() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted to-background transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative">
        {/* Logo Animation */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/30 shadow-2xl animate-pulse">
          <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-pulse" />
      </div>

      <h1 className="mt-8 text-4xl font-bold text-foreground tracking-tight">Beauty Calendar</h1>

      <p className="mt-2 text-muted-foreground text-sm">by Patfer 3D Coding</p>

      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}
