"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface ModuleSidebarProps {
  sections: {
    title: string
    id: string
  }[]
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ sections }) => {
  const [activeHash, setActiveHash] = useState<string>("")

  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    // Set initial hash
    setActiveHash(window.location.hash)

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <div className="module-sidebar">
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className={activeHash === `#${section.id}` ? "active" : ""}>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ModuleSidebar
