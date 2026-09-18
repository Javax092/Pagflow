import { Pool } from "pg";
import type { LeadInput } from "@/lib/leads";

let pool: Pool | undefined;
const getPool = () => pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 2 });

export async function createLead(lead: LeadInput) {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não configurada");
  const { rows } = await getPool().query<{ id: string }>(`INSERT INTO leads
    (name, company, whatsapp, email, problem, segment, company_size, current_system, desired_result, origin, landing_page, source, medium, campaign, content, term, gclid, fbclid, referrer, first_touch_at, converted_at)
    VALUES ($1,$2,$3,NULLIF($4,''),$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,COALESCE($20::timestamptz,NOW()),NOW()) RETURNING id`,
    [lead.name, lead.company, lead.whatsapp, lead.email, lead.problem, lead.segment, lead.companySize, lead.currentSystem, lead.desiredResult, lead.sourceContext, lead.landingPage, lead.source, lead.medium, lead.campaign, lead.content, lead.term, lead.gclid, lead.fbclid, lead.referrer, lead.firstTouchAt]);
  return rows[0];
}
