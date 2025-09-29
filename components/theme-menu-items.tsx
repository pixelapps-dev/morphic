'use client'

import { useTheme } from 'next-themes'

import { Droplets, Laptop, Moon, Sun, Trees, Zap } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function ThemeMenuItems() {
  const { setTheme } = useTheme()

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        <Sun className="mr-2 h-4 w-4" />
        <span>Light</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>
        <Moon className="mr-2 h-4 w-4" />
        <span>Dark</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('theme-ocean')}>
        <Droplets className="mr-2 h-4 w-4" />
        <span>Ocean</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('theme-forest')}>
        <Trees className="mr-2 h-4 w-4" />
        <span>Forest</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('theme-midnight')}>
        <Zap className="mr-2 h-4 w-4" />
        <span>Midnight</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        <Laptop className="mr-2 h-4 w-4" />
        <span>System</span>
      </DropdownMenuItem>
    </>
  )
}
