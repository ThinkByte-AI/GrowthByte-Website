import { COUNTRY_OPTIONS, GOAL_OPTIONS } from '@/lib/doors/options'
import type { Door } from '@/lib/waitlist/constants'
import DoorChannelPicker from './DoorChannelPicker'
import DoorSelectField from './DoorSelectField'
import DoorTextField from './DoorTextField'

interface DoorStepProps {
  door: Door
  isDisabled: boolean
}

function WebsiteStep({ door, isDisabled }: DoorStepProps) {
  return (
    <>
      <DoorTextField name="website" label={door === 'agency' ? 'Your site or a client’s' : 'Your website'} placeholder="example.com" isRequired isDisabled={isDisabled} />
      <DoorSelectField name="goal" label="Primary goal" placeholder="Pick one" options={GOAL_OPTIONS} isDisabled={isDisabled} />
    </>
  )
}

function BusinessStep({ door, isDisabled }: DoorStepProps) {
  const isAgency = door === 'agency'
  return (
    <>
      <DoorTextField name="offer" label={isAgency ? 'What the business sells' : 'What you sell'} placeholder="e.g. dental care in Pune" isRequired isDisabled={isDisabled} />
      <DoorTextField name="audience" label={isAgency ? 'Who it sells to' : 'Who you sell to'} placeholder="e.g. families nearby" isRequired isDisabled={isDisabled} />
      <DoorChannelPicker isDisabled={isDisabled} />
    </>
  )
}

function ContactStep({ door, isDisabled }: DoorStepProps) {
  const isAgency = door === 'agency'
  return (
    <>
      <div className="wl-form-grid">
        <DoorTextField name="name" label="Your name" placeholder="Full name" isRequired isDisabled={isDisabled} />
        {isAgency && <DoorTextField name="agencyName" label="Agency name" placeholder="Your agency" isRequired isDisabled={isDisabled} />}
        {!isAgency && <DoorSelectField name="country" label="Country" placeholder="Pick one" options={COUNTRY_OPTIONS} isDisabled={isDisabled} />}
      </div>
      <DoorTextField name="email" label="Work email" placeholder={isAgency ? 'you@agency.com' : 'you@company.com'} type="email" isRequired isDisabled={isDisabled} />
      <div className="wl-form-grid">
        <DoorTextField name="whatsapp" label="WhatsApp" placeholder="+91 98765 43210" type="tel" isDisabled={isDisabled} />
        {isAgency && <DoorSelectField name="country" label="Country" placeholder="Pick one" options={COUNTRY_OPTIONS} isDisabled={isDisabled} />}
      </div>
      {!isAgency && (
        <label className="dr-check">
          <input type="checkbox" name="wantsAgency" disabled={isDisabled} />
          <span>I’m looking for an agency.</span>
        </label>
      )}
    </>
  )
}

export const DOOR_STEPS = [
  { title: 'The website', Fields: WebsiteStep },
  { title: 'The business', Fields: BusinessStep },
  { title: 'About you', Fields: ContactStep },
]
