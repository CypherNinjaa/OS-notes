"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, BookOpen, Moon, Sun, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState } from "react"

export default function Navbar() {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl hidden md:inline-block">OS Study Guide</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((moduleNum) => (
              <Link
                key={moduleNum}
                href={`/modules/${moduleNum}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === `/modules/${moduleNum}` ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Module {moduleNum}
              </Link>
            ))}
            <Link
              href="/ai-assistant"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                pathname === "/ai-assistant" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Brain className="mr-1 h-4 w-4" /> AI Assistant
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {Array.from({ length: 6 }, (_, i) => i + 1).map((moduleNum) => (
                <Link
                  key={moduleNum}
                  href={`/modules/${moduleNum}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === `/modules/${moduleNum}` ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Module {moduleNum}
                </Link>
              ))}
              <Link
                href="/ai-assistant"
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                  pathname === "/ai-assistant" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Brain className="mr-1 h-4 w-4" /> AI Assistant
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
