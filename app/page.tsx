"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashScreen() {
  const router = useRouter()
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
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background transition-opacity duration-500 relative overflow-hidden ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-secondary/20 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-80 h-80 mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%20%283%29-zan9vBn5lVY5ckWO9pVVWV9wqXLrfE.jpg"
            alt="Beauty Calendar 1.0"
            width={320}
            height={320}
            className="rounded-3xl shadow-2xl"
            priority
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="flex gap-2 mt-8">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
