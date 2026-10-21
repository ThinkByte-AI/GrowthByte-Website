// "https://www.Example.com/pricing" and "example.com" are the same business for the 7-day limit.
export function websiteDomainOf(website: string): string | null {
  const withScheme = /^https?:\/\//i.test(website) ? website : `https://${website}`
  try {
    const host = new URL(withScheme).hostname.toLowerCase().replace(/^www\./, '')
    return host.includes('.') ? host : null
  } catch {
    return null
  }
}
