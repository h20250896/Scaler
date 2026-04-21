'use client'
import { Settings2 } from 'lucide-react'
import Slider from './ui/Slider'
import type { SimulationConfig } from '@/types'

interface Props {
  config: SimulationConfig
  onChange: (updates: Partial<SimulationConfig>) => void
}

export default function LeverConfigPanel({ config, onChange }: Props) {
  return (
    <div className="sidebar-section p-5 space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ffffff08]">
          <Settings2 size={14} className="text-[#666]" />
        </div>
        <div>
          <h3 className="font-display text-[13px] font-bold text-white uppercase tracking-wider">Simulation Config</h3>
          <p className="text-[10px] text-[#333] mt-0.5">Adjust baseline parameters</p>
        </div>
      </div>

      <div className="divider-glow" />

      <Slider
        label="Baseline Users"
        value={config.baselineUsers}
        min={1000}
        max={100000}
        step={1000}
        onChange={v => onChange({ baselineUsers: v })}
        color="#FF5C29"
      />
      <Slider
        label="Baseline Revenue (₹L/mo)"
        value={config.baselineRevenue}
        min={5}
        max={500}
        step={5}
        onChange={v => onChange({ baselineRevenue: v })}
        color="#06B6D4"
      />
      <Slider
        label="Simulation Period"
        value={config.simulationMonths}
        min={3}
        max={12}
        unit=" months"
        onChange={v => onChange({ simulationMonths: v })}
        color="#8B5CF6"
      />
      <Slider
        label="Growth Target"
        value={config.growthTarget}
        min={10}
        max={200}
        step={5}
        unit="%"
        onChange={v => onChange({ growthTarget: v })}
        color="#22C55E"
      />
      <Slider
        label="Effort Budget"
        value={config.budget}
        min={5}
        max={50}
        onChange={v => onChange({ budget: v })}
        color="#F59E0B"
      />
    </div>
  )
}
