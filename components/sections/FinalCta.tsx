"use client";
import { WHATSAPP_NUMBER } from "@/config/contact";
import { useDiagnostic } from "@/components/ui/DiagnosticContext";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { buildWhatsAppUrl } from "@/lib/sdr";
import { trackEvent } from "@/lib/analytics";
export function FinalCta() { const { lead, step } = useDiagnostic(); const whatsapp = step === 5 ? buildWhatsAppUrl(WHATSAPP_NUMBER, lead, "home") : WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Vim pelo site da FlowtechAM e gostaria de analisar minha operação.")}` : "#diagnostico"; return <section className="final-cta"><div className="section-container"><p className="movement-label">Próximo passo</p><h2>Qual processo da sua empresa mais precisa melhorar hoje?</h2><div><TrackedLink href="#diagnostico" variant="primary" sourceContext="home" sourceSection="final_cta" ctaName="final_diagnostic">Fazer diagnóstico</TrackedLink><TrackedLink href={whatsapp} target={WHATSAPP_NUMBER ? "_blank" : undefined} rel="noreferrer" sourceContext="home" sourceSection="final_cta" ctaName="final_whatsapp" onClick={() => trackEvent("whatsapp_click", { sourceSection: "final_cta", afterDiagnostic: step === 5 })}>Falar no WhatsApp</TrackedLink></div></div></section>; }
