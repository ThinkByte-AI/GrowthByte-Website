import { LABEL_CLASS, SELECT_CLASS } from './styles'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  id: string
  name: string
  label: string
  placeholder: string
  options: SelectOption[]
  disabled?: boolean
}

export default function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  disabled,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>{label}</label>
      <select id={id} name={name} disabled={disabled} className={SELECT_CLASS}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
