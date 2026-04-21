'use client'
import { ReactNode, useState } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-[11px] text-white bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg whitespace-nowrap shadow-xl z-50 animate-fade-in">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-4 border-transparent border-t-[#1A1A1A]" />
          </div>
        </div>
      )}
    </div>
  )
}
