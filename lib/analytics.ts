export const eventNames = ["landing_view", "service_view", "cta_click", "diagnostic_start", "diagnostic_step", "diagnostic_complete", "whatsapp_click", "lead_created", "qualified_lead", "meeting_booked", "proposal_sent", "deal_won"] as const;
export type EventName = (typeof eventNames)[number];

export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const detail = { event: name, ...payload };
  window.dispatchEvent(new CustomEvent("flowtech:event", { detail }));
  const target = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer?.push(detail);
}
