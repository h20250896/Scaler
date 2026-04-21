import type { GrowthLever, SimulationConfig, SimulationResult, MonthlyDataPoint } from '@/types'

function computeROI(lever: GrowthLever): number {
  return parseFloat(((lever.impact * 10) / (lever.effort * lever.cost * 0.5 + lever.timeToEffect)).toFixed(2))
}

function rankLevers(levers: GrowthLever[]): GrowthLever[] {
  return levers
    .map(l => ({ ...l, roiScore: computeROI(l) }))
    .sort((a, b) => (b.roiScore ?? 0) - (a.roiScore ?? 0))
    .map((l, i) => ({ ...l, rank: i + 1 }))
}

export function runSimulation(
  levers: GrowthLever[],
  config: SimulationConfig
): SimulationResult {
  const ranked = rankLevers(levers)
  const active = ranked.filter(l => l.enabled)

  const months = config.simulationMonths
  const forecast: MonthlyDataPoint[] = []
  let users = config.baselineUsers
  let revenue = config.baselineRevenue

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()

  for (let m = 0; m <= months; m++) {
    const monthIdx = (now.getMonth() + m) % 12
    const label = `${monthNames[monthIdx]} ${now.getFullYear() + Math.floor((now.getMonth() + m) / 12)}`

    // Compound growth from active levers (each lever contributes based on impact, delayed by timeToEffect)
    let monthlyGrowthRate = 0.005 // baseline organic 0.5%/month

    for (const lever of active) {
      if (m >= lever.timeToEffect) {
        const contribution = (lever.impact / 10) * 0.04 // up to 4% per lever per month
        monthlyGrowthRate += contribution
      }
    }

    // Diminishing returns beyond 5 active levers
    if (active.length > 5) {
      monthlyGrowthRate *= 0.85
    }

    if (m > 0) {
      users = Math.round(users * (1 + monthlyGrowthRate))
      revenue = parseFloat((revenue * (1 + monthlyGrowthRate * 1.1)).toFixed(2))
    }

    const growthPct = m === 0 ? 0 : parseFloat((((users - config.baselineUsers) / config.baselineUsers) * 100).toFixed(1))

    forecast.push({
      month: label,
      users,
      revenue,
      growth: growthPct,
      activeLevers: active.map(l => l.name),
    })
  }

  const finalData = forecast[forecast.length - 1]
  const totalGrowth = parseFloat((((finalData.users - config.baselineUsers) / config.baselineUsers) * 100).toFixed(1))
  const targetAchieved = totalGrowth >= config.growthTarget

  const topLever = active.length > 0 ? active[0].name : 'None selected'
  
  // Find bottleneck: highest effort lever among active
  const bottleneck = active.length > 0
    ? active.reduce((prev, curr) => curr.effort > prev.effort ? curr : prev).name
    : 'No levers active'

  // Recommendation logic
  let recommendation = ''
  if (active.length === 0) {
    recommendation = 'Select at least 3 growth levers to begin simulation. Start with the highest ROI levers (referral, partnerships, onboarding).'
  } else if (!targetAchieved && active.length < 4) {
    recommendation = `At current pace you will reach ${totalGrowth}% growth vs ${config.growthTarget}% target. Add 1–2 high-impact levers like Partnerships or Referral Program to close the gap.`
  } else if (!targetAchieved) {
    recommendation = `Trajectory falls short of ${config.growthTarget}% target. Consider increasing impact scores for ${topLever} or reducing time-to-effect via faster execution sprints.`
  } else {
    recommendation = `On track for ${totalGrowth.toFixed(1)}% growth — ${Math.round(totalGrowth - config.growthTarget)}pp above target. Consider reallocating effort budget to reduce execution strain.`
  }

  const efficiencyScore = Math.min(100, Math.round((totalGrowth / config.growthTarget) * 70 + (active.length > 0 ? 30 / active.length * 3 : 0)))

  return {
    forecast,
    totalGrowth,
    projectedUsers: finalData.users,
    projectedRevenue: finalData.revenue,
    targetAchieved,
    topLever,
    bottleneck,
    recommendation,
    efficiencyScore,
  }
}

export { rankLevers, computeROI }
