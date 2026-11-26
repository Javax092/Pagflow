"use client";

import { WHATSAPP_NUMBER } from "@/config/contact";
import { useDiagnostic } from "@/components/ui/DiagnosticContext";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function FinalCta() {
  const { step } = useDiagnostic();
  const whatsapp = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    "Olá! Vim pelo site da FlowtechAM e gostaria de analisar minha operação.",
  );

  return (
    <section className="final-cta">
      <div className="section-container">
        <p className="movement-label">Próximo passo</p>
        <h2>
          Conte onde a sua operação trava. A gente indica por onde começar.
        </h2>
        <div>
          <TrackedLink
            href="#diagnostico"
            variant="primary"
            sourceContext="home"
            sourceSection="final_cta"
            ctaName="final_diagnostic"
          >
            Fazer diagnóstico
          </TrackedLink>
          {whatsapp && <TrackedLink
            href={whatsapp}
            rel="noreferrer"
            sourceContext="home"
            sourceSection="final_cta"
            ctaName="final_whatsapp"
            onClick={() =>
              trackEvent("whatsapp_click", {
                sourceSection: "final_cta",
                afterDiagnostic: step === 5,
              })
            }
          >
            Falar no WhatsApp
          </TrackedLink>}
        </div>
      </div>
    </section>
  );
}
