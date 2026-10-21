import { CHANNEL_OPTIONS } from '@/lib/doors/options'

export default function DoorChannelPicker({ isDisabled }: { isDisabled: boolean }) {
  return (
    <fieldset className="wl-field dr-channels" disabled={isDisabled}>
      <legend className="wl-field-lbl">
        Channels running today <i className="wl-opt">(pick any)</i>
      </legend>
      <div className="dr-chips">
        {CHANNEL_OPTIONS.map((channel) => (
          <label key={channel.value} className="dr-chip">
            <input type="checkbox" name="channels" value={channel.value} />
            <span>{channel.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
