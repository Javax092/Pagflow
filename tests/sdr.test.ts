import assert from "node:assert/strict";
import test from "node:test";
import { buildWhatsAppMessage, buildWhatsAppUrl, type SDRLead } from "../lib/sdr.ts";

const lead: SDRLead = { segment: "services", painPoint: "manual", currentSystem: "partly", companySize: "6-20", desiredResult: "control", name: "Ana", company: "Acme", whatsapp: "92999999999", email: "" };

test("gera mensagem contextual e URL codificada", () => {
  const message = buildWhatsAppMessage(lead);
  assert.match(message, /Empresa: Acme/);
  assert.match(message, /Segmento: Serviços/);
  assert.match(message, /Resultado desejado: Ter mais controle/);
  assert.equal(buildWhatsAppUrl("5592999999999", lead), `https://wa.me/5592999999999?text=${encodeURIComponent(message)}`);
  assert.equal(buildWhatsAppUrl("", lead), "");
});

test("adapta a abertura do WhatsApp à origem da landing", () => {
  assert.match(buildWhatsAppMessage(lead, "crm-whatsapp"), /analisar meu processo comercial/);
  assert.match(buildWhatsAppMessage(lead, "sites"), /criar ou melhorar o site/);
  assert.match(buildWhatsAppMessage(lead, "sistemas"), /mapear um processo da minha operação/);
});
