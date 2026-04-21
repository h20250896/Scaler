'use client'
import {
  ResponsiveContainer, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ZAxis
} from 'recharts'
import { Target } from 'lucide-react'
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/constants'
import type { GrowthLever } from '@/types'

interface Props { levers: GrowthLever[] }

const DotTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const catColor = CATEGORY_COLORS[d.category] ?? '#FF5C29'
  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-[#0E0E0E]/95 backdrop-blur-xl p-4 shadow-2xl min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{d.icon}</span>
        <p className="text-[13px] font-bold text-white">{d.name}</p>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#666]">Impact</span>
          <span className="font-semibold" style={{ color: catColor }}>{d.impact}/10</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#666]">Effort</span>
          <span className="font-semibold text-[#888]">{d.effort}/10</span>
        </div>
        <div className="h-px bg-[#1E1E1E] my-1" />
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#666]">ROI Score</span>
          <span className="font-bold text-white">{d.roiScore}</span>
        </div>
      </div>
    </div>
  )
}

export default function ImpactEffortMatrix({ levers }: Props) {
  const data = levers.map(l => ({
    ...l,
    x: l.effort,
    y: l.impact,
    z: l.enabled ? 200 : 80,
    roiScore: parseFloat(((l.impact * 10) / (l.effort * l.cost * 0.5 + l.timeToEffect)).toFixed(2)),
  }))

  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8B5CF610]">
            <Target size={16} className="text-[#8B5CF6]" />
          </div>
          <div>
            <h3 className="font-display text-[15px] font-bold text-white">Impact–Effort Matrix</h3>
            <p className="text-[11px] text-[#444] mt-0.5">Top-left = quick wins · Top-right = big bets</p>
          </div>
        </div>
      </div>

      {/* Quadrant Labels */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 11]}
              tick={{ fontSize: 10, fill: '#444' }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Effort →', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#444', fontWeight: 600 }}
            />
            <YAxis
              dataKey="y"
              type="number"
              domain={[0, 11]}
              tick={{ fontSize: 10, fill: '#444' }}
              axisLine={false}
              tickLine={false}
              label={{ value: '↑ Impact', angle: -90, position: 'insideLeft', offset: 20, fontSize: 10, fill: '#444', fontWeight: 600 }}
            />
            <ZAxis dataKey="z" range={[60, 220]} />
            <Tooltip content={<DotTooltip />} />
            <ReferenceLine x={5.5} stroke="#1E1E1E" strokeDasharray="6 4" />
            <ReferenceLine y={5.5} stroke="#1E1E1E" strokeDasharray="6 4" />
            {data.map(d => (
              <Scatter
                key={d.id}
                data={[d]}
                fill={d.enabled ? (CATEGORY_COLORS[d.category] ?? '#FF5C29') : '#222'}
                stroke={d.enabled ? (CATEGORY_COLORS[d.category] ?? '#FF5C29') : '#333'}
                strokeWidth={d.enabled ? 2 : 1}
                opacity={d.enabled ? 1 : 0.4}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Category Legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#1A1A1A] pt-4">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 group cursor-default">
            <div
              className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125"
              style={{ background: color }}
            />
            <span className="text-[10px] text-[#444] group-hover:text-[#888] transition-colors capitalize font-medium">
              {CATEGORY_LABELS[cat] ?? cat}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
