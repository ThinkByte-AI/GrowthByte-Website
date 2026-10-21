import { COUNTRY_OPTIONS, GOAL_OPTIONS } from '@/lib/doors/options'
import type { Door } from '@/lib/waitlist/constants'
import DoorChannelPicker from './DoorChannelPicker'
import DoorSelectField from './DoorSelectField'
import DoorTextField from './DoorTextField'

interface DoorFormFieldsProps {
  door: Door
  isDisabled: boolean
}

function BusinessFields({ door, isDisabled }: DoorFormFieldsProps) {
  const isAgency = door === 'agency'
  return (
    <>
      <div className="wl-form-grid">
        <DoorTextField name="website" label={isAgency ? 'Your site or a client’s' : 'Website'} placeholder="example.com" isRequired isDisabled={isDisabled} />
        <DoorSelectField name="goal" label="Primary goal" placeholder="Pick one" options={GOAL_OPTIONS} isDisabled={isDisabled} />
      </div>
      <div className="wl-form-grid">
        <DoorTextField name="offer" label={isAgency ? 'What the business sells' : 'What you sell'} placeholder="e.g. dental clinics in Pune" isRequired isDisabled={isDisabled} />
        <DoorTextField name="audience" label={isAgency ? 'Who it sells to' : 'Who you sell to'} placeholder="e.g. families nearby" isRequired isDisabled={isDisabled} />
      </div>
      <DoorChannelPicker isDisabled={isDisabled} />
    </>
  )
}

function ContactFields({ door, isDisabled }: DoorFormFieldsProps) {
  const isAgency = door === 'agency'
  return (
    <>
      <div className="wl-form-grid">
        <DoorTextField name="name" label="Your name" placeholder="Full name" isRequired isDisabled={isDisabled} />
        {isAgency ? (
          <DoorTextField name="agencyName" label="Agency name" placeholder="Your agency" isRequired isDisabled={isDisabled} />
        ) : (
          <DoorSelectField name="country" label="Country" placeholder="Pick one" options={COUNTRY_OPTIONS} isDisabled={isDisabled} />
        )}
      </div>
      <div className="wl-form-grid">
        <DoorTextField name="email" label="Work email" placeholder={isAgency ? 'you@agency.com' : 'you@company.com'} type="email" isRequired isDisabled={isDisabled} />
        <DoorTextField name="whatsapp" label="WhatsApp" placeholder="+91 98765 43210" type="tel" isDisabled={isDisabled} />
      </div>
      {isAgency && (
        <DoorSelectField name="country" label="Country" placeholder="Pick one" options={COUNTRY_OPTIONS} isDisabled={isDisabled} />
      )}
      {!isAgency && (
        <label className="dr-check">
          <input type="checkbox" name="wantsAgency" disabled={isDisabled} />
          <span>I’m looking for an agency.</span>
        </label>
      )}
    </>
  )
}

export default function DoorFormFields(props: DoorFormFieldsProps) {
  return (
    <>
      <BusinessFields {...props} />
      <ContactFields {...props} />
    </>
  )
}
