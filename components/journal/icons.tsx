interface IconProps {
  size?: number
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const ArrowIcon = ({ size = 16, className }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} strokeWidth={2} className={className} {...stroke}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export const ArrowSmallIcon = ({ size = 14, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} strokeWidth={1.6} className={className} {...stroke}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export const ClockIcon = ({ size = 13, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} strokeWidth={1.4} className={className} {...stroke}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4.5V8l2.4 1.4" />
  </svg>
)

export const CalendarIcon = ({ size = 13, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} strokeWidth={1.4} className={className} {...stroke}>
    <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
    <path d="M5.5 2v3M10.5 2v3M2.5 7h11" />
  </svg>
)

export const SearchIcon = ({ size = 14, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} strokeWidth={1.5} className={className} {...stroke}>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M13.5 13.5L10.5 10.5" />
  </svg>
)

export const ShareIcon = ({ size = 14, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} strokeWidth={1.4} className={className} {...stroke}>
    <path d="M11 5l-3-3-3 3M8 2v8M3 9v3a1 1 0 001 1h8a1 1 0 001-1V9" />
  </svg>
)

export const LinkIcon = ({ size = 14, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} strokeWidth={1.4} className={className} {...stroke}>
    <path d="M6.5 9.5l3-3M6 4l1-1a2.5 2.5 0 113.5 3.5L9.5 7.5M10 12l-1 1a2.5 2.5 0 11-3.5-3.5L6.5 8.5" />
  </svg>
)

export const XIcon = ({ size = 14, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12.6 2H15l-5.3 6L15.5 14h-4.9l-3.4-4.4L3 14H.6l5.7-6.4L.5 2h5l3.1 4.1L12.6 2zm-.9 10.5h1.3L4.4 3.4H3l8.7 9.1z" />
  </svg>
)

export const LinkedInIcon = ({ size = 14, className }: IconProps) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" className={className}>
    <path d="M3.5 14h-2V5.5h2V14zm-1-9.6a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM14 14h-2v-4.4c0-1-.4-1.6-1.3-1.6-.7 0-1.2.5-1.4 1V14h-2V5.5h2v.9c.3-.5 1-1.1 2.2-1.1 1.6 0 2.5 1 2.5 3.1V14z" />
  </svg>
)
