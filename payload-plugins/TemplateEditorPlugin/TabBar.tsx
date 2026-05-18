'use client'

import { TAB_ROW, tabButton } from './styles'
import type { EditorTab } from './types'

interface TabBarProps {
  active: EditorTab
  onChange: (tab: EditorTab) => void
}

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div style={TAB_ROW}>
      <button onClick={() => onChange('code')} style={tabButton(active === 'code')}>
        HTML / CSS Code
      </button>
      <button onClick={() => onChange('visual')} style={tabButton(active === 'visual')}>
        Visual Builder
      </button>
    </div>
  )
}
