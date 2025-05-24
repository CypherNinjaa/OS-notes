"use client"

import * as React from "react"
import { useState } from "react"
import DemoContainer from "./demo-container"

const allocationMethods = [
	{
		id: "contiguous",
		name: "Contiguous Allocation",
		description:
			"Files are stored as contiguous blocks on disk. Simple but leads to fragmentation.",
		blocks: [1, 2, 3, 4],
		color: "blue",
	},
	{
		id: "linked",
		name: "Linked Allocation",
		description:
			"Each file block contains a pointer to the next block. Eliminates external fragmentation.",
		blocks: [5, 9, 14, 20],
		color: "green",
	},
	{
		id: "indexed",
		name: "Indexed Allocation",
		description:
			"All pointers to blocks are stored in an index block. Supports direct access.",
		blocks: [7, 12, 18, 25],
		color: "purple",
	},
]

const TOTAL_BLOCKS = 30

function getBlockColor(
	method: typeof allocationMethods[number] | undefined,
	block: number
) {
	if (!method) return "bg-gray-100 border-gray-300 text-gray-400"
	if (method.blocks.includes(block)) {
		return `bg-${method.color}-400 border-${method.color}-600 text-white animate-pulse`
	}
	return "bg-gray-100 border-gray-300 text-gray-400"
}

function getDirectoryTable(method: typeof allocationMethods[number] | undefined) {
	if (!method) return null
	if (method.id === "contiguous") {
		return (
			<table className="w-full text-sm mt-2 border">
				<thead>
					<tr className="bg-blue-100">
						<th className="border px-2 py-1">File</th>
						<th className="border px-2 py-1">Start Block</th>
						<th className="border px-2 py-1">Length</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border px-2 py-1">{method.id}-file.txt</td>
						<td className="border px-2 py-1">{method.blocks[0]}</td>
						<td className="border px-2 py-1">{method.blocks.length}</td>
					</tr>
				</tbody>
			</table>
		)
	}
	if (method.id === "linked") {
		return (
			<table className="w-full text-sm mt-2 border">
				<thead>
					<tr className="bg-green-100">
						<th className="border px-2 py-1">File</th>
						<th className="border px-2 py-1">Start Block</th>
						<th className="border px-2 py-1">Pointers</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border px-2 py-1">{method.id}-file.txt</td>
						<td className="border px-2 py-1">{method.blocks[0]}</td>
						<td className="border px-2 py-1">
							{method.blocks.slice(1).join(" → ")}
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
	if (method.id === "indexed") {
		return (
			<table className="w-full text-sm mt-2 border">
				<thead>
					<tr className="bg-purple-100">
						<th className="border px-2 py-1">File</th>
						<th className="border px-2 py-1">Index Block</th>
						<th className="border px-2 py-1">Data Blocks</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border px-2 py-1">{method.id}-file.txt</td>
						<td className="border px-2 py-1">{method.blocks[0]}</td>
						<td className="border px-2 py-1">
							{method.blocks.slice(1).join(", ")}
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
	return null
}

export default function Module5Demo() {
	const [selected, setSelected] = useState("contiguous")
	const current = allocationMethods.find((m) => m.id === selected)

	return (
		<DemoContainer
			title="File Allocation & Directory Structure Explorer"
			description="Select a file allocation method to see how files are stored on disk."
			explanation={
				<div>
					<strong>How to use:</strong> Choose an allocation method to visualize
					how file blocks are organized. This demo helps you compare file system
					strategies interactively.
					<br />
					<span className="block mt-2">
						Below, the{" "}
						<span className="font-semibold">disk blocks</span> are shown. Colored
						blocks represent the file's allocation for the selected method.
					</span>
				</div>
			}
		>
			<div className="flex flex-wrap gap-4 justify-center mb-6">
				{allocationMethods.map((method) => (
					<button
						key={method.id}
						className={`px-4 py-2 rounded font-medium border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
							selected === method.id
								? `bg-${method.color}-500 text-white border-${method.color}-600`
								: `bg-white border-${method.color}-300 text-${method.color}-700 hover:bg-${method.color}-50`
						}`}
						onClick={() => setSelected(method.id)}
						aria-pressed={selected === method.id}
					>
						{method.name}
					</button>
				))}
			</div>
			{/* Disk Visualization */}
			<div className="mb-6">
				<div className="mb-2 font-semibold">
					Disk Blocks (0-{TOTAL_BLOCKS - 1}):
				</div>
				<div className="grid grid-cols-10 gap-1 max-w-xl mx-auto">
					{Array.from({ length: TOTAL_BLOCKS }, (_, i) => (
						<div
							key={i}
							className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-bold ${getBlockColor(
								current,
								i + 1
							)}`}
							title={`Block ${i + 1}`}
						>
							{i + 1}
						</div>
					))}
				</div>
				<div className="flex gap-4 mt-2 justify-center text-xs">
					<span className="flex items-center gap-1">
						<span className="inline-block w-4 h-4 rounded bg-blue-400 border-blue-600"></span>{" "}
						Contiguous
					</span>
					<span className="flex items-center gap-1">
						<span className="inline-block w-4 h-4 rounded bg-green-400 border-green-600"></span>{" "}
						Linked
					</span>
					<span className="flex items-center gap-1">
						<span className="inline-block w-4 h-4 rounded bg-purple-400 border-purple-600"></span>{" "}
						Indexed
					</span>
					<span className="flex items-center gap-1">
						<span className="inline-block w-4 h-4 rounded bg-gray-100 border-gray-300"></span>{" "}
						Free
					</span>
				</div>
			</div>
			{/* Allocation Details */}
			<div
				className={`p-6 rounded border bg-${current?.color}-50 border-${current?.color}-200 max-w-xl mx-auto`}
			>
				<h3 className="text-xl font-bold mb-2 text-primary">
					{current?.name}
				</h3>
				<p className="mb-2">{current?.description}</p>
				<div className="flex gap-2 items-center justify-center mt-4">
					{current?.blocks.map((block, i) => (
						<div
							key={block}
							className={`w-10 h-10 flex items-center justify-center rounded border-2 font-semibold bg-${current.color}-100 border-${current.color}-400 text-${current.color}-800`}
						>
							{block}
							{i < current.blocks.length - 1 && (
								<span className="mx-1 text-lg">
									{selected === "linked"
										? "→"
										: selected === "indexed"
										? ","
										: ""}
								</span>
							)}
						</div>
					))}
				</div>
				<div className="mt-4 text-sm text-muted-foreground">
					<strong>Directory Example:</strong> <br />
					<span className="font-mono">/root/{selected}-file.txt</span>
					{getDirectoryTable(current)}
				</div>
			</div>
		</DemoContainer>
	)
}
