"use client"

import React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface StaggerChildrenProps {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
  once?: boolean
  threshold?: number
}

export function StaggerChildren({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
  once = true,
  threshold = 0.1,
}: StaggerChildrenProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, threshold })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants} className={className}>
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  )
}

