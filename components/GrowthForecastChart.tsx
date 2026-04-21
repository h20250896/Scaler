'use client'
import {
  ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine, Area, AreaChart
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import type { SimulationResult, SimulationConfig } from '@/types'

interface Props {
  result: SimulationResult | null
  config: SimulationConfig
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-[#0E0E0E]/95 backdrop-blur-xl p-4 shadow-2xl min-w-[180px]">
      <p className="mb-2.5 text-[12px] font-bold text-white tracking-wide">{label}</p>
      <div className="space-y-2">
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              <span className="text-[#666]">{p.name}</span>
            </div>
            <span className="font-semibold text-white tabular-nums">
              {p.name === 'Revenue (₹L)' ? `₹${p.value.toFixed(1)}L` :
               p.name === 'Growth %' ? `${p.value}%` :
               p.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GrowthForecastChart({ result, config }: Props) {
  if (!result || result.forecast.length === 0) {
    return (
      <div className="card flex h-[340px] items-center justify-center">
        <div className="text-center">
          <div className="mb-3 text-4xl animate-float">📈</div>
          <p className="text-[13px] text-[#444] font-medium">Enable levers to see growth forecast</p>
          <p className="text-[11px] text-[#2A2A2A] mt-1">Toggle growth levers below to start simulation</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5C2910]">
            <TrendingUp size={16} className="text-[#FF5C29]" />
          </div>
          <div>
            <h3 className="font-display text-[15px] font-bold text-white">Growth Forecast</h3>
            <p className="text-[11px] text-[#444] mt-0.5">{config.simulationMonths}-month projection with {result.forecast[0]?.activeLevers?.length || 0} active levers</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#FF5C29]" />
            <span className="text-[10px] text-[#555] font-medium">Users</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
            <span className="text-[10px] text-[#555] font-medium">Growth %</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={result.forecast} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5C29" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#FF5C29" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#444' }}
            axisLine={false}
            tickLine={false}
            interval={1}
          />
          <YAxis
            yAxisId="users"
            orientation="left"
            tick={{ fontSize: 10, fill: '#444' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="growth"
            orientation="right"
            tick={{ fontSize: 10, fill: '#444' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            yAxisId="growth"
            y={config.growthTarget}
            stroke="#FF5C2950"
            strokeDasharray="6 4"
            label={{ value: `Target ${config.growthTarget}%`, position: 'right', fontSize: 10, fill: '#FF5C29', fontWeight: 600 }}
          />
          <Area
            yAxisId="users"
            type="monotone"
            dataKey="users"
            name="Users"
            stroke="#FF5C29"
            strokeWidth={2.5}
            fill="url(#usersGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#FF5C29', stroke: '#0A0A0A', strokeWidth: 3 }}
          />
          <Area
            yAxisId="growth"
            type="monotone"
            dataKey="growth"
            name="Growth %"
            stroke="#22C55E"
            strokeWidth={2}
            fill="url(#growthGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#22C55E', stroke: '#0A0A0A', strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
