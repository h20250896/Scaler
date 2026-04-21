'use client'
import { TrendingUp, Users, IndianRupee, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { SimulationResult, SimulationConfig } from '@/types'

interface MetricsSummaryProps {
  result: SimulationResult | null
  config: SimulationConfig
  activeCount: number
}

export default function MetricsSummary({ result, config, activeCount }: MetricsSummaryProps) {
  const metrics = [
    {
      label: 'Projected Growth',
      value: result ? `${result.totalGrowth}%` : '—',
      icon: <TrendingUp size={18} />,
      color: result?.targetAchieved ? '#22C55E' : '#FF5C29',
      sub: result ? (result.targetAchieved ? 'Target achieved ✓' : `Target: ${config.growthTarget}%`) : 'Enable levers to begin',
      trend: result ? (result.targetAchieved ? 'up' : 'down') : null,
      glowColor: result?.targetAchieved ? '#22C55E' : '#FF5C29',
    },
    {
      label: 'Projected Users',
      value: result ? result.projectedUsers.toLocaleString('en-IN') : '—',
      icon: <Users size={18} />,
      color: '#FF5C29',
      sub: `Baseline: ${config.baselineUsers.toLocaleString('en-IN')}`,
      trend: result && result.projectedUsers > config.baselineUsers ? 'up' : null,
      glowColor: '#FF5C29',
    },
    {
      label: 'Projected Revenue',
      value: result ? `₹${result.projectedRevenue.toFixed(1)}L` : '—',
      icon: <IndianRupee size={18} />,
      color: '#06B6D4',
      sub: `Baseline: ₹${config.baselineRevenue}L/mo`,
      trend: result && result.projectedRevenue > config.baselineRevenue ? 'up' : null,
      glowColor: '#06B6D4',
    },
    {
      label: 'Efficiency Score',
      value: result ? `${result.efficiencyScore}` : '—',
      icon: <Zap size={18} />,
      color: '#8B5CF6',
      sub: `${activeCount} lever${activeCount !== 1 ? 's' : ''} active`,
      trend: null,
      glowColor: '#8B5CF6',
      suffix: '/100',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="metric-card p-5 animate-fade-in-scale"
          style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'backwards' }}
        >
          {/* Glow accent */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
            style={{ background: m.glowColor }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] text-[#555555] font-medium uppercase tracking-wider">{m.label}</span>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{ background: m.color + '15', color: m.color }}
              >
                {m.icon}
              </div>
            </div>

            <div className="flex items-baseline gap-1">
              <span
                className="font-display text-[28px] font-extrabold leading-none tracking-tight animate-count-up"
                style={{ color: m.value === '—' ? '#2A2A2A' : m.color, animationDelay: `${i * 0.1 + 0.2}s`, animationFillMode: 'backwards' }}
              >
                {m.value}
              </span>
              {'suffix' in m && m.suffix && (
                <span className="text-[14px] font-medium" style={{ color: m.color + '80' }}>{m.suffix}</span>
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              {m.trend === 'up' && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22C55E15]">
                  <ArrowUpRight size={10} className="text-[#22C55E]" />
                </div>
              )}
              {m.trend === 'down' && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF5C2915]">
                  <ArrowDownRight size={10} className="text-[#FF5C29]" />
                </div>
              )}
              <span className="text-[11px] text-[#444444]">{m.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
