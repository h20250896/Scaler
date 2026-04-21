'use client'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  color?: string
  unit?: string
}

export default function Slider({
  label, value, min, max, step = 1,
  onChange, color = '#FF5C29', unit = ''
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#888888]">{label}</span>
        <span className="text-[12px] font-medium text-white">
          {value}{unit}
        </span>
      </div>
      <div className="relative h-4 flex items-center">
        <div className="h-1 w-full rounded-full bg-[#242424]">
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}
