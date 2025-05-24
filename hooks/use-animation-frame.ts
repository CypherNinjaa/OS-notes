"use client"

import { useRef, useEffect, useState } from "react"

interface AnimationFrameOptions {
  fps?: number
  onFrame?: (deltaTime: number) => void
  autoStart?: boolean
}

export function useAnimationFrame({ fps = 60, onFrame, autoStart = false }: AnimationFrameOptions = {}) {
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number>(0)
  const [isRunning, setIsRunning] = useState(autoStart)

  const animate = (time: number) => {
    if (previousTimeRef.current === 0) {
      previousTimeRef.current = time
    }

    const deltaTime = time - previousTimeRef.current
    const interval = 1000 / fps

    if (deltaTime >= interval) {
      onFrame?.(deltaTime)
      previousTimeRef.current = time - (deltaTime % interval)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  const start = () => {
    if (!isRunning) {
      setIsRunning(true)
      previousTimeRef.current = 0
      requestRef.current = requestAnimationFrame(animate)
    }
  }

  const stop = () => {
    if (isRunning && requestRef.current) {
      cancelAnimationFrame(requestRef.current)
      requestRef.current = null
      setIsRunning(false)
    }
  }

  const toggle = () => {
    if (isRunning) {
      stop()
    } else {
      start()
    }
  }

  const reset = () => {
    stop()
    previousTimeRef.current = 0
  }

  useEffect(() => {
    if (autoStart) {
      start()
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return { isRunning, start, stop, toggle, reset }
}
