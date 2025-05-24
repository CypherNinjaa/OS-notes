"use client"

import { useState } from "react"
import DemoContainer from "./demo-container"

const states = [
  { id: "new", name: "New", color: "blue" },
  { id: "ready", name: "Ready", color: "green" },
  { id: "running", name: "Running", color: "purple" },
  { id: "waiting", name: "Waiting", color: "orange" },
  { id: "terminated", name: "Terminated", color: "red" },
]

const transitions = [
  { from: "new", to: "ready", label: "Admit" },
  { from: "ready", to: "running", label: "Dispatch" },
  { from: "running", to: "waiting", label: "I/O or Event Wait" },
  { from: "waiting", to: "ready", label: "I/O or Event Complete" },
  { from: "running", to: "terminated", label: "Exit" },
  { from: "running", to: "ready", label: "Interrupt" },
]

export default function Module2Demo() {
  const [current, setCurrent] = useState("new")
  const available = transitions.filter((t) => t.from === current)
  const stateObj = states.find((s) => s.id === current)

  return (
    <DemoContainer
      title="Process State Simulator"
      description="Step through process states and see transitions in a diagram."
      explanation={
        <div></div>
          <strong>How to use:</strong> Click a transition to move the process to the next state. This demo helps you visualize process state changes interactively.
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className={`px-6 py-3 rounded border-2 bg-${stateObj?.color}-50 border-${stateObj?.color}-300 text-lg font-bold text-${stateObj?.color}-800`}>{stateObj?.name}</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {available.map((t) => (
            <button
              key={t.to}
              className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/80 transition"
              onClick={() => setCurrent(t.to)}
            >
              {t.label} → {states.find((s) => s.id === t.to)?.name}
            </button>
          ))}
        </div>
      </div>
      <div className="text-center text-muted-foreground text-sm">Current state: <span className="font-semibold">{stateObj?.name}</span></div>
    </DemoContainer>
  )
}
