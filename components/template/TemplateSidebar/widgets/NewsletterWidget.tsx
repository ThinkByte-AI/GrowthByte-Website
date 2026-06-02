import WidgetCard from '../WidgetCard'

const INPUT_CLASS = 'w-full px-4 py-2 border border-ink-10 rounded-lg focus:border-teal focus:ring-1 focus:ring-teal'
const BUTTON_CLASS = 'w-full bg-teal text-white py-2 rounded-lg hover:bg-teal-dark transition-colors'

export default function NewsletterWidget() {
  return (
    <WidgetCard title="Stay Updated" variant="highlight">
      <p className="text-sm text-ink-60 mb-4">
        Get the latest insights delivered to your inbox.
      </p>
      <form className="space-y-3">
        <input type="email" placeholder="Your email" className={INPUT_CLASS} />
        <button type="submit" className={BUTTON_CLASS}>Subscribe</button>
      </form>
    </WidgetCard>
  )
}
