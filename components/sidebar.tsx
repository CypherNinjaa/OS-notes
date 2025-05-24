"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from "lucide-react"

const moduleTopics = {
  1: [
    { title: "Introduction to OS", href: "/modules/1#introduction" },
    { title: "OS Functions", href: "/modules/1#functions" },
    { title: "OS Classification", href: "/modules/1#classification" },
    { title: "OS Structure", href: "/modules/1#structure" },
    { title: "System Components", href: "/modules/1#components" },
    { title: "OS Services", href: "/modules/1#services" },
    { title: "Kernels", href: "/modules/1#kernels" },
  ],
  2: [
    { title: "Process Concept", href: "/modules/2#process-concept" },
    { title: "Process States", href: "/modules/2#process-states" },
    { title: "Process Synchronization", href: "/modules/2#synchronization" },
    { title: "Critical Section", href: "/modules/2#critical-section" },
    { title: "Mutual Exclusion", href: "/modules/2#mutual-exclusion" },
    { title: "Classical Problems", href: "/modules/2#classical-problems" },
    { title: "Process Scheduling", href: "/modules/2#scheduling" },
    { title: "IPC", href: "/modules/2#ipc" },
    { title: "Threads", href: "/modules/2#threads" },
    { title: "Security Issues", href: "/modules/2#security" },
  ],
  3: [
    { title: "Scheduling Concepts", href: "/modules/3#concepts" },
    { title: "Scheduling Techniques", href: "/modules/3#techniques" },
    { title: "Preemptive Scheduling", href: "/modules/3#preemptive" },
    { title: "Non-Preemptive Scheduling", href: "/modules/3#non-preemptive" },
    { title: "Scheduling Algorithms", href: "/modules/3#algorithms" },
    { title: "Deadlock", href: "/modules/3#deadlock" },
    { title: "Deadlock Prevention", href: "/modules/3#prevention" },
    { title: "Deadlock Avoidance", href: "/modules/3#avoidance" },
    { title: "Deadlock Detection", href: "/modules/3#detection" },
    { title: "Recovery", href: "/modules/3#recovery" },
  ],
  4: [
    { title: "Memory Partition", href: "/modules/4#partition" },
    { title: "Memory Management", href: "/modules/4#management" },
    { title: "Paging", href: "/modules/4#paging" },
    { title: "Segmentation", href: "/modules/4#segmentation" },
    { title: "Virtual Memory", href: "/modules/4#virtual-memory" },
    { title: "Demand Paging", href: "/modules/4#demand-paging" },
    { title: "Page Replacement", href: "/modules/4#page-replacement" },
    { title: "FIFO Algorithm", href: "/modules/4#fifo" },
    { title: "LRU Algorithm", href: "/modules/4#lru" },
    { title: "Optimal Algorithm", href: "/modules/4#optimal" },
  ],
  5: [
    { title: "Types of Files", href: "/modules/5#file-types" },
    { title: "File Access Methods", href: "/modules/5#access-methods" },
    { title: "File Allocation Methods", href: "/modules/5#allocation-methods" },
    { title: "Contiguous Allocation", href: "/modules/5#contiguous" },
    { title: "Linked Allocation", href: "/modules/5#linked" },
    { title: "Index Allocation", href: "/modules/5#index" },
    { title: "I/O Devices", href: "/modules/5#io-devices" },
    { title: "Device Controllers", href: "/modules/5#controllers" },
    { title: "Device Drivers", href: "/modules/5#drivers" },
    { title: "Directory Structure", href: "/modules/5#directory" },
    { title: "File Protection", href: "/modules/5#protection" },
  ],
  6: [
    { title: "Shell Introduction", href: "/modules/6#shell-intro" },
    { title: "Types of Shell", href: "/modules/6#shell-types" },
    { title: "Linux Editors", href: "/modules/6#editors" },
    { title: "VI Editor Modes", href: "/modules/6#vi-modes" },
    { title: "Shell Scripts", href: "/modules/6#shell-scripts" },
    { title: "Shell Variables", href: "/modules/6#variables" },
    { title: "System Calls", href: "/modules/6#system-calls" },
    { title: "Pipes and Filters", href: "/modules/6#pipes-filters" },
    { title: "Decision Making", href: "/modules/6#decision-making" },
    { title: "Loops in Shell", href: "/modules/6#loops" },
    { title: "Functions", href: "/modules/6#functions" },
    { title: "Utility Programs", href: "/modules/6#utilities" },
    { title: "Pattern Matching", href: "/modules/6#pattern-matching" },
  ],
}

export default function Sidebar() {
  const pathname = usePathname()
  const currentModule = pathname.includes("/modules/") ? Number.parseInt(pathname.split("/modules/")[1]) : null

  if (!currentModule) {
    return null
  }

  const topics = moduleTopics[currentModule as keyof typeof moduleTopics] || []

  return (
    <div className="hidden md:block w-64 border-r h-[calc(100vh-4rem)] fixed top-16 left-0 bg-background">
      <ScrollArea className="h-full py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold mb-2">Module {currentModule}</h2>
          <div className="space-y-1">
            {topics.map((topic, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left text-sm",
                  pathname + location.hash === topic.href && "bg-muted",
                )}
                asChild
              >
                <Link href={topic.href}>
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {topic.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
