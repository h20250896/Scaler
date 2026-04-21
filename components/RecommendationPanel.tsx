'use client'
import { Lightbulb, AlertTriangle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import type { SimulationResult } from '@/types'

interface Props {
  result: SimulationResult | null
  onAutoOptimise: () => void
}

export default function RecommendationPanel({ result, onAutoOptimise }: Props) {
  return (
    <div className="space-y-3">
      {/* Recommendation */}
      <div
        className="sidebar-section p-5 relative overflow-hidden"
        style={{
          borderColor: result?.targetAchieved ? '#22C55E20' : '#FF5C2920',
        }}
      >
        {/* Background accent */}
        <div
          className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-[0.03] pointer-events-none"
          style={{ background: result?.targetAchieved ? '#22C55E' : '#FF5C29' }}
        />

        <div className="relative flex items-start gap-3">
          <div
            className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
            style={{
              background: result?.targetAchieved ? '#22C55E15' : '#FF5C2915',
              color: result?.targetAchieved ? '#22C55E' : '#FF5C29',
            }}
          >
            {result?.targetAchieved
              ? <CheckCircle2 size={16} />
              : <Lightbulb size={16} />
            }
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-white mb-1.5 uppercase tracking-wider">
              {result?.targetAchieved ? '✦ On Track' : '✦ Recommendation'}
            </p>
            <p className="text-[12px] text-[#777] leading-[1.6]">
              {result?.recommendation ?? 'Enable levers to generate a recommendation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottleneck */}
      {result && result.bottleneck !== 'No levers active' && (
        <div className="sidebar-section p-5 relative overflow-hidden" style={{ borderColor: '#F59E0B18' }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-[0.03] pointer-events-none bg-[#F59E0B]" />
          <div className="relative flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#F59E0B12] text-[#F59E0B]">
              <AlertTriangle size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-white mb-1.5 uppercase tracking-wider">⚠ Bottleneck</p>
              <p className="text-[12px] text-[#777] leading-[1.6]">
                Highest execution strain: <span className="text-[#F59E0B] font-semibold">{result.bottleneck}</span>.
                Consider parallelising or deferring this lever.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Optimise CTA */}
      <button
        onClick={onAutoOptimise}
        className="btn-primary flex w-full items-center justify-center gap-2.5 px-5 py-3.5 text-[13px]"
      >
        <Sparkles size={14} />
        Auto-Optimise Selection
        <ArrowRight size={14} />
      </button>
    </div>
  )
}
