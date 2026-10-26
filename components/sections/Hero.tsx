"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { useDiagnostic } from "@/components/ui/DiagnosticContext";
import { defaultHero, heroForCampaign } from "@/lib/campaign";
import { trackEvent } from "@/lib/analytics";
import { campaignParams, revealDiagnosticFlow } from "@/lib/diagnosticFlow";
import roomVibe from "@/components/public/Room Vibe Styles Art 038.jpeg";

// [rótulo exibido, chave do diagnóstico (initialPainPoints)]
const painPoints = [
  ["WhatsApp", "commercial-process"],
  ["Planilhas", "operation"],
  ["Papel", "operation"],
  ["Tarefas manuais", "automation"],
  ["Informações espalhadas", "operation"],
] as const;

export function Hero() {
  const [content, setContent] = useState(defaultHero);
  const { sourceContext, startDiagnostic } = useDiagnostic();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const p = new URLSearchParams(window.location.search);
      setContent(
        heroForCampaign(
          p.get("utm_campaign") ?? "",
          p.get("utm_content") ?? "",
        ),
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function pick(label: string, initialProblem: string) {
    trackEvent("diagnostic_start", {
      sourceContext,
      sourceSection: "hero_pain_signal",
      ctaName: label,
      initialProblem,
      ...campaignParams(),
    });
    startDiagnostic(initialProblem);
    revealDiagnosticFlow();
  }

  return (
    <section className="hero">
      <Image
        className="hero-background"
        src={roomVibe}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="section-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">{content.label}</p>
          <h1>{content.headline}</h1>
          <p className="hero-lede">{content.subheadline}</p>
          <div className="hero-actions">
            <div>
              <TrackedLink
                href="#diagnostico"
                variant="primary"
                sourceContext="home"
                sourceSection="hero"
                ctaName="hero_diagnostic"
              >
                {content.cta}
              </TrackedLink>
              <small>
                Diagnóstico inicial <i /> sem compromisso <i /> 3–5 minutos
              </small>
            </div>
          </div>
        </div>

        <aside
          className="pain-signal"
          aria-label="Pontos comuns de uma operação manual"
        >
          <span>Sua operação hoje</span>
          <ul>
            {painPoints.map(([label, problem]) => (
              <li key={label}>
                <button type="button" onClick={() => pick(label, problem)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <strong>Toque no que você reconhece e veja por onde começar.</strong>
          <TrackedLink
            href="#diagnostico"
            sourceContext="home"
            sourceSection="hero"
            ctaName="hero_visual_diagnostic"
          >
            Fazer diagnóstico
          </TrackedLink>
        </aside>

        <div className="hero-transition">
          <span>Tecnologia construída para uso real</span>
          <i aria-hidden="true" />
          <small>2.000+ pedidos registrados · 25–50 por dia em operação</small>
        </div>
      </div>
    </section>
  );
}
