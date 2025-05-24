import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import Sidebar from "@/components/sidebar"

interface ModuleLayoutProps {
  children: ReactNode
  title: string
  description: string
  moduleNumber: number
}

export default function ModuleLayout({ children, title, description, moduleNumber }: ModuleLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">{children}</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
