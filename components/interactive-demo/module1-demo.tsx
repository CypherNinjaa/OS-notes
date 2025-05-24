"use client"

import { useState } from "react"
import DemoContainer from "./demo-container"

const osTypes = [
	{
		id: "batch",
		name: "Batch Operating System",
		description:
			"Executes jobs without user interaction. Jobs are collected together in a batch and executed in sequence.",
		examples: ["IBM OS/360", "Early UNIX"],
		color: "blue",
	},
	{
		id: "interactive",
		name: "Interactive Operating System",
		description:
			"Provides direct communication between the user and the system with quick response time.",
		examples: ["Windows", "macOS"],
		color: "green",
	},
	{
		id: "timesharing",
		name: "Time-sharing Operating System",
		description:
			"Allows multiple users to share computer resources simultaneously by rapidly switching between tasks.",
		examples: ["UNIX", "Linux"],
		color: "purple",
	},
	{
		id: "realtime",
		name: "Real-time Operating System",
		description:
			"Processes data and events with strict time constraints, guaranteeing response within specific time limits.",
		examples: ["VxWorks", "QNX", "RTLinux"],
		color: "orange",
	},
]

export default function Module1Demo() {
	const [selected, setSelected] = useState("batch")
	const current = osTypes.find((t) => t.id === selected)

	return (
		<DemoContainer
			title="OS Classification Explorer"
			description="Click on each OS type to see its characteristics and real-world examples."
			explanation={
				<div>
					<strong>How to use:</strong> Select an OS type to learn about its features and examples. This demo helps you compare different OS classifications interactively.
					<br />
					<span className="block mt-2">Below, use the color legend and comparison table to quickly understand the differences between OS types.</span>
				</div>
			}
		>
			{/* Color Legend */}
			<div className="flex gap-4 justify-center mb-4 text-xs">
				<span className="flex items-center gap-1"><span className="inline-block w-4 h-4 rounded bg-blue-500"></span> Batch</span>
				<span className="flex items-center gap-1"><span className="inline-block w-4 h-4 rounded bg-green-500"></span> Interactive</span>
				<span className="flex items-center gap-1"><span className="inline-block w-4 h-4 rounded bg-purple-500"></span> Time-sharing</span>
				<span className="flex items-center gap-1"><span className="inline-block w-4 h-4 rounded bg-orange-500"></span> Real-time</span>
			</div>
			<div className="flex flex-wrap gap-4 justify-center mb-6">
				{osTypes.map((type) => (
					<button
						key={type.id}
						className={`px-4 py-2 rounded font-medium border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
							selected === type.id
								? `bg-${type.color}-500 text-white border-${type.color}-600`
								: `bg-white border-${type.color}-300 text-${type.color}-700 hover:bg-${type.color}-50`
						}`}
						onClick={() => setSelected(type.id)}
						aria-pressed={selected === type.id}
					>
						{type.name}
					</button>
				))}
			</div>
			<div className={`p-6 rounded border bg-${current?.color}-50 border-${current?.color}-200 max-w-xl mx-auto`}>
				<h3 className="text-xl font-bold mb-2 text-primary">{current?.name}</h3>
				<p className="mb-2">{current?.description}</p>
				<div>
					<span className="font-semibold">Examples:</span>
					<ul className="list-disc pl-5 mt-1">
						{current?.examples.map((ex) => (
							<li key={ex}>{ex}</li>
						))}
					</ul>
				</div>
			</div>
			{/* Comparison Table */}
			<div className="mt-8 max-w-2xl mx-auto">
				<div className="font-semibold mb-2">OS Types Comparison Table</div>
				<table className="w-full text-xs border">
					<thead>
						<tr className="bg-gray-100">
							<th className="border px-2 py-1">Type</th>
							<th className="border px-2 py-1">Description</th>
							<th className="border px-2 py-1">Examples</th>
						</tr>
					</thead>
					<tbody>
						{osTypes.map((type) => (
							<tr key={type.id} className={`bg-${type.color}-50`}>
								<td className="border px-2 py-1 font-semibold text-${type.color}-700">{type.name}</td>
								<td className="border px-2 py-1">{type.description}</td>
								<td className="border px-2 py-1">{type.examples.join(", ")}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DemoContainer>
	)
}
