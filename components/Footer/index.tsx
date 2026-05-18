import BrandColumn from './BrandColumn'
import LinkColumn from './LinkColumn'
import BottomBar from './BottomBar'
import { COMPANY_LINKS, INDUSTRY_LINKS, SERVICE_LINKS } from './links'

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <BrandColumn />
          <LinkColumn title="Services" links={SERVICE_LINKS} />
          <LinkColumn title="Industries" links={INDUSTRY_LINKS} />
          <LinkColumn title="Company" links={COMPANY_LINKS} />
        </div>
      </div>
      <BottomBar />
    </footer>
  )
}
