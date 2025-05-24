"use client"

import { useState, useEffect, useRef } from "react"
import DemoContainer from "./demo-container"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Process {
  id: number
  arrivalTime: number
  burstTime: number
  priority?: number
  color: string
  remainingTime: number
  waitingTime: number
  turnaroundTime: number
  completed: boolean
  startTime?: number
  endTime?: number
}

type SchedulingAlgorithm = "fcfs" | "sjf" | "rr" | "priority"

export default function CPUSchedulingDemo() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>("fcfs")
  const [quantum, setQuantum] = useState(2)
  const [speed, setSpeed] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null)
  const [quantumRemaining, setQuantumRemaining] = useState(0)
  const [nextProcessId, setNextProcessId] = useState(1)
  const [newProcessBurst, setNewProcessBurst] = useState(5)
  const [newProcessPriority, setNewProcessPriority] = useState(1)
  const [results, setResults] = useState<{ avgWaiting: number; avgTurnaround: number }>({
    avgWaiting: 0,
    avgTurnaround: 0,
  })

  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Colors for processes
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ]

  // Initialize with some default processes
  useEffect(() => {
    resetSimulation()
  }, [])

  const resetSimulation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    const initialProcesses: Process[] = [
      {
        id: 1,
        arrivalTime: 0,
        burstTime: 5,
        priority: 3,
        color: colors[0],
        remainingTime: 5,
        waitingTime: 0,
        turnaroundTime: 0,
        completed: false,
      },
      {
        id: 2,
        arrivalTime: 2,
        burstTime: 3,
        priority: 1,
        color: colors[1],
        remainingTime: 3,
        waitingTime: 0,
        turnaroundTime: 0,
        completed: false,
      },
      {
        id: 3,
        arrivalTime: 4,
        burstTime: 8,
        priority: 4,
        color: colors[2],
        remainingTime: 8,
        waitingTime: 0,
        turnaroundTime: 0,
        completed: false,
      },
      {
        id: 4,
        arrivalTime: 6,
        burstTime: 2,
        priority: 2,
        color: colors[3],
        remainingTime: 2,
        waitingTime: 0,
        turnaroundTime: 0,
        completed: false,
      },
    ]

    setProcesses(initialProcesses)
    setCurrentTime(0)
    setIsRunning(false)
    setCurrentProcess(null)
    setQuantumRemaining(0)
    setNextProcessId(5)
    setResults({ avgWaiting: 0, avgTurnaround: 0 })
    lastTimeRef.current = 0
  }

  const addProcess = () => {
    const newProcess: Process = {
      id: nextProcessId,
      arrivalTime: currentTime,
      burstTime: newProcessBurst,
      priority: newProcessPriority,
      color: colors[(nextProcessId - 1) % colors.length],
      remainingTime: newProcessBurst,
      waitingTime: 0,
      turnaroundTime: 0,
      completed: false,
    }

    setProcesses([...processes, newProcess])
    setNextProcessId(nextProcessId + 1)
    setNewProcessBurst(5)
    setNewProcessPriority(1)
  }

  const getNextProcess = (): Process | null => {
    // Filter processes that have arrived and are not completed
    const availableProcesses = processes.filter(
      (p) => p.arrivalTime <= currentTime && !p.completed && p.remainingTime > 0,
    )

    if (availableProcesses.length === 0) return null

    switch (algorithm) {
      case "fcfs":
        // First Come First Serve - sort by arrival time
        return availableProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime)[0]

      case "sjf":
        // Shortest Job First - sort by remaining time
        return availableProcesses.sort((a, b) => a.remainingTime - b.remainingTime)[0]

      case "priority":
        // Priority Scheduling - sort by priority (lower number = higher priority)
        return availableProcesses.sort((a, b) => (a.priority || 999) - (b.priority || 999))[0]

      case "rr":
        // Round Robin - if current process still has quantum, continue with it
        if (currentProcess && !currentProcess.completed && quantumRemaining > 0) {
          return currentProcess
        }

        // Otherwise, get the next process in arrival order
        if (availableProcesses.length > 0) {
          // If current process is still running but quantum expired, move it to the end
          if (currentProcess && !currentProcess.completed) {
            const currentIndex = availableProcesses.findIndex((p) => p.id === currentProcess.id)
            if (currentIndex !== -1) {
              const nextIndex = (currentIndex + 1) % availableProcesses.length
              setQuantumRemaining(quantum)
              return availableProcesses[nextIndex]
            }
          }

          // If no current process or it's completed, start with the first available
          setQuantumRemaining(quantum)
          return availableProcesses[0]
        }
        return null

      default:
        return availableProcesses[0]
    }
  }

  const updateSimulation = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp
    }

    const deltaTime = timestamp - lastTimeRef.current
    if (deltaTime >= 1000 / speed) {
      lastTimeRef.current = timestamp

      // Update current time
      setCurrentTime((prevTime) => prevTime + 1)

      // Get the next process to run if none is running
      if (!currentProcess || currentProcess.completed) {
        const next = getNextProcess()
        setCurrentProcess(next)
        if (algorithm === "rr") {
          setQuantumRemaining(quantum)
        }
      }

      // Update processes
      setProcesses((prevProcesses) => {
        return prevProcesses.map((process) => {
          // If this is the current running process
          if (currentProcess && process.id === currentProcess.id && !process.completed) {
            const newRemainingTime = process.remainingTime - 1
            const isCompleted = newRemainingTime <= 0

            // Update process stats
            return {
              ...process,
              remainingTime: Math.max(0, newRemainingTime),
              completed: isCompleted,
              endTime: isCompleted ? currentTime + 1 : undefined,
              turnaroundTime: isCompleted ? currentTime + 1 - process.arrivalTime : process.turnaroundTime,
            }
          }
          // For waiting processes that have arrived but not completed
          else if (process.arrivalTime <= currentTime && !process.completed) {
            return {
              ...process,
              waitingTime: process.waitingTime + 1,
            }
          }
          return process
        })
      })

      // Update quantum for Round Robin
      if (algorithm === "rr" && currentProcess && !currentProcess.completed) {
        setQuantumRemaining((prev) => {
          const newQuantum = prev - 1
          if (newQuantum <= 0) {
            // Force a new process selection on next frame
            setCurrentProcess(null)
          }
          return newQuantum
        })
      }

      // Calculate results if all processes are completed
      const allCompleted = processes.every((p) => p.completed || p.arrivalTime > currentTime)
      const arrivedProcesses = processes.filter((p) => p.arrivalTime <= currentTime)
      const completedProcesses = processes.filter((p) => p.completed)

      if (arrivedProcesses.length > 0 && arrivedProcesses.length === completedProcesses.length) {
        const totalWaiting = completedProcesses.reduce((sum, p) => sum + p.waitingTime, 0)
        const totalTurnaround = completedProcesses.reduce((sum, p) => sum + p.turnaroundTime, 0)
        const avgWaiting = totalWaiting / completedProcesses.length
        const avgTurnaround = totalTurnaround / completedProcesses.length

        setResults({
          avgWaiting,
          avgTurnaround,
        })

        if (allCompleted) {
          setIsRunning(false)
          return
        }
      }
    }

    if (isRunning) {
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
  }, [isRunning, algorithm, processes, currentProcess, quantum, speed])

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  const controls = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Scheduling Algorithm</Label>
          <RadioGroup value={algorithm} onValueChange={(value) => setAlgorithm(value as SchedulingAlgorithm)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fcfs" id="fcfs" />
              <Label htmlFor="fcfs">First-Come-First-Serve</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sjf" id="sjf" />
              <Label htmlFor="sjf">Shortest Job First</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rr" id="rr" />
              <Label htmlFor="rr">Round Robin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="priority" id="priority" />
              <Label htmlFor="priority">Priority</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          {algorithm === "rr" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Time Quantum: {quantum}</Label>
              </div>
              <Slider value={[quantum]} min={1} max={10} step={1} onValueChange={(value) => setQuantum(value[0])} />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Simulation Speed: {speed}x</Label>
            </div>
            <Slider value={[speed]} min={0.5} max={5} step={0.5} onValueChange={(value) => setSpeed(value[0])} />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <Label className="mb-2 block">Add New Process</Label>
        <div className="flex flex-wrap gap-2">
          <div className="w-24">
            <Label htmlFor="burstTime" className="text-xs">
              Burst Time
            </Label>
            <Input
              id="burstTime"
              type="number"
              min={1}
              max={20}
              value={newProcessBurst}
              onChange={(e) => setNewProcessBurst(Number.parseInt(e.target.value) || 1)}
              className="h-8"
            />
          </div>
          {algorithm === "priority" && (
            <div className="w-24">
              <Label htmlFor="priority" className="text-xs">
                Priority
              </Label>
              <Input
                id="priority"
                type="number"
                min={1}
                max={10}
                value={newProcessPriority}
                onChange={(e) => setNewProcessPriority(Number.parseInt(e.target.value) || 1)}
                className="h-8"
              />
            </div>
          )}
          <Button onClick={addProcess} className="mt-auto" size="sm">
            <PlusIcon className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  )

  const explanation = (
    <div className="space-y-4">
      <p>
        This demonstration visualizes different CPU scheduling algorithms. Each colored block represents a process, and
        the timeline shows which process is running at each time unit.
      </p>

      <div className="space-y-2">
        <h4 className="font-medium">Algorithms:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>First-Come-First-Serve (FCFS):</strong> Processes are executed in the order they arrive. Simple but
            can lead to the convoy effect.
          </li>
          <li>
            <strong>Shortest Job First (SJF):</strong> Selects the process with the smallest execution time. Optimal for
            minimizing average waiting time.
          </li>
          <li>
            <strong>Round Robin (RR):</strong> Each process gets a small unit of CPU time (time quantum), and after this
            time has elapsed, the process is preempted and added to the end of the ready queue.
          </li>
          <li>
            <strong>Priority Scheduling:</strong> Each process is assigned a priority, and the CPU is allocated to the
            process with the highest priority (lower number = higher priority).
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Performance Metrics:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Waiting Time:</strong> Time spent waiting in the ready queue.
          </li>
          <li>
            <strong>Turnaround Time:</strong> Total time from submission to completion.
          </li>
        </ul>
      </div>

      {results.avgWaiting > 0 && (
        <div className="bg-muted p-3 rounded-md">
          <h4 className="font-medium">Results:</h4>
          <p>Average Waiting Time: {results.avgWaiting.toFixed(2)} time units</p>
          <p>Average Turnaround Time: {results.avgTurnaround.toFixed(2)} time units</p>
        </div>
      )}
    </div>
  )

  return (
    <DemoContainer
      title="CPU Scheduling Algorithms"
      description="Visualize how different scheduling algorithms allocate CPU time to processes"
      controls={controls}
      explanation={explanation}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">Current Time: {currentTime}</span>
            {algorithm === "rr" && currentProcess && (
              <span className="text-sm ml-4">Quantum Remaining: {quantumRemaining}</span>
            )}
          </div>
          <div>
            <Badge variant={isRunning ? "default" : "outline"}>{isRunning ? "Running" : "Paused"}</Badge>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Timeline</h3>
            <div className="relative h-10 bg-muted rounded-md overflow-hidden">
              {processes.map((process) => {
                if (!process.startTime && !process.endTime) return null
                const startPos = ((process.startTime || 0) / Math.max(currentTime, 1)) * 100
                const width =
                  (((process.endTime || currentTime) - (process.startTime || 0)) / Math.max(currentTime, 1)) * 100
                return (
                  <div
                    key={`timeline-${process.id}`}
                    className={`absolute h-full ${process.color} flex items-center justify-center text-white text-xs`}
                    style={{
                      left: `${startPos}%`,
                      width: `${width}%`,
                    }}
                  >
                    P{process.id}
                  </div>
                )
              })}
              {currentProcess && !currentProcess.completed && (
                <div
                  className={`absolute h-full ${currentProcess.color} flex items-center justify-center text-white text-xs animate-pulse`}
                  style={{
                    left: `${((currentProcess.startTime || currentTime) / Math.max(currentTime, 1)) * 100}%`,
                    width: `${(1 / Math.max(currentTime, 1)) * 100}%`,
                  }}
                >
                  P{currentProcess.id}
                </div>
              )}
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>0</span>
              <span>{Math.floor(currentTime / 4) * 4}</span>
              <span>{currentTime}</span>
            </div>
          </div>

          <h3 className="text-sm font-medium mb-2">Processes</h3>
          <div className="space-y-2">
            {processes.map((process) => (
              <div key={process.id} className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full ${process.color} flex items-center justify-center text-white text-xs`}
                >
                  {process.id}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>
                      Arrival: {process.arrivalTime} | Burst: {process.burstTime}
                      {algorithm === "priority" && ` | Priority: ${process.priority}`}
                    </span>
                    <span>
                      {process.completed ? "Completed" : process.arrivalTime > currentTime ? "Not Arrived" : "Waiting"}
                    </span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${process.color}`}
                      style={{
                        width: `${((process.burstTime - process.remainingTime) / process.burstTime) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      Progress: {process.burstTime - process.remainingTime}/{process.burstTime}
                    </span>
                    <span>
                      Wait: {process.waitingTime} | Turnaround:{" "}
                      {process.completed ? process.turnaroundTime : currentTime - process.arrivalTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoContainer>
  )
}
