'use client'

export function LogoMark({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Shield shape with checkmark — represents selection/decision */}
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#1e3a5f" />
      <path d="M12 20l5 5 11-11" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LogoFull({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={36} />
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-navy-900 tracking-tight">
          Vant<span className="text-lime-600">age</span>
        </span>
        <span className="text-xl font-light text-select-500 tracking-tight">Select</span>
      </div>
    </div>
  )
}
