"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type React from "react"

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function Parallax({ children, speed = 0.5, className = "", direction = "up" }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const getTransformValue = () => {
    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
      case "down":
        return useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
      case "left":
        return useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
      case "right":
        return useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
      default:
        return useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
    }
  }

  const transformValue =
    direction === "left" || direction === "right" ? { x: getTransformValue() } : { y: getTransformValue() }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={transformValue} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}

