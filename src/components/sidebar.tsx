"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col gap-4">
          {children}
        </nav>
      </SheetContent>
      
      <div className="hidden md:flex h-full w-[240px] flex-col fixed left-0 top-0 bottom-0 border-r bg-background p-4">
        <nav className="flex flex-col gap-4">
          {children}
        </nav>
      </div>
    </Sheet>
  )
} 