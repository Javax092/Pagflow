"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { WHATSAPP_NUMBER } from "@/config/contact";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { useDiagnostic } from "@/components/ui/DiagnosticContext";
import { trackEvent } from "@/lib/analytics";
import { campaignParams, revealDiagnosticFlow } from "@/lib/diagnosticFlow";

type Service = {
  id: string;
  label: string;
  problem: string; // chave de initialPainPoints em DiagnosticContext
  title: string;
  text: string;
  items: string[];
  fit: string;
  href: string;
  cta: string;
};

const services: Service[] = [
  {
    id: "sites",
    label: "Sites",
    problem: "digital-presence",
    title: "Um site que passa confiança e gera contatos.",
    text: "Presença digital rápida no celular, com mensagem clara e caminho direto para o WhatsApp. Feita para quem pesquisa antes de comprar.",
    items: [
      "Páginas objetivas, pensadas para virar conversa",
      "Visual profissional alinhado à sua marca",
      "Campanhas medidas desde o primeiro clique",
    ],
    fit: "Empresas que hoje dependem só de Instagram e indicação.",
    href: "/sites",
    cta: "Conhecer sites",
  },
  {
    id: "crm-whatsapp",
    label: "CRM + WhatsApp",
    problem: "commercial-process",
    title: "Cada cliente e cada oportunidade no lugar certo.",
    text: "O WhatsApp conectado a um processo comercial claro: ninguém fica sem resposta e nenhuma venda se perde na conversa.",
    items: [
      "Funil com todos os contatos organizados",
      "Follow-ups combinados, sem depender da memória do time",
      "Histórico completo de cada cliente em um só lugar",
    ],
    fit: "Times que vendem pelo WhatsApp e perderam o controle.",
    href: "/crm-whatsapp",
    cta: "Conhecer CRM",
  },
  {
    id: "sistemas",
    label: "Sistemas",
    problem: "operation",
    title: "Processos manuais viram uma operação centralizada.",
    text: "Pedidos, estoque, pagamentos e acompanhamento em um fluxo único, já validado em operação real com dezenas de pedidos por dia.",
    items: [
      "Pedidos, estoque e pagamentos conectados",
      "Acesso pelo celular para equipe e clientes",
      "Construído sobre o seu processo, não sobre um modelo pronto",
    ],
    fit: "Negócios que vivem de planilha, papel e recado solto.",
    href: "/sistemas",
    cta: "Conhecer sistemas",
  },
  {
    id: "automacoes",
    label: "Automações",
    problem: "automation",
    title: "Tarefas repetitivas passam a rodar sozinhas.",
    text: "Avisos, cobranças e atualizações acontecem automaticamente, e a equipe usa o tempo no que exige gente.",
    items: [
      "Mensagens e avisos automáticos para clientes",
      "Integração entre as ferramentas que você já usa",
      "Menos erro, menos retrabalho, mais velocidade",
    ],
    fit: "Quem repete as mesmas tarefas todo dia e quer ganhar horas.",
    href: "/sistemas",
    cta: "Ver automações",
  },
];

const whatsapp = WHATSAPP_NUMBER;
const section = "services";

export function Services() {
  const { sourceContext, startDiagnostic } = useDiagnostic();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = services[active];

  const waHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Olá! Vim pelo site da FlowtechAM e quero conversar sobre ${current.label}.`,
      )}`
    : null;

  function select(index: number, focus = false) {
    setActive(index);
    trackEvent("service_view", {
      sourceContext,
      sourceSection: section,
      service: services[index].id,
    });
    if (focus) refs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent, index: number) {
    const last = services.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      select(index === last ? 0 : index + 1, true);
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      select(index === 0 ? last : index - 1, true);
    else return;
    event.preventDefault();
  }

  function openDiagnostic() {
    trackEvent("diagnostic_start", {
      sourceContext,
      sourceSection: section,
      initialProblem: current.problem,
      ...campaignParams(),
    });
    startDiagnostic(current.problem);
    revealDiagnosticFlow();
  }

  return (
    <section
      className="section services-tabs"
      id="solucoes"
      aria-labelledby="services-title"
    >
      <div className="section-container">
        <p className="movement-label">Soluções</p>
        <div className="section-intro">
          <h2 id="services-title">
            O que a FlowtechAM constrói para a sua operação.
          </h2>
          <p>
            Quatro frentes que se conectam. Você começa por uma e cresce para as
            outras.
          </p>
        </div>

        <div className="line-sidebar-composition services-composition">
          <div
            className="line-sidebar"
            role="tablist"
            aria-label="Serviços"
            aria-orientation="vertical"
          >
            {services.map((service, index) => (
              <button
                key={service.id}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                id={`service-tab-${service.id}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="service-panel"
                tabIndex={active === index ? 0 : -1}
                className={active === index ? "active" : undefined}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="line-sidebar-marker" aria-hidden="true" />
                <span className="line-sidebar-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{service.label}</span>
              </button>
            ))}
          </div>

          <div
            className="line-sidebar-description services-panel"
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${current.id}`}
          >
            <strong>{current.title}</strong>
            <p>{current.text}</p>
            <ul>
              {current.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="services-fit">
              <span className="column-label">Ideal para</span>
              {current.fit}
            </p>
            <div className="services-actions">
              <button type="button" className="button" onClick={openDiagnostic}>
                Fazer diagnóstico sobre isso
              </button>
              <TrackedLink
                href={current.href}
                variant="primary"
                sourceContext={sourceContext}
                sourceSection={section}
                ctaName={current.cta}
              >
                {current.cta}
              </TrackedLink>
              {waHref ? (
                <a
                  className="button subtle"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      sourceContext,
                      sourceSection: section,
                      service: current.id,
                    })
                  }
                >
                  Falar no WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
