'use client'

interface ToggleProps {
  enabled: boolean
  onChange: (v: boolean) => void
  label?: string
}

export default function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none
        ${enabled ? 'bg-[#FF5C29] border-[#FF5C29]' : 'bg-[#242424] border-[#242424]'}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition duration-200 ease-in-out
          ${enabled ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  )
}
