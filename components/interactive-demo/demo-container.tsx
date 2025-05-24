"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon, PlayIcon, PauseIcon, RotateCcwIcon, Settings2Icon } from "lucide-react"

interface DemoContainerProps {
  title: string
  description: string
  children: React.ReactNode
  controls?: React.ReactNode
  explanation?: React.ReactNode
  defaultTab?: string
}

export default function DemoContainer({
  title,
  description,
  children,
  controls,
  explanation,
  defaultTab = "demo",
}: DemoContainerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [showControls, setShowControls] = useState(false)

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    // Additional reset logic will be implemented by child components
  }

  return (
    <Card className="w-full my-8 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSimulation}
              aria-label={isRunning ? "Pause simulation" : "Start simulation"}
            >
              {isRunning ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={resetSimulation} aria-label="Reset simulation">
              <RotateCcwIcon className="h-4 w-4" />
            </Button>
            {controls && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowControls(!showControls)}
                aria-label="Show controls"
                className={showControls ? "bg-muted" : ""}
              >
                <Settings2Icon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {showControls && controls && <div className="p-4 border-b bg-muted/50">{controls}</div>}
        <div className="p-6">{children}</div>
      </CardContent>
      <CardFooter className="block p-0">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none">
            <TabsTrigger value="demo">Demonstration</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
          </TabsList>
          <TabsContent value="demo" className="p-4">
            <p className="text-sm text-muted-foreground">
              This interactive demonstration allows you to visualize and experiment with the concept. Use the controls
              above to start, pause, and reset the simulation.
            </p>
          </TabsContent>
          <TabsContent value="explanation" className="p-4">
            {explanation ? (
              explanation
            ) : (
              <div className="flex items-center text-muted-foreground">
                <InfoIcon className="h-4 w-4 mr-2" />
                <span>Detailed explanation of this concept and how the demonstration works.</span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  )
}
