interface WaitlistFieldProps {
  name: string
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'tel'
  isRequired?: boolean
  isDisabled: boolean
}

export default function WaitlistField({ name, label, placeholder, type = 'text', isRequired = false, isDisabled }: WaitlistFieldProps) {
  return (
    <label className="wl-field">
      <span className="wl-field-lbl">
        {label}
        {isRequired ? <b className="wl-req" aria-hidden="true"> *</b> : <i className="wl-opt"> (optional)</i>}
      </span>
      <input className="cf-inp" name={name} type={type} required={isRequired} placeholder={placeholder} disabled={isDisabled} />
    </label>
  )
}
