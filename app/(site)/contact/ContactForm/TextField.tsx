import { INPUT_CLASS, LABEL_CLASS } from './styles'

interface TextFieldProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export default function TextField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  required,
  disabled,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </div>
  )
}
