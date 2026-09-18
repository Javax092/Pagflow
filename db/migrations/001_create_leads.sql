CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE lead_status AS ENUM ('NEW', 'QUALIFIED', 'MEETING_BOOKED', 'PROPOSAL_SENT', 'WON', 'LOST');
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, company text NOT NULL,
  whatsapp text NOT NULL, email text, problem text NOT NULL, segment text NOT NULL,
  company_size text NOT NULL, current_system text NOT NULL, desired_result text NOT NULL,
  origin text NOT NULL, landing_page text NOT NULL, source text, medium text, campaign text,
  content text, term text, gclid text, fbclid text, referrer text, status lead_status NOT NULL DEFAULT 'NEW',
  first_touch_at timestamptz NOT NULL DEFAULT now(), converted_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
