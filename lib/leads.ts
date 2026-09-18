import { z } from "zod";

export const leadStatuses = ["NEW", "QUALIFIED", "MEETING_BOOKED", "PROPOSAL_SENT", "WON", "LOST"] as const;
const optionalText = z.string().trim().max(1000).optional().or(z.literal(""));

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120), company: z.string().trim().min(2).max(160),
  whatsapp: z.string().trim().min(8).max(30), email: z.string().trim().email().max(254).optional().or(z.literal("")),
  problem: z.string().trim().min(1).max(100), segment: z.string().trim().min(1).max(100),
  companySize: z.string().trim().min(1).max(50), currentSystem: z.string().trim().min(1).max(100),
  desiredResult: z.string().trim().min(1).max(100), sourceContext: z.string().trim().min(1).max(100),
  landingPage: z.string().trim().min(1).max(500), source: optionalText, medium: optionalText, campaign: optionalText,
  content: optionalText, term: optionalText, gclid: optionalText, fbclid: optionalText, referrer: optionalText,
  firstTouchAt: z.string().datetime().optional(), website: z.string().max(0).optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;
