"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type React from "react"

interface GSAPRevealProps {
  children: React.ReactNode
  className?: string
  animation?: "fade" | "slide" | "scale" | "custom"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  trigger?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
  customAnimation?: (element: HTMLElement, tl: gsap.core.Timeline) => void
}

export function GSAPReveal({
  children,
  className = "",
  animation = "fade",
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 100,
  trigger,
  start = "top 80%",
  end,
  scrub = false,
  markers = false,
  once = true,
  customAnimation,
}: GSAPRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const element = elementRef.current
    if (!element) return

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger ? document.querySelector(trigger) : element,
        start,
        end,
        scrub,
        markers,
        once,
      },
      delay,
      defaults: { duration, ease: "power2.out" },
    })

    // Apply the animation based on the type
    switch (animation) {
      case "fade":
        tl.fromTo(element, { autoAlpha: 0 }, { autoAlpha: 1 })
        break
      case "slide":
        const slideProps = {
          up: { y: distance },
          down: { y: -distance },
          left: { x: distance },
          right: { x: -distance },
        }
        tl.fromTo(
          element,
          { ...slideProps[direction], autoAlpha: 0 },
          { [direction === "left" || direction === "right" ? "x" : "y"]: 0, autoAlpha: 1 },
        )
        break
      case "scale":
        tl.fromTo(element, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 })
        break
      case "custom":
        if (customAnimation) {
          customAnimation(element, tl)
        }
        break
    }

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
      tl.kill()
    }
  }, [animation, direction, delay, duration, distance, trigger, start, end, scrub, markers, once, customAnimation])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

