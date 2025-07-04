"use client"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function LenisWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth but snappy
      smooth: true,
      smoothTouch: false, // mobile ko light banane ke liye
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
