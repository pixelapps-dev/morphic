'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 32 32"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-8', className)}
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <circle 
        cx="16" 
        cy="16" 
        r="15" 
        fill="url(#logoGradient)" 
        stroke="currentColor" 
        strokeWidth="0.5"
        strokeOpacity="0.1"
      />
      <circle cx="12" cy="16" r="2.5" fill="white" fillOpacity="0.95" />
      <circle cx="20" cy="16" r="2.5" fill="white" fillOpacity="0.95" />
      <path 
        d="M10 22c2 2 8 2 12 0" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        strokeOpacity="0.8"
        fill="none"
      />
    </svg>
  )
}

export { IconLogo }
