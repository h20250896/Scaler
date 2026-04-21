export type LeverCategory = 
  | 'acquisition'
  | 'activation'
  | 'retention'
  | 'referral'
  | 'revenue'
  | 'product';

export interface GrowthLever {
  id: string;
  name: string;
  description: string;
  category: LeverCategory;
  icon: string;
  // User-configurable
  impact: number;        // 1–10: expected % growth boost per month
  effort: number;        // 1–10: 1=easy, 10=very hard
  timeToEffect: number;  // months before visible impact
  cost: number;          // 1–10: relative cost index
  enabled: boolean;
  // Derived
  roiScore?: number;
  rank?: number;
}

export interface SimulationConfig {
  baselineUsers: number;
  baselineRevenue: number;       // monthly, in ₹ lakhs
  simulationMonths: number;
  growthTarget: number;          // % growth desired in simulationMonths
  budget: number;                // total effort budget (sum of effort scores allowed)
}

export interface MonthlyDataPoint {
  month: string;
  users: number;
  revenue: number;
  growth: number;
  activeLevers: string[];
}

export interface SimulationResult {
  forecast: MonthlyDataPoint[];
  totalGrowth: number;
  projectedUsers: number;
  projectedRevenue: number;
  targetAchieved: boolean;
  topLever: string;
  bottleneck: string;
  recommendation: string;
  efficiencyScore: number;       // 0–100
}
