"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DiagramState {
  id: string
  name: string
  description: string
  color: string
}

interface InteractiveDiagramProps {
  title: string
  description: string
  states: DiagramState[]
  initialState?: string
}

export default function InteractiveDiagram({ title, description, states, initialState }: InteractiveDiagramProps) {
  const [activeState, setActiveState] = useState(initialState || states[0].id)
  const currentState = states.find((state) => state.id === activeState) || states[0]

  return (
    <Card className="w-full my-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {states.map((state) => (
              <Button
                key={state.id}
                variant={activeState === state.id ? "default" : "outline"}
                onClick={() => setActiveState(state.id)}
              >
                {state.name}
              </Button>
            ))}
          </div>
          <div
            className={`p-4 rounded-md bg-${currentState.color}-100 border border-${currentState.color}-200 dark:bg-${currentState.color}-900/20 dark:border-${currentState.color}-800`}
          >
            <h3 className="text-lg font-medium mb-2">{currentState.name}</h3>
            <p>{currentState.description}</p>
          </div>
        </div>

        <Tabs defaultValue="diagram" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diagram">Diagram</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="diagram" className="p-4 border rounded-md mt-2">
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <div
                className={`p-6 rounded-md bg-${currentState.color}-100 border border-${currentState.color}-200 dark:bg-${currentState.color}-900/20 dark:border-${currentState.color}-800`}
              >
                <div className="text-center font-medium">{currentState.name}</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="p-4 border rounded-md mt-2">
            <h4 className="font-medium mb-2">About {currentState.name}</h4>
            <p className="text-sm text-muted-foreground mb-4">{currentState.description}</p>
            <div className="text-sm">
              <p>Key characteristics:</p>
              <ul className="list-disc pl-5 mt-2">
                {states
                  .filter((s) => s.id !== currentState.id)
                  .map((state) => (
                    <li key={state.id} className="mt-1">
                      Compared to <strong>{state.name}</strong>: Different implementation approach and performance
                      characteristics
                    </li>
                  ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
