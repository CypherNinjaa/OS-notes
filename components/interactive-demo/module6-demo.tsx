"use client"

import * as React from "react"
import DemoContainer from "./demo-container"

export default function Module6Demo() {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [cwd] = React.useState("/home/student");

  function handleCommand(cmd: string) {
    let output = "";
    const trimmed = cmd.trim();
    if (!trimmed) return;
    if (trimmed === "help") {
      output = "Available commands: echo, ls, pwd, help, clear";
    } else if (trimmed.startsWith("echo ")) {
      output = trimmed.slice(5);
    } else if (trimmed === "ls") {
      output = "file1.txt  file2.sh  notes.md";
    } else if (trimmed === "pwd") {
      output = cwd;
    } else if (trimmed === "clear") {
      setHistory([]);
      return;
    } else {
      output = `Command not found: ${trimmed}`;
    }
    setHistory((h) => [...h, `$ ${trimmed}`, output]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  }

  return (
    <DemoContainer
      title="Shell & Scripting Interactive Demo"
      description="Experiment with shell commands and scripting basics."
      explanation={
        <div>
          Try out basic shell commands below. Supported: <code>echo</code>, <code>ls</code>, <code>pwd</code>, <code>help</code>, <code>clear</code>.<br />
          This is a simulated shell for learning purposes.
        </div>
      }
    >
      <div className="bg-black text-green-300 font-mono rounded p-4 min-h-[220px] max-w-2xl mx-auto">
        {history.length === 0 && <div className="text-gray-500">Type 'help' to see available commands.</div>}
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="mr-2">$</span>
          <input
            className="flex-1 bg-transparent border-none outline-none text-green-200"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
            aria-label="Shell input"
          />
        </form>
      </div>
    </DemoContainer>
  );
}
