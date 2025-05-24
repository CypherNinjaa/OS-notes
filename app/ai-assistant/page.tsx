"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Send, Loader2 } from "lucide-react"
import { generateGroqResponse } from "@/app/actions/groq-actions"

export default function AIAssistant() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; content: string }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setConversation((prev) => [...prev, { role: "user", content: query }])

    try {
      const response = await generateGroqResponse(query)

      setResponse(response)
      setConversation((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error generating response:", error)
      setResponse("Sorry, I encountered an error while generating a response. Please try again.")
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error while generating a response. Please try again." },
      ])
    } finally {
      setIsLoading(false)
      setQuery("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-primary" /> AI Study Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about operating systems concepts, request explanations, or get help with shell scripting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p>This AI assistant can help you with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Explaining complex operating system concepts</li>
                <li>Providing examples and analogies</li>
                <li>Generating practice questions</li>
                <li>Debugging shell scripts</li>
                <li>Creating diagrams and visualizations (described textually)</li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium mb-2">Example questions you can ask:</p>
              <ul className="space-y-1 text-sm">
                <li>"Explain the difference between preemptive and non-preemptive scheduling"</li>
                <li>"How does virtual memory work?"</li>
                <li>"What are the necessary conditions for deadlock?"</li>
                <li>"Give me a shell script example that counts files in a directory"</li>
                <li>"Create a practice quiz on process synchronization"</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-6">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === "user" ? "bg-primary text-primary-foreground ml-12" : "bg-muted mr-12"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Textarea
                  placeholder="Ask a question about operating systems..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !query.trim()}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Response...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Question
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
