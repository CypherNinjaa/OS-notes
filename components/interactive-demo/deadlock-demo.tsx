"use client"

import { useState, useEffect, useRef } from "react"
import DemoContainer from "./demo-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, MinusIcon, ArrowRightIcon } from "lucide-react"

interface Process {
  id: number
  allocation: number[]
  max: number[]
  need: number[]
  finished: boolean
}

export default function DeadlockDemo() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [available, setAvailable] = useState<number[]>([])
  const [resourceCount, setResourceCount] = useState(3)
  const [processCount, setProcessCount] = useState(5)
  const [activeTab, setActiveTab] = useState("banker")
  const [detectionResult, setDetectionResult] = useState<{
    deadlocked: boolean
    deadlockedProcesses: number[]
  }>({ deadlocked: false, deadlockedProcesses: [] })
  const [safetyResult, setSafetyResult] = useState<{
    safe: boolean
    sequence: number[]
  }>({ safe: false, sequence: [] })
  const [requestingProcess, setRequestingProcess] = useState(0)
  const [requestResources, setRequestResources] = useState<number[]>([])
  const [step, setStep] = useState(0)
  const [executionSequence, setExecutionSequence] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Initialize the simulation
  useEffect(() => {
    resetSimulation()
  }, [resourceCount, processCount, activeTab])

  const resetSimulation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    // Generate random processes and resource allocations
    const newProcesses: Process[] = []
    const totalResources = Array(resourceCount)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10) + 10)
    let remainingResources = [...totalResources]

    for (let i = 0; i < processCount; i++) {
      // Generate random allocation (but ensure we don't allocate more than available)
      const allocation = remainingResources.map((remaining) => {
        const allocated = Math.floor(Math.random() * (remaining + 1))
        return allocated
      })

      // Update remaining resources
      remainingResources = remainingResources.map((remaining, idx) => remaining - allocation[idx])

      // Generate random max (but ensure max >= allocation)
      const max = allocation.map((allocated, idx) => {
        const additional = Math.floor(Math.random() * 5)
        return allocated + additional
      })

      // Calculate need
      const need = max.map((m, idx) => m - allocation[idx])

      newProcesses.push({
        id: i,
        allocation,
        max,
        need,
        finished: false,
      })
    }

    setProcesses(newProcesses)
    setAvailable(remainingResources)
    setRequestResources(Array(resourceCount).fill(0))
    setDetectionResult({ deadlocked: false, deadlockedProcesses: [] })
    setSafetyResult({ safe: false, sequence: [] })
    setStep(0)
    setExecutionSequence([])
    setIsRunning(false)
    lastTimeRef.current = 0

    // Run initial safety check for Banker's Algorithm
    if (activeTab === "banker") {
      checkSystemSafety(newProcesses, remainingResources)
    }
  }

  // Check if the system is in a safe state (Banker's Algorithm)
  const checkSystemSafety = (currentProcesses = processes, currentAvailable = available) => {
    const work = [...currentAvailable]
    const finish = currentProcesses.map((p) => p.finished)
    const safeSequence: number[] = []

    let found = true
    while (found) {
      found = false
      for (let i = 0; i < currentProcesses.length; i++) {
        if (!finish[i]) {
          // Check if process i can be satisfied with available resources
          const canAllocate = currentProcesses[i].need.every((need, j) => need <= work[j])

          if (canAllocate) {
            // Process i can complete, add its resources to work
            for (let j = 0; j < work.length; j++) {
              work[j] += currentProcesses[i].allocation[j]
            }
            finish[i] = true
            safeSequence.push(i)
            found = true
          }
        }
      }
    }

    const safe = finish.every((f) => f)
    setSafetyResult({ safe, sequence: safeSequence })
    return { safe, sequence: safeSequence }
  }

  // Detect deadlock using resource allocation graph
  const detectDeadlock = () => {
    // Create a copy of processes for detection
    const currentProcesses = processes.map((p) => ({ ...p, finished: false }))
    const work = [...available]
    const finish = currentProcesses.map(() => false)

    // Mark processes that can finish with available resources
    let found = true
    while (found) {
      found = false
      for (let i = 0; i < currentProcesses.length; i++) {
        if (!finish[i]) {
          // Check if process i can be satisfied with available resources
          const canAllocate = currentProcesses[i].need.every((need, j) => need <= work[j])

          if (canAllocate) {
            // Process i can complete, add its resources to work
            for (let j = 0; j < work.length; j++) {
              work[j] += currentProcesses[i].allocation[j]
            }
            finish[i] = true
            found = true
          }
        }
      }
    }

    // Any process that couldn't finish is deadlocked
    const deadlockedProcesses = finish.map((f, i) => (f ? -1 : i)).filter((i) => i !== -1)

    setDetectionResult({
      deadlocked: deadlockedProcesses.length > 0,
      deadlockedProcesses,
    })
  }

  // Request resources (for Banker's Algorithm)
  const requestResource = () => {
    // Check if request is valid
    const process = processes[requestingProcess]

    // 1. Check if request <= need
    const validRequest = requestResources.every((req, i) => req <= process.need[i])
    if (!validRequest) {
      alert("Error: Process has requested more resources than it needs")
      return
    }

    // 2. Check if request <= available
    const resourcesAvailable = requestResources.every((req, i) => req <= available[i])
    if (!resourcesAvailable) {
      alert("Error: Not enough resources available")
      return
    }

    // 3. Pretend to allocate resources and check if system remains in safe state
    const newProcesses = processes.map((p, i) => {
      if (i === requestingProcess) {
        const newAllocation = p.allocation.map((a, j) => a + requestResources[j])
        const newNeed = p.need.map((n, j) => n - requestResources[j])
        return { ...p, allocation: newAllocation, need: newNeed }
      }
      return p
    })

    const newAvailable = available.map((a, i) => a - requestResources[i])

    const { safe } = checkSystemSafety(newProcesses, newAvailable)

    if (safe) {
      // Grant the request
      setProcesses(newProcesses)
      setAvailable(newAvailable)
      setRequestResources(Array(resourceCount).fill(0))
    } else {
      alert("Request denied: Would lead to unsafe state")
    }
  }

  // Run the simulation step by step
  const runSimulation = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp
    }

    const deltaTime = timestamp - lastTimeRef.current
    if (deltaTime >= 1000) {
      lastTimeRef.current = timestamp

      if (step < safetyResult.sequence.length) {
        const processId = safetyResult.sequence[step]

        // Release resources from the completed process
        const newAvailable = available.map((a, i) => a + processes[processId].allocation[i])

        // Mark process as finished
        const newProcesses = processes.map((p, i) => {
          if (i === processId) {
            return { ...p, finished: true }
          }
          return p
        })

        setProcesses(newProcesses)
        setAvailable(newAvailable)
        setExecutionSequence([...executionSequence, processId])
        setStep(step + 1)
      } else {
        // Simulation complete
        setIsRunning(false)
      }
    }

    if (isRunning && step < safetyResult.sequence.length) {
      animationRef.current = requestAnimationFrame(runSimulation)
    }
  }

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(runSimulation)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRunning, step, safetyResult, processes, available])

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  const stepForward = () => {
    if (step < safetyResult.sequence.length) {
      runSimulation(performance.now())
    }
  }

  const handleRequestChange = (index: number, value: number) => {
    const newRequest = [...requestResources]
    newRequest[index] = Math.max(0, value)
    setRequestResources(newRequest)
  }

  const explanation = (
    <div className="space-y-4">
      <p>
        This demonstration visualizes deadlock detection and avoidance algorithms used in operating systems. It shows
        how resources are allocated to processes and how deadlocks can be detected or avoided.
      </p>

      <div className="space-y-2">
        <h4 className="font-medium">Algorithms:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Banker's Algorithm:</strong> A deadlock avoidance algorithm that ensures the system never enters an
            unsafe state. It works by simulating the allocation of resources and checking if the system remains in a
            safe state.
          </li>
          <li>
            <strong>Deadlock Detection:</strong> Identifies when a deadlock has occurred by checking if there are
            processes that cannot complete due to resource constraints.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Key Concepts:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Allocation:</strong> Resources currently held by each process.
          </li>
          <li>
            <strong>Max:</strong> Maximum resources each process may need.
          </li>
          <li>
            <strong>Need:</strong> Additional resources each process may still request (Max - Allocation).
          </li>
          <li>
            <strong>Available:</strong> Resources not currently allocated to any process.
          </li>
          <li>
            <strong>Safe State:</strong> A state where all processes can complete in some sequence without causing
            deadlock.
          </li>
          <li>
            <strong>Unsafe State:</strong> A state where deadlock may occur (not guaranteed).
          </li>
        </ul>
      </div>

      {activeTab === "banker" && safetyResult.safe && (
        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
          <h4 className="font-medium text-green-800 dark:text-green-300">System is in a safe state</h4>
          <p>Safe sequence: {safetyResult.sequence.map((p) => `P${p}`).join(" → ")}</p>
        </div>
      )}

      {activeTab === "banker" && !safetyResult.safe && (
        <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
          <h4 className="font-medium text-red-800 dark:text-red-300">System is in an unsafe state</h4>
          <p>No safe sequence exists. Deadlock may occur.</p>
        </div>
      )}

      {activeTab === "detection" && detectionResult.deadlocked && (
        <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
          <h4 className="font-medium text-red-800 dark:text-red-300">Deadlock detected</h4>
          <p>Deadlocked processes: {detectionResult.deadlockedProcesses.map((p) => `P${p}`).join(", ")}</p>
        </div>
      )}

      {activeTab === "detection" && !detectionResult.deadlocked && (
        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
          <h4 className="font-medium text-green-800 dark:text-green-300">No deadlock detected</h4>
          <p>All processes can complete with the available resources.</p>
        </div>
      )}
    </div>
  )

  return (
    <DemoContainer
      title="Deadlock Detection and Avoidance"
      description="Visualize how operating systems detect and avoid deadlocks"
      explanation={explanation}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="banker">Banker's Algorithm</TabsTrigger>
          <TabsTrigger value="detection">Deadlock Detection</TabsTrigger>
        </TabsList>
        <TabsContent value="banker" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">Safe State: {safetyResult.safe ? "Yes" : "No"}</span>
              {safetyResult.safe && (
                <span className="text-sm ml-4">
                  Step: {step}/{safetyResult.sequence.length}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {safetyResult.safe && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stepForward}
                    disabled={step >= safetyResult.sequence.length}
                  >
                    Step
                  </Button>
                  <Button
                    variant={isRunning ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSimulation}
                    disabled={step >= safetyResult.sequence.length}
                  >
                    {isRunning ? "Pause" : "Run"}
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" onClick={resetSimulation}>
                Reset
              </Button>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-2">Available Resources</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {available.map((count, index) => (
                <div key={`available-${index}`} className="flex items-center justify-center p-2 bg-muted rounded-md">
                  <span className="font-medium">R{index}:</span>
                  <span className="ml-1">{count}</span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mb-2">Process Resource Allocation</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead>Max</TableHead>
                    <TableHead>Need</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processes.map((process) => (
                    <TableRow key={`process-${process.id}`}>
                      <TableCell>P{process.id}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {process.allocation.map((count, index) => (
                            <Badge
                              key={`alloc-${process.id}-${index}`}
                              variant="outline"
                              className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                            >
                              R{index}: {count}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {process.max.map((count, index) => (
                            <Badge
                              key={`max-${process.id}-${index}`}
                              variant="outline"
                              className="bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                            >
                              R{index}: {count}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {process.need.map((count, index) => (
                            <Badge
                              key={`need-${process.id}-${index}`}
                              variant="outline"
                              className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                            >
                              R{index}: {count}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {process.finished ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                        ) : executionSequence.includes(process.id) ? (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Running</Badge>
                        ) : (
                          <Badge variant="outline">Waiting</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {safetyResult.safe && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Safe Sequence</h3>
                <div className="flex items-center flex-wrap gap-2">
                  {safetyResult.sequence.map((processId, index) => (
                    <div key={`seq-${index}`} className="flex items-center">
                      <div
                        className={`px-3 py-1 rounded-md ${
                          index < step
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : index === step
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                              : "bg-muted"
                        }`}
                      >
                        P{processId}
                      </div>
                      {index < safetyResult.sequence.length - 1 && (
                        <ArrowRightIcon className="mx-1 h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Request Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="requestingProcess" className="text-xs">
                    Process
                  </Label>
                  <select
                    id="requestingProcess"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={requestingProcess}
                    onChange={(e) => setRequestingProcess(Number.parseInt(e.target.value))}
                  >
                    {processes.map((process) => (
                      <option key={`req-process-${process.id}`} value={process.id}>
                        Process {process.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end space-x-2">
                  <Button onClick={requestResource}>Request Resources</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                {requestResources.map((count, index) => (
                  <div key={`req-${index}`} className="space-y-1">
                    <Label className="text-xs">Resource {index}</Label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => handleRequestChange(index, count - 1)}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        value={count}
                        onChange={(e) => handleRequestChange(index, Number.parseInt(e.target.value) || 0)}
                        className="h-8 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => handleRequestChange(index, count + 1)}
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="detection" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">
                Deadlock Detected: {detectionResult.deadlocked ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={detectDeadlock}>
                Detect Deadlock
              </Button>
              <Button variant="outline" size="sm" onClick={resetSimulation}>
                Reset
              </Button>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-2">Available Resources</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {available.map((count, index) => (
                <div key={`available-${index}`} className="flex items-center justify-center p-2 bg-muted rounded-md">
                  <span className="font-medium">R{index}:</span>
                  <span className="ml-1">{count}</span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mb-2">Process Resource Allocation</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead>Max</TableHead>
                    <TableHead>Need</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processes.map((process) => (
                    <TableRow key={`process-${process.id}`}>
                      <TableCell>P{process.id}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {process.allocation.map((count, index) => (
                            <Badge
                              key={`alloc-${process.id}-${index}`}
                              variant="outline"
                              className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                            >
                              R{index}: {count}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {process.max.map((count, index) => (
                            <Badge
                              key={`max-${process.id}-${index}`}
                              variant="outline"
                              className="bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                            >
                              R{index}: {count}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {process.need.map((count, index) => (
                            <Badge
                              key={`need-${process.id}-${index}`}
                              variant="outline"
                              className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                            >
                              R{index}: {count}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {detectionResult.deadlocked && detectionResult.deadlockedProcesses.includes(process.id) ? (
                          <Badge className="bg-red-100 text-red-800 border-red-200">Deadlocked</Badge>
                        ) : (
                          <Badge variant="outline">Running</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {detectionResult.deadlocked && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">Deadlock Information</h3>
                <p className="text-sm text-red-800 dark:text-red-300">
                  Deadlocked processes: {detectionResult.deadlockedProcesses.map((p) => `P${p}`).join(", ")}
                </p>
                <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                  These processes are waiting for resources that are held by other deadlocked processes, creating a
                  circular wait condition.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DemoContainer>
  )
}
