import assert from "node:assert/strict";
import test from "node:test";
import { defaultHero, heroForCampaign } from "../lib/campaign.ts";
test("mantém o hero padrão sem UTM", () => assert.equal(heroForCampaign(), defaultHero));
test("personaliza campanhas CRM, sites e sistemas", () => { assert.match(heroForCampaign("crm_whatsapp").headline, /WhatsApp/); assert.match(heroForCampaign("site_profissional").headline, /Instagram/); assert.match(heroForCampaign("sistema_planilhas").headline, /planilhas/); });
