import { LABEL_CLASS, TEXTAREA_CLASS } from './styles'

interface TextareaFieldProps {
  id: string
  name: string
  label: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
}

export default function TextareaField({
  id,
  name,
  label,
  placeholder,
  rows = 4,
  required,
  disabled,
}: TextareaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label} {required && '*'}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={TEXTAREA_CLASS}
      />
    </div>
  )
}
