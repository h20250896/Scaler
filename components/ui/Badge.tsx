import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/constants'
import type { LeverCategory } from '@/types'

export function CategoryBadge({ category }: { category: LeverCategory }) {
  const color = CATEGORY_COLORS[category] ?? '#888'
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
      style={{
        background: color + '18',
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {CATEGORY_LABELS[category] ?? category}
    </span>
  )
}
