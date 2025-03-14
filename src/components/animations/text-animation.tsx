"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import type React from "react"

interface TextAnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  staggerDelay?: number
  className?: string
  once?: boolean
  threshold?: number
  type?: "chars" | "words" | "lines"
}

export function TextAnimation({
  children,
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03,
  className = "",
  once = true,
  threshold = 0.1,
  type = "words",
}: TextAnimationProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, threshold })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
      },
    },
  }

  const renderContent = () => {
    if (typeof children !== "string") {
      return <motion.div variants={childVariants}>{children}</motion.div>
    }

    const text = children as string
    let items: string[] = []

    switch (type) {
      case "chars":
        items = text.split("")
        break
      case "words":
        items = text.split(" ")
        break
      case "lines":
        items = text.split("\n")
        break
      default:
        items = text.split(" ")
    }

    return items.map((item, i) => (
      <motion.span
        key={i}
        variants={childVariants}
        className="inline-block"
        style={{ whiteSpace: type === "chars" ? "pre" : "normal" }}
      >
        {item}
        {type === "words" && i !== items.length - 1 ? " " : ""}
      </motion.span>
    ))
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants} className={className}>
      {renderContent()}
    </motion.div>
  )
}

