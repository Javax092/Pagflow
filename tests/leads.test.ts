import assert from "node:assert/strict";
import test from "node:test";
import { leadSchema } from "../lib/leads.ts";

test("valida lead e atribuição antes da persistência", () => {
  const lead = { name: "Ana", company: "Acme", whatsapp: "92999999999", email: "", problem: "sales", segment: "services", companySize: "6-20", currentSystem: "partly", desiredResult: "control", sourceContext: "crm-whatsapp", landingPage: "/crm-whatsapp", source: "meta", campaign: "crm" };
  assert.equal(leadSchema.safeParse(lead).success, true);
  assert.equal(leadSchema.safeParse({ ...lead, whatsapp: "1" }).success, false);
});
