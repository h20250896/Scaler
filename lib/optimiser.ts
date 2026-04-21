import type { GrowthLever, SimulationConfig } from '@/types'
import { computeROI } from './growthModel'

// Greedy knapsack: select levers within effort budget that maximise total ROI
export function optimiseLeverSelection(
  levers: GrowthLever[],
  config: SimulationConfig
): string[] {
  const scored = levers.map(l => ({ ...l, roiScore: computeROI(l) }))
  scored.sort((a, b) => (b.roiScore ?? 0) - (a.roiScore ?? 0))

  const selected: string[] = []
  let budgetUsed = 0

  for (const lever of scored) {
    if (budgetUsed + lever.effort <= config.budget) {
      selected.push(lever.id)
      budgetUsed += lever.effort
    }
  }

  return selected
}
