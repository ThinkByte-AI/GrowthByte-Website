import Link from 'next/link'
import { COMPANY_INFO, CONTACT_INFO, SOCIAL_LINKS, NAVIGATION_ITEMS } from '@/lib/constants'

export default function Footer() {
  const serviceLinks = [
    { name: 'Growth Strategy',       href: '/services/growth-strategy' },
    { name: 'Performance Marketing', href: '/services/performance-marketing' },
    { name: 'SEO & Content',         href: '/services/seo' },
    { name: 'Marketing Automation',  href: '/services/marketing-automation' },
    { name: 'Analytics & Attribution', href: '/services/analytics-reporting' },
    { name: 'Creative & CRO',        href: '/services/creative-cro' },
  ]

  const industryLinks = [
    { name: 'SaaS',                 href: '/industries/saas' },
    { name: 'D2C & E-Commerce',     href: '/industries/d2c-ecommerce' },
    { name: 'Healthcare',           href: '/industries/healthcare' },
    { name: 'FinTech',              href: '/industries/fintech' },
    { name: 'Professional Services',href: '/industries/professional-services' },
  ]

  const companyLinks = [
    { name: 'About',         href: '/about' },
    { name: 'Case Studies',  href: '/case-studies' },
    { name: 'Insights',      href: '/insights' },
    { name: 'Contact',       href: '/contact' },
  ]

  return (
    <footer className="bg-ink text-white">

      {/* Main footer */}
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="inline-block mb-4" aria-label="GrowthByte home">
              <span className="text-xl font-bold tracking-tight">
                Growth<span className="text-teal">Byte</span>
              </span>
            </Link>
            <p className="text-[0.9rem] text-white/50 leading-relaxed mb-6 max-w-[22rem]">
              AI systems + human strategy. Built to drive measurable outcomes — leads, CAC improvement, conversion growth, and revenue.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <a
                href={CONTACT_INFO.emailHref}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {CONTACT_INFO.email}
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {CONTACT_INFO.phone}
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              <a
                href={SOCIAL_LINKS.linkedin}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal/20 hover:text-teal flex items-center justify-center text-white/50 transition-all duration-250"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-teal/20 hover:text-teal flex items-center justify-center text-white/50 transition-all duration-250"
                aria-label="Twitter / X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/40 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/40 mb-4">Industries</h3>
            <ul className="space-y-2.5">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/40 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.8125rem] text-white/30">
            &copy; {new Date().getFullYear()} GrowthByte. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[0.8125rem] text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[0.8125rem] text-white/30 hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
