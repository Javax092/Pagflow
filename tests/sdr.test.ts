import assert from "node:assert/strict";
import test from "node:test";
import { buildWhatsAppMessage, type SDRLead } from "../lib/sdr.ts";

import { buildWhatsAppUrl } from "../lib/whatsapp.ts";

const lead: SDRLead = { segment: "services", painPoint: "manual", currentSystem: "partly", companySize: "6-20", desiredResult: "control", name: "Ana", company: "Acme", whatsapp: "92999999999", email: "" };

test("gera mensagem contextual e URL codificada", () => {
  const message = buildWhatsAppMessage({ ...lead, name: "Ana Júlia & Cia + 100% #1? 😊" });
  assert.match(message, /Empresa: Acme/);
  assert.match(message, /Segmento: Serviços/);
  assert.match(message, /Resultado desejado: Ter mais controle/);
  const href = buildWhatsAppUrl("+55 (92) 99999-9999", message);
  assert.equal(href, `https://wa.me/5592999999999?text=${encodeURIComponent(message)}`);
  assert.equal(new URL(href).searchParams.get("text"), message);
  assert.equal(buildWhatsAppUrl("", message), "");
  assert.equal(buildWhatsAppUrl("0092", message), "");
  assert.equal(buildWhatsAppUrl("55119999ext123", message), "");
});

test("adapta a abertura do WhatsApp à origem da landing", () => {
  assert.match(buildWhatsAppMessage(lead, "crm-whatsapp"), /analisar meu processo comercial/);
  assert.match(buildWhatsAppMessage(lead, "sites"), /criar ou melhorar o site/);
  assert.match(buildWhatsAppMessage(lead, "sistemas"), /mapear um processo da minha operação/);
});
