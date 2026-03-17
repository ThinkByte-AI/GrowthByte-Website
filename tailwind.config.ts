import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary — teal
        teal: {
          DEFAULT: '#009389',
          dark:    '#007870',
          light:   '#00b5aa',
          muted:   '#e6f4f3',
        },
        // Brand secondary — amber
        amber: {
          DEFAULT: '#935600',
          dark:    '#7a4700',
          light:   '#b86e00',
          muted:   '#fdf3e6',
        },
        // Neutral ink scale (dark backgrounds, text)
        ink: {
          DEFAULT: '#0B0B0B',
          90:      '#1a1a1a',
          80:      '#2a2a2a',
          60:      '#525252',
          40:      '#7a7a7a',
          20:      '#a8a8a8',
          10:      '#d4d4d4',
        },
        // Surface scale (light backgrounds)
        surface: {
          DEFAULT: '#FFFFFF',
          2:       '#F8F8F7',
          3:       '#F1F1EF',
          4:       '#E8E8E5',
          border:  '#E2E2DF',
        },
        // Keep semantic aliases for backwards-compat (used in existing pages)
        primary: {
          DEFAULT: '#009389',
          dark:    '#007870',
          light:   '#00b5aa',
        },
        secondary: {
          DEFAULT: '#0B0B0B',
          light:   '#1a1a1a',
          dark:    '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-xl': ['clamp(3rem, 6vw + 1rem, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 4vw + 1rem, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 3vw + 0.75rem, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' }],
        // Section headings
        'heading-xl': ['clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem)', { lineHeight: '1.18', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading-lg': ['clamp(1.375rem, 1.75vw + 0.5rem, 2rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-md': ['clamp(1.125rem, 1vw + 0.5rem, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        // Body
        'body-lg':  ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'body-md':  ['1rem',     { lineHeight: '1.65', letterSpacing: '0.008em' }],
        'body-sm':  ['0.9375rem',{ lineHeight: '1.6' }],
        'body-xs':  ['0.875rem', { lineHeight: '1.55' }],
        // Label/caption
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
        'label-md': ['0.8125rem',{ lineHeight: '1.4', letterSpacing: '0.07em', fontWeight: '600' }],
        'label-sm': ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.1em',  fontWeight: '600' }],
      },
      spacing: {
        // 8-point grid additions
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content':  '72rem',   // 1152px — main content
        'readable': '45rem',   // 720px  — prose/narrow
        'hero':     '54rem',   // 864px  — hero text
      },
      borderRadius: {
        'xs':  '4px',
        'sm':  '6px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '20px',
        '3xl': '28px',
        'full':'9999px',
      },
      boxShadow: {
        'card':   '0 1px 3px rgba(11,11,11,0.06), 0 4px 12px rgba(11,11,11,0.06)',
        'card-hover': '0 2px 8px rgba(11,11,11,0.08), 0 8px 24px rgba(11,11,11,0.1)',
        'teal':   '0 4px 20px rgba(0,147,137,0.25)',
        'teal-lg':'0 8px 32px rgba(0,147,137,0.3)',
        'sm':     '0 1px 2px rgba(11,11,11,0.06)',
        'md':     '0 2px 8px rgba(11,11,11,0.08)',
        'lg':     '0 4px 20px rgba(11,11,11,0.1)',
        'xl':     '0 8px 40px rgba(11,11,11,0.12)',
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-right':'slideRight 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
export default config
