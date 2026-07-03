// Shape of the `home` Payload global, consumed by the homepage sections.
// All fields optional — Payload text/array fields can be null before first save.

export interface ValueItem { value?: string | null }
export interface LabelValue { value?: string | null; label?: string | null }

export interface CounterItem {
  target: number
  prefix?: string | null
  suffix?: string | null
  decimals?: number | null
  label?: string | null
}

export interface HeroData {
  badge?: string | null
  headingBefore?: string | null
  headingEmphasis?: string | null
  sub?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
  trustPoints?: ValueItem[] | null
  counters?: CounterItem[] | null
}

export interface ProblemData {
  eyebrow?: string | null; heading?: string | null; lead?: string | null
  items?: { q?: string | null; a?: string | null }[] | null
}

export interface ComparisonData {
  eyebrow?: string | null; heading?: string | null; lead?: string | null
  columns?: ValueItem[] | null
  rows?: { label?: string | null; agency?: string | null; tools?: string | null; growthbyte?: string | null }[] | null
  ctaText?: string | null; ctaLabel?: string | null; ctaHref?: string | null
}

export interface MidCtaData { title?: string | null; subtitle?: string | null; buttonLabel?: string | null }

export interface OperatingModelData {
  eyebrow?: string | null; heading?: string | null; lead?: string | null
  columns?: { badge?: string | null; name?: string | null; sub?: string | null; items?: ValueItem[] | null }[] | null
  barText?: string | null; barStat?: string | null
}

export interface ServiceItemData {
  iconKey?: string | null; navLabel?: string | null; tag?: string | null; name?: string | null
  desc?: string | null; pills?: ValueItem[] | null; proofValue?: string | null; proofLabel?: string | null; href?: string | null
}
export interface ServicesData {
  eyebrow?: string | null; heading?: string | null; allLabel?: string | null; allHref?: string | null
  items?: ServiceItemData[] | null
}

export interface SectionHead { eyebrow?: string | null; heading?: string | null; allLabel?: string | null; allHref?: string | null }

export interface CaseStudiesData extends SectionHead {
  items?: { tag?: string | null; num?: string | null; sub?: string | null; title?: string | null; desc?: string | null; href?: string | null }[] | null
}

export interface IndustriesData extends SectionHead {
  items?: { iconKey?: string | null; name?: string | null; desc?: string | null; proof?: string | null; href?: string | null }[] | null
}

export interface ProcessData {
  eyebrow?: string | null; heading?: string | null; lead?: string | null
  steps?: { idx?: string | null; when?: string | null; name?: string | null; desc?: string | null; deliverable?: string | null }[] | null
}

export interface FoundersData {
  eyebrow?: string | null; heading?: string | null; lead?: string | null
  items?: { initials?: string | null; name?: string | null; role?: string | null; bio?: unknown }[] | null
}

export interface ToolsData extends SectionHead {
  items?: { iconKey?: string | null; name?: string | null; desc?: string | null; href?: string | null }[] | null
}

export interface NumbersData { eyebrow?: string | null; heading?: string | null; items?: LabelValue[] | null }
export interface MetricBarData { items?: LabelValue[] | null }

export interface FinalCtaData {
  eyebrow?: string | null; headingBefore?: string | null; headingEmphasis?: string | null; body?: string | null
  checks?: ValueItem[] | null; proof?: string | null
  formHeading?: string | null; formSub?: string | null; submitLabel?: string | null; secondaryLabel?: string | null; formMicro?: string | null
}

export interface FaqData { eyebrow?: string | null; heading?: string | null; items?: { q?: string | null; a?: string | null }[] | null }

export interface HomeData {
  seo?: { metaTitle?: string | null; metaDescription?: string | null } | null
  hero?: HeroData | null
  metricBar?: MetricBarData | null
  problem?: ProblemData | null
  comparison?: ComparisonData | null
  midCtaOne?: MidCtaData | null
  operatingModel?: OperatingModelData | null
  services?: ServicesData | null
  numbers?: NumbersData | null
  caseStudies?: CaseStudiesData | null
  midCtaTwo?: MidCtaData | null
  industries?: IndustriesData | null
  process?: ProcessData | null
  founders?: FoundersData | null
  tools?: ToolsData | null
  finalCta?: FinalCtaData | null
  faq?: FaqData | null
}
