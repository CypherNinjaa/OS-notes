"use client"

import { useState, useEffect, useRef } from "react"
import DemoContainer from "./demo-container"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

type PageReplacementAlgorithm = "fifo" | "lru" | "optimal" | "clock"

interface MemoryFrame {
  pageId: number | null
  loadTime: number
  lastUsedTime: number
  referenceBit?: boolean
}

export default function PageReplacementDemo() {
  const [algorithm, setAlgorithm] = useState<PageReplacementAlgorithm>("fifo")
  const [frameCount, setFrameCount] = useState(3)
  const [referenceString, setReferenceString] = useState("1,2,3,4,1,2,5,1,2,3,4,5")
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [frames, setFrames] = useState<MemoryFrame[]>([])
  const [pageRequests, setPageRequests] = useState<number[]>([])
  const [pageFaults, setPageFaults] = useState(0)
  const [pageHits, setPageHits] = useState(0)
  const [clockPointer, setClockPointer] = useState(0)
  const [showFutureReferences, setShowFutureReferences] = useState(false)

  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Initialize the simulation
  useEffect(() => {
    resetSimulation()
  }, [frameCount, referenceString, algorithm])

  const resetSimulation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Parse the reference string
    const requests = referenceString
      .split(",")
      .map((s) => Number.parseInt(s.trim()))
      .filter((n) => !isNaN(n))

    // Initialize frames
    const initialFrames: MemoryFrame[] = Array(frameCount)
      .fill(null)
      .map(() => ({
        pageId: null,
        loadTime: 0,
        lastUsedTime: 0,
        referenceBit: false,
      }))

    setFrames(initialFrames)
    setPageRequests(requests)
    setCurrentStep(0)
    setPageFaults(0)
    setPageHits(0)
    setClockPointer(0)
    setIsRunning(false)
    lastTimeRef.current = 0
  }

  const findFrameToReplace = (currentRequest: number): number => {
    // Check if there's an empty frame
    const emptyFrameIndex = frames.findIndex((frame) => frame.pageId === null)
    if (emptyFrameIndex !== -1) return emptyFrameIndex

    switch (algorithm) {
      case "fifo":
        // Find the oldest frame (lowest load time)
        return frames.reduce((oldest, frame, index, arr) => (frame.loadTime < arr[oldest].loadTime ? index : oldest), 0)

      case "lru":
        // Find the least recently used frame (lowest last used time)
        return frames.reduce((lru, frame, index, arr) => (frame.lastUsedTime < arr[lru].lastUsedTime ? index : lru), 0)

      case "optimal": {
        // Find the page that won't be used for the longest time in the future
        const futureRequests = pageRequests.slice(currentStep + 1)

        // For each frame, find when its page will be referenced next
        const nextUse = frames.map((frame) => {
          if (frame.pageId === null) return Number.POSITIVE_INFINITY
          const nextIndex = futureRequests.indexOf(frame.pageId)
          return nextIndex === -1 ? Number.POSITIVE_INFINITY : nextIndex
        })

        // Return the index of the frame with the highest next use value
        return nextUse.reduce((optimal, next, index, arr) => (next > arr[optimal] ? index : optimal), 0)
      }

      case "clock": {
        // Clock algorithm (second chance)
        let pointer = clockPointer

        // Keep moving the pointer until we find a frame with reference bit = 0
        while (frames[pointer].referenceBit) {
          frames[pointer].referenceBit = false
          pointer = (pointer + 1) % frameCount
        }

        // Update the clock pointer for next time
        setClockPointer((pointer + 1) % frameCount)
        return pointer
      }

      default:
        return 0
    }
  }

  const updateSimulation = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp
    }

    const deltaTime = timestamp - lastTimeRef.current
    if (deltaTime >= 1000 / speed) {
      lastTimeRef.current = timestamp

      if (currentStep < pageRequests.length) {
        const currentRequest = pageRequests[currentStep]

        // Check if the page is already in memory
        const frameIndex = frames.findIndex((frame) => frame.pageId === currentRequest)

        if (frameIndex !== -1) {
          // Page hit
          setPageHits((prev) => prev + 1)

          // Update last used time for LRU
          if (algorithm === "lru") {
            setFrames((prevFrames) =>
              prevFrames.map((frame, index) =>
                index === frameIndex ? { ...frame, lastUsedTime: currentStep } : frame,
              ),
            )
          }

          // Set reference bit for Clock
          if (algorithm === "clock") {
            setFrames((prevFrames) =>
              prevFrames.map((frame, index) => (index === frameIndex ? { ...frame, referenceBit: true } : frame)),
            )
          }
        } else {
          // Page fault
          setPageFaults((prev) => prev + 1)

          // Find the frame to replace
          const replaceIndex = findFrameToReplace(currentRequest)

          // Replace the page
          setFrames((prevFrames) =>
            prevFrames.map((frame, index) =>
              index === replaceIndex
                ? {
                    pageId: currentRequest,
                    loadTime: currentStep,
                    lastUsedTime: currentStep,
                    referenceBit: true,
                  }
                : frame,
            ),
          )
        }

        // Move to the next step
        setCurrentStep((prev) => prev + 1)
      } else {
        // Simulation complete
        setIsRunning(false)
      }
    }

    if (isRunning && currentStep < pageRequests.length) {
      animationRef.current = requestAnimationFrame(updateSimulation)
    }
  }

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(updateSimulation)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRunning, algorithm, frames, currentStep, pageRequests, speed])

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  const stepForward = () => {
    if (currentStep < pageRequests.length) {
      updateSimulation(performance.now())
    }
  }

  const controls = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Page Replacement Algorithm</Label>
          <RadioGroup value={algorithm} onValueChange={(value) => setAlgorithm(value as PageReplacementAlgorithm)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fifo" id="fifo" />
              <Label htmlFor="fifo">First-In-First-Out (FIFO)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lru" id="lru" />
              <Label htmlFor="lru">Least Recently Used (LRU)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="optimal" id="optimal" />
              <Label htmlFor="optimal">Optimal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clock" id="clock" />
              <Label htmlFor="clock">Clock (Second Chance)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Number of Frames: {frameCount}</Label>
            </div>
            <Slider value={[frameCount]} min={1} max={7} step={1} onValueChange={(value) => setFrameCount(value[0])} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Simulation Speed: {speed}x</Label>
            </div>
            <Slider value={[speed]} min={0.5} max={5} step={0.5} onValueChange={(value) => setSpeed(value[0])} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referenceString">Reference String (comma-separated page numbers)</Label>
        <Input
          id="referenceString"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
          placeholder="1,2,3,4,1,2,5,1,2,3,4,5"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showFuture"
          checked={showFutureReferences}
          onCheckedChange={(checked) => setShowFutureReferences(!!checked)}
        />
        <Label htmlFor="showFuture">Show future references (for Optimal algorithm)</Label>
      </div>
    </div>
  )

  const explanation = (
    <div className="space-y-4">
      <p>
        This demonstration visualizes different page replacement algorithms used in virtual memory systems. Each row
        represents a frame in physical memory, and the sequence at the top represents the page reference string.
      </p>

      <div className="space-y-2">
        <h4 className="font-medium">Algorithms:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>First-In-First-Out (FIFO):</strong> Replaces the page that has been in memory the longest. Simple
            but can suffer from Belady's anomaly.
          </li>
          <li>
            <strong>Least Recently Used (LRU):</strong> Replaces the page that has not been used for the longest period
            of time. Performs well but can be expensive to implement.
          </li>
          <li>
            <strong>Optimal:</strong> Replaces the page that will not be used for the longest period of time in the
            future. Provides the best possible page-fault rate but requires future knowledge.
          </li>
          <li>
            <strong>Clock (Second Chance):</strong> An approximation of LRU that uses a reference bit and a circular
            list of pages. More efficient to implement than LRU.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Performance Metrics:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Page Faults:</strong> Occurs when a requested page is not found in memory and must be loaded from
            disk.
          </li>
          <li>
            <strong>Page Fault Rate:</strong> The ratio of page faults to total page references.
          </li>
        </ul>
      </div>

      {currentStep > 0 && (
        <div className="bg-muted p-3 rounded-md">
          <h4 className="font-medium">Results:</h4>
          <p>Page Faults: {pageFaults}</p>
          <p>Page Hits: {pageHits}</p>
          <p>Page Fault Rate: {((pageFaults / currentStep) * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  )

  // Get the current page request
  const currentRequest = currentStep < pageRequests.length ? pageRequests[currentStep] : null

  // Calculate future references for Optimal algorithm
  const getFutureReferences = (pageId: number) => {
    if (!showFutureReferences || algorithm !== "optimal" || currentStep >= pageRequests.length) return null

    const futureRequests = pageRequests.slice(currentStep)
    const nextIndex = futureRequests.indexOf(pageId)
    return nextIndex === -1 ? "∞" : nextIndex
  }

  return (
    <DemoContainer
      title="Page Replacement Algorithms"
      description="Visualize how different page replacement algorithms manage memory frames"
      controls={controls}
      explanation={explanation}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">
              Current Step: {currentStep}/{pageRequests.length}
            </span>
            <span className="text-sm ml-4">
              Page Faults: {pageFaults} | Page Hits: {pageHits}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={stepForward} disabled={currentStep >= pageRequests.length}>
              Step
            </Button>
            <Badge variant={isRunning ? "default" : "outline"}>{isRunning ? "Running" : "Paused"}</Badge>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-2">Reference String</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {pageRequests.map((page, index) => (
              <div
                key={`request-${index}`}
                className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground border-primary"
                    : index < currentStep
                      ? "bg-muted"
                      : ""
                }`}
              >
                {page}
              </div>
            ))}
          </div>

          <h3 className="text-sm font-medium mb-2">Memory Frames</h3>
          <div className="space-y-2">
            {frames.map((frame, frameIndex) => (
              <div
                key={`frame-${frameIndex}`}
                className={`flex items-center h-12 border rounded-md ${
                  algorithm === "clock" && frameIndex === clockPointer ? "border-primary" : ""
                }`}
              >
                <div className="w-8 flex-shrink-0 h-full flex items-center justify-center border-r bg-muted">
                  {frameIndex}
                </div>
                {frame.pageId !== null ? (
                  <div className="flex-1 flex items-center justify-between px-4">
                    <div className="flex items-center">
                      <span className="text-lg font-medium">Page {frame.pageId}</span>
                      {algorithm === "clock" && (
                        <Badge variant={frame.referenceBit ? "default" : "outline"} className="ml-2">
                          R: {frame.referenceBit ? "1" : "0"}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {algorithm === "fifo" && `Loaded at step: ${frame.loadTime}`}
                      {algorithm === "lru" && `Last used at step: ${frame.lastUsedTime}`}
                      {algorithm === "optimal" && showFutureReferences && (
                        <span>Next use in: {getFutureReferences(frame.pageId)} steps</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">Empty</div>
                )}
              </div>
            ))}
          </div>

          {currentRequest !== null && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <div className="flex items-center">
                <span className="font-medium">Current Request: Page {currentRequest}</span>
                {frames.some((frame) => frame.pageId === currentRequest) ? (
                  <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                    Page Hit
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                    Page Fault
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DemoContainer>
  )
}
