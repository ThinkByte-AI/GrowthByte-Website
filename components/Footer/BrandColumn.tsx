import Image from 'next/image'
import ContactRow from './ContactRow'

export default function BrandColumn() {
  return (
    <div>
      <div className="fl-logo">
        <Image className="fl-sq" src="/logo.jpeg" alt="GrowthByte.ai logo" width={30} height={30} />
        <div className="fl-name">GrowthByte<b>.ai</b></div>
      </div>
      <p className="fl-tag">
        AI systems and senior strategists on your revenue goal. For companies in the ₹5Cr to ₹100Cr range.
      </p>
      <ContactRow />
    </div>
  )
}
