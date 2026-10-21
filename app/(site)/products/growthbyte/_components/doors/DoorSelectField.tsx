import type { FieldOption } from '@/lib/doors/options'
import { FieldLabel } from './DoorTextField'

interface DoorSelectFieldProps {
  name: string
  label: string
  placeholder: string
  options: FieldOption[]
  isDisabled: boolean
}

export default function DoorSelectField({ name, label, placeholder, options, isDisabled }: DoorSelectFieldProps) {
  return (
    <label className="wl-field">
      <FieldLabel label={label} isRequired />
      <select className="cf-inp" name={name} required disabled={isDisabled} defaultValue="">
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}
