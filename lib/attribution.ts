export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

export type LeadAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  fbclid?: string;
  landingPage: string;
  referrer?: string;
  firstTouchAt: string;
  convertedAt?: string;
};

export function attributionFromUrl(url: URL, referrer = "", now = new Date()): LeadAttribution | null {
  if (!attributionKeys.some((key) => url.searchParams.has(key))) return null;
  const value = (key: (typeof attributionKeys)[number]) => url.searchParams.get(key)?.slice(0, 500) || undefined;
  return {
    source: value("utm_source"), medium: value("utm_medium"), campaign: value("utm_campaign"),
    content: value("utm_content"), term: value("utm_term"), gclid: value("gclid"), fbclid: value("fbclid"),
    landingPage: url.pathname, referrer: referrer.slice(0, 1000) || undefined, firstTouchAt: now.toISOString(),
  };
}
