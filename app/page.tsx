import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Cpu, Database, FileText, HardDrive, Terminal, Brain } from "lucide-react"

export default function Home() {
  const modules = [
    {
      number: 1,
      title: "Introduction to Operating Systems",
      description: "Operating system fundamentals, classifications, structures, and services",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      number: 2,
      title: "Process Management",
      description: "Process concepts, states, synchronization, and interprocess communication",
      icon: <Cpu className="h-8 w-8" />,
    },
    {
      number: 3,
      title: "CPU Scheduling",
      description: "Scheduling algorithms, techniques, and deadlock management",
      icon: <HardDrive className="h-8 w-8" />,
    },
    {
      number: 4,
      title: "Memory Management",
      description: "Memory partitioning, paging, segmentation, and virtual memory",
      icon: <Database className="h-8 w-8" />,
    },
    {
      number: 5,
      title: "File and Device Management",
      description: "File systems, allocation methods, I/O devices, and directory structures",
      icon: <FileText className="h-8 w-8" />,
    },
    {
      number: 6,
      title: "Shell Introduction and Shell Scripting",
      description: "Linux shell basics, scripting, variables, and utility programs",
      icon: <Terminal className="h-8 w-8" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Operating Systems Study Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive resource for mastering operating system principles, concepts, and implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>CSIT150 - Principles of Operating Systems</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This study guide covers all aspects of operating system concepts, design principles, and resource
                management techniques. Learn how operating systems function as resource managers and coordinate various
                system components.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/modules/1">Start Studying</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                AI-Powered Learning <Brain className="ml-2 h-5 w-5 text-primary" />
              </CardTitle>
              <CardDescription>Enhanced with Groq AI</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This guide integrates AI capabilities to enhance your learning experience:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Interactive concept explanations</li>
                <li>Dynamic practice questions</li>
                <li>Code examples and analysis</li>
                <li>Personalized learning assistance</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/ai-assistant">Try AI Assistant</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section id="modules" className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Study Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.number} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    Module {module.number}: {module.title}
                  </CardTitle>
                  <div className="text-primary">{module.icon}</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{module.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 pt-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/modules/${module.number}`}>
                    <Code className="mr-2 h-4 w-4" /> Study Module
                  </Link>
                </Button>
                {/* Interactive Demo Button removed */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start learning?</CardTitle>
            <CardDescription>Begin your journey into operating systems</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This comprehensive study guide provides detailed explanations, visual aids, interactive elements, and
              practice questions to help you master operating system concepts.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/modules/1">Start with Module 1</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
