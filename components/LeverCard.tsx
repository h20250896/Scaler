'use client'
import { useState } from 'react'
import { ChevronDown, TrendingUp, Clock, Zap } from 'lucide-react'
import Slider from './ui/Slider'
import Toggle from './ui/Toggle'
import { CategoryBadge } from './ui/Badge'
import { CATEGORY_COLORS } from '@/lib/constants'
import type { GrowthLever } from '@/types'

interface LeverCardProps {
  lever: GrowthLever
  rank?: number
  roiScore?: number
  onUpdate: (id: string, updates: Partial<GrowthLever>) => void
}

export default function LeverCard({ lever, rank, roiScore, onUpdate }: LeverCardProps) {
  const [expanded, setExpanded] = useState(false)
  const catColor = CATEGORY_COLORS[lever.category] ?? '#888'

  return (
    <div
      className={`relative rounded-xl border transition-all duration-200 overflow-hidden
        ${lever.enabled
          ? 'border-[#FF5C2940] bg-[#111111]'
          : 'border-[#242424] bg-[#0E0E0E]'
        }`}
    >
      {lever.enabled && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(135deg, #FF5C2906 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Card Header */}
      <div className="flex items-center gap-3 p-4">
        {/* Rank Badge */}
        {rank && (
          <div
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
            style={{
              background: rank <= 3 ? catColor + '20' : '#1A1A1A',
              color: rank <= 3 ? catColor : '#555',
              border: `1px solid ${rank <= 3 ? catColor + '40' : '#242424'}`,
            }}
          >
            {rank}
          </div>
        )}

        {/* Icon */}
        <span className="text-xl flex-shrink-0">{lever.icon}</span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-[14px] font-semibold text-white">{lever.name}</span>
            <CategoryBadge category={lever.category} />
          </div>
          <p className="mt-0.5 text-[11px] text-[#555555] truncate">{lever.description}</p>
        </div>

        {/* ROI Score */}
        {roiScore !== undefined && (
          <div className="flex flex-col items-end flex-shrink-0 mr-2">
            <span className="text-[10px] text-[#555] uppercase tracking-wider">ROI</span>
            <span className="font-display text-[18px] font-bold" style={{ color: catColor }}>
              {roiScore}
            </span>
          </div>
        )}

        {/* Toggle */}
        <Toggle
          enabled={lever.enabled}
          onChange={v => onUpdate(lever.id, { enabled: v })}
        />

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-[#555] hover:text-white hover:bg-[#1C1C1C] transition-colors"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center gap-4 px-4 pb-3">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={11} className="text-[#555]" />
          <span className="text-[11px] text-[#888]">Impact</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-sm"
                style={{ background: i < lever.impact ? catColor : '#1C1C1C' }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={11} className="text-[#555]" />
          <span className="text-[11px] text-[#888]">Effort</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-sm"
                style={{ background: i < lever.effort ? '#888' : '#1C1C1C' }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-[#555]" />
          <span className="text-[11px] text-[#888]">{lever.timeToEffect}m lag</span>
        </div>
      </div>

      {/* Expanded Config */}
      {expanded && (
        <div className="border-t border-[#1C1C1C] p-4 space-y-4 animate-fade-in">
          <Slider
            label="Impact Score"
            value={lever.impact}
            min={1}
            max={10}
            onChange={v => onUpdate(lever.id, { impact: v })}
            color={catColor}
          />
          <Slider
            label="Effort Required"
            value={lever.effort}
            min={1}
            max={10}
            onChange={v => onUpdate(lever.id, { effort: v })}
            color="#888888"
          />
          <Slider
            label="Time to Effect (months)"
            value={lever.timeToEffect}
            min={1}
            max={6}
            unit="m"
            onChange={v => onUpdate(lever.id, { timeToEffect: v })}
            color="#F59E0B"
          />
          <Slider
            label="Relative Cost"
            value={lever.cost}
            min={1}
            max={10}
            onChange={v => onUpdate(lever.id, { cost: v })}
            color="#EF4444"
          />
        </div>
      )}
    </div>
  )
}
