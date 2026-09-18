import assert from "node:assert/strict";
import test from "node:test";
import { attributionFromUrl } from "../lib/attribution.ts";

test("captura UTMs, click ids e landing sem dados desnecessários", () => {
  const value = attributionFromUrl(new URL("https://flowtecham.com/crm-whatsapp?utm_source=meta&utm_medium=paid&utm_campaign=crm&utm_content=followup&fbclid=abc"), "https://instagram.com", new Date("2026-01-01T00:00:00Z"));
  assert.deepEqual(value, { source: "meta", medium: "paid", campaign: "crm", content: "followup", term: undefined, gclid: undefined, fbclid: "abc", landingPage: "/crm-whatsapp", referrer: "https://instagram.com", firstTouchAt: "2026-01-01T00:00:00.000Z" });
  assert.equal(attributionFromUrl(new URL("https://flowtecham.com/sites")), null);
});
