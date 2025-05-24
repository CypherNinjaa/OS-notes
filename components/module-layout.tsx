"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ModuleSidebar from "./module-sidebar"

interface ModuleLayoutProps {
  moduleNumber: number
  title?: string
  description?: string
  children: React.ReactNode
}

export default function ModuleLayout({ moduleNumber, title, description, children }: ModuleLayoutProps) {
  // Add a client-side flag to prevent SSR issues
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Render title and description if provided */}
      {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
      {description && <p className="text-muted-foreground mb-6">{description}</p>}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Only render the sidebar on the client side */}
        {isClient && <ModuleSidebar moduleNumber={moduleNumber} />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
