"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ModuleSidebar from "./module-sidebar"

interface ModuleLayoutProps {
  moduleNumber: number
  children: React.ReactNode
}

export default function ModuleLayout({ moduleNumber, children }: ModuleLayoutProps) {
  // Add a client-side flag to prevent SSR issues
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Only render the sidebar on the client side */}
        {isClient && <ModuleSidebar moduleNumber={moduleNumber} />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
