'use client'
import { Zap, Github, ExternalLink } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5C29] to-[#FF8C5A] shadow-lg shadow-[#FF5C29]/20">
            <Zap size={16} className="text-white" fill="white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[15px] font-bold text-white tracking-tight">
              Growth Lever Simulator
            </span>
            <div className="relative">
              <span className="rounded-full bg-[#FF5C2915] px-2.5 py-0.5 text-[10px] font-semibold text-[#FF5C29] border border-[#FF5C2930] tracking-wider">
                BETA
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#111] border border-[#1E1E1E] px-3 py-1.5">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </div>
            <span className="text-[11px] text-[#666] font-medium">Live Simulation</span>
          </div>
          <div className="h-4 w-px bg-[#1E1E1E] hidden sm:block" />
          <span className="text-[11px] text-[#444] hidden sm:block">by Scaler AI Labs</span>
        </div>
      </div>
    </header>
  )
}
