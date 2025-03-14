"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type React from "react"

interface GSAPTextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  trigger?: string
  start?: string
  type?: "chars" | "words" | "lines"
  markers?: boolean
  once?: boolean
}

export function GSAPTextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  trigger,
  start = "top 80%",
  type = "words",
  markers = false,
  once = true,
}: GSAPTextRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const element = elementRef.current
    if (!element) return

    // Instead of using SplitType, we'll use a simpler approach
    // Create spans for each word
    if (typeof children === "string" && type === "words") {
      const words = children.split(" ")
      element.innerHTML = ""
      words.forEach((word) => {
        const span = document.createElement("span")
        span.className = "inline-block"
        span.textContent = word + " "
        element.appendChild(span)
      })
    }

    // Get all spans
    const targets = element.querySelectorAll("span")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger ? document.querySelector(trigger) : element,
        start,
        markers,
        once,
      },
      delay,
    })

    // Animate the text
    tl.from(targets, {
      opacity: 0,
      y: 20,
      duration,
      stagger,
      ease: "power2.out",
    })

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
      tl.kill()
    }
  }, [children, delay, duration, stagger, trigger, start, type, markers, once])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

