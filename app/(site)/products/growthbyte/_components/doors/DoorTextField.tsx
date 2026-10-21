interface DoorTextFieldProps {
  name: string
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'tel'
  isRequired?: boolean
  isDisabled: boolean
}

export function FieldLabel({ label, isRequired }: { label: string; isRequired: boolean }) {
  return (
    <span className="wl-field-lbl">
      {label}
      {isRequired ? <b className="wl-req" aria-hidden="true"> *</b> : <i className="wl-opt"> (optional)</i>}
    </span>
  )
}

export default function DoorTextField({ name, label, placeholder, type = 'text', isRequired = false, isDisabled }: DoorTextFieldProps) {
  return (
    <label className="wl-field">
      <FieldLabel label={label} isRequired={isRequired} />
      <input className="cf-inp" name={name} type={type} required={isRequired} placeholder={placeholder} disabled={isDisabled} />
    </label>
  )
}
