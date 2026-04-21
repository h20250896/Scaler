'use client'
import { useState, useMemo } from 'react'
import { Activity, BarChart3, Layers } from 'lucide-react'
import Header from '@/components/Header'
import LeverCard from '@/components/LeverCard'
import LeverConfigPanel from '@/components/LeverConfigPanel'
import MetricsSummary from '@/components/MetricsSummary'
import GrowthForecastChart from '@/components/GrowthForecastChart'
import ImpactEffortMatrix from '@/components/ImpactEffortMatrix'
import RecommendationPanel from '@/components/RecommendationPanel'
import { DEFAULT_LEVERS } from '@/lib/constants'
import { runSimulation, rankLevers, computeROI } from '@/lib/growthModel'
import { optimiseLeverSelection } from '@/lib/optimiser'
import type { GrowthLever, SimulationConfig } from '@/types'

const DEFAULT_CONFIG: SimulationConfig = {
  baselineUsers: 25000,
  baselineRevenue: 80,
  simulationMonths: 6,
  growthTarget: 60,
  budget: 25,
}

export default function Home() {
  const [levers, setLevers] = useState<GrowthLever[]>(DEFAULT_LEVERS)
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG)

  const rankedLevers = useMemo(() => rankLevers(levers), [levers])
  const activeLevers = useMemo(() => levers.filter(l => l.enabled), [levers])
  const result = useMemo(() => runSimulation(levers, config), [levers, config])

  const handleUpdate = (id: string, updates: Partial<GrowthLever>) => {
    setLevers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  const handleAutoOptimise = () => {
    const selectedIds = optimiseLeverSelection(levers, config)
    setLevers(prev => prev.map(l => ({ ...l, enabled: selectedIds.includes(l.id) })))
  }

  const totalEffortUsed = activeLevers.reduce((sum, l) => sum + l.effort, 0)

  return (
    <div className="min-h-screen bg-[#0A0A0A] noise-overlay">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {/* ─── HERO SECTION ─── */}
        <div className="hero-glow relative mb-10 animate-fade-in">
          <div className="relative z-10">
            {/* Divider Label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-glow flex-1" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#333] font-medium">
                Strategic Intelligence Tool
              </span>
              <div className="divider-glow flex-1" />
            </div>

            {/* Title */}
            <h1 className="font-display text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.1] tracking-tight">
              Growth Lever{' '}
              <span className="gradient-text-orange">Simulator</span>
            </h1>
            <p className="mt-3 text-[14px] text-[#555] max-w-lg leading-relaxed">
              Model the impact of strategic growth interventions. Enable levers, tune parameters,
              and discover the optimal path to your growth target.
            </p>

            {/* Quick Stats Bar */}
            <div className="mt-5 flex items-center gap-6">
              <div className="flex items-center gap-2 text-[12px] text-[#444]">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FF5C2910]">
                  <Layers size={10} className="text-[#FF5C29]" />
                </div>
                <span>{activeLevers.length} of {levers.length} levers active</span>
              </div>
              <div className="h-3 w-px bg-[#1E1E1E]" />
              <div className="flex items-center gap-2 text-[12px] text-[#444]">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F59E0B10]">
                  <Activity size={10} className="text-[#F59E0B]" />
                </div>
                <span>Budget: {totalEffortUsed}/{config.budget} effort used</span>
              </div>
              <div className="h-3 w-px bg-[#1E1E1E]" />
              <div className="flex items-center gap-2 text-[12px] text-[#444]">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#8B5CF610]">
                  <BarChart3 size={10} className="text-[#8B5CF6]" />
                </div>
                <span>{config.simulationMonths}-month forecast</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── METRICS ─── */}
        <div className="mb-8">
          <MetricsSummary result={result} config={config} activeCount={activeLevers.length} />
        </div>

        {/* ─── MAIN GRID ─── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Forecast Chart */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
              <GrowthForecastChart result={result} config={config} />
            </div>

            {/* Impact-Effort Matrix */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
              <ImpactEffortMatrix levers={rankedLevers} />
            </div>

            {/* Lever Cards Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-[16px] font-bold text-white">Growth Levers</h2>
                  <p className="mt-0.5 text-[11px] text-[#444]">Toggle, configure, and rank strategic interventions</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#111] border border-[#1E1E1E] px-3 py-1.5 text-[11px] text-[#555]">
                    <span className="font-semibold text-[#FF5C29]">{activeLevers.length}</span> active
                    <span className="mx-1 text-[#1E1E1E]">·</span>
                    Ranked by ROI
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {rankedLevers.map((lever, i) => (
                  <div
                    key={lever.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.4 + i * 0.05}s`, animationFillMode: 'backwards' }}
                  >
                    <LeverCard
                      lever={lever}
                      rank={lever.rank}
                      roiScore={parseFloat(computeROI(lever).toFixed(1))}
                      onUpdate={handleUpdate}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-4 animate-slide-in-right" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            {/* Sticky sidebar on desktop */}
            <div className="lg:sticky lg:top-[72px] space-y-4">
              <LeverConfigPanel config={config} onChange={updates => setConfig(p => ({ ...p, ...updates }))} />
              <RecommendationPanel result={result} onAutoOptimise={handleAutoOptimise} />

              {/* Active Levers Summary */}
              {activeLevers.length > 0 && (
                <div className="sidebar-section p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[12px] font-bold text-white uppercase tracking-wider">Active Levers</p>
                    <span className="text-[10px] text-[#333] font-medium">
                      {totalEffortUsed}/{config.budget} effort
                    </span>
                  </div>

                  {/* Effort Budget Bar */}
                  <div className="mb-4">
                    <div className="h-1.5 w-full rounded-full bg-[#1A1A1A] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(100, (totalEffortUsed / config.budget) * 100)}%`,
                          background: totalEffortUsed > config.budget
                            ? 'linear-gradient(90deg, #EF4444, #FF6B6B)'
                            : 'linear-gradient(90deg, #FF5C29, #FF8C5A)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {activeLevers.map(l => (
                      <div key={l.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm">{l.icon}</span>
                          <div>
                            <span className="text-[11px] text-[#999] group-hover:text-white transition-colors">{l.name}</span>
                            <div className="flex gap-0.5 mt-0.5">
                              {Array.from({ length: l.effort }).map((_, i) => (
                                <div key={i} className="h-1 w-1 rounded-full bg-[#333]" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#FF5C29] font-semibold tabular-nums">
                          {computeROI(l).toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="mt-20 border-t border-[#141414]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C29] to-[#FF8C5A]">
                <span className="text-[10px] text-white font-bold">G</span>
              </div>
              <span className="text-[11px] text-[#333]">
                Growth Lever Simulator · Built for strategic decision-making
              </span>
            </div>
            <span className="text-[10px] text-[#222]">v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
