import BrandColumn from './BrandColumn'
import LinkColumn from './LinkColumn'
import BottomBar from './BottomBar'
import { COMPANY_LINKS, INDUSTRY_LINKS, SERVICE_LINKS, TOOLS_LINKS } from './links'

export default function Footer() {
  return (
    <footer className="gb-footer">
      <div className="wrap">
        <div className="foot-top">
          <BrandColumn />
          <LinkColumn title="Services" links={SERVICE_LINKS} />
          <LinkColumn title="Industries" links={INDUSTRY_LINKS} />
          <LinkColumn title="Tools" links={TOOLS_LINKS} />
          <LinkColumn title="Company" links={COMPANY_LINKS} />
        </div>
        <BottomBar />
      </div>
    </footer>
  )
}
