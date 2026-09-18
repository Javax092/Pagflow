"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "@/config/contact";
import { buildWhatsAppUrl, labels, type SDRLead } from "@/lib/sdr";
import { useDiagnostic } from "@/components/ui/DiagnosticContext";
import { trackEvent } from "@/lib/analytics";

type ChoiceStep = "painPoint" | "segment" | "currentSystem" | "companySize" | "desiredResult";

const steps: readonly { key: ChoiceStep; label: string; question: string; helper?: string }[] = [
  { key: "painPoint", label: "Seu objetivo", question: "O que você quer melhorar?" },
  { key: "segment", label: "Principal gargalo", question: "Qual opção mais se aproxima da sua empresa?" },
  { key: "currentSystem", label: "Como funciona hoje", question: "Como essa parte da operação funciona hoje?" },
  { key: "companySize", label: "Volume / frequência", question: "Quantas pessoas participam dessa operação?", helper: "Uma estimativa já ajuda a dimensionar a solução." },
  { key: "desiredResult", label: "Resultado desejado", question: "Qual mudança faria mais diferença agora?" },
];

const recommendations: Record<SDRLead["painPoint"], string[]> = {
  manual: ["Automação de processos", "Centralização operacional", "Indicadores de produtividade"],
  scattered: ["Centralização operacional", "Integração de ferramentas", "Dados e indicadores"],
  service: ["Automação de atendimento", "CRM e histórico do cliente", "Indicadores de resposta"],
  control: ["Sistema operacional", "Dashboard de gestão", "Integração de dados"],
  sales: ["CRM e processo comercial", "Automação de follow-up", "Indicadores comerciais"],
  opportunities: ["Mapeamento da operação", "Priorização de gargalos", "Diagnóstico de dados e integrações"],
};

export function FlowStepper({ compact = false }: { compact?: boolean }) {
  const { step, setStep, lead, setLead, sourceContext, attribution } = useDiagnostic();
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<("name" | "company" | "whatsapp")[]>([]);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const complete = step === 5;

  const navigate = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setErrors([]);
    setStep(next);
    trackEvent("diagnostic_step", { sourceContext, sourceSection: "diagnostic", step: next + 1 });
  };

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing = (["name", "company", "whatsapp"] as const).filter((field) => !lead[field].trim());
    setErrors(missing);
    if (missing.length) {
      document.getElementById(`${formId}-${missing[0]}`)?.focus();
      return;
    }
    setSubmitState("loading");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
        name: lead.name, company: lead.company, whatsapp: lead.whatsapp, email: lead.email,
        problem: lead.painPoint, segment: lead.segment, companySize: lead.companySize, currentSystem: lead.currentSystem,
        desiredResult: lead.desiredResult, sourceContext, landingPage: attribution?.landingPage ?? window.location.pathname,
        ...attribution, convertedAt: new Date().toISOString(), website: new FormData(event.currentTarget).get("website"),
      }) });
      if (!response.ok) throw new Error("lead");
      setSubmitState("success");
      trackEvent("diagnostic_complete", { sourceContext });
      trackEvent("lead_created", { sourceContext });
      trackEvent("qualified_lead", { sourceContext });
      if (whatsappUrl) { trackEvent("whatsapp_click", { sourceContext, afterDiagnostic: true }); window.open(whatsappUrl, "_blank", "noopener,noreferrer"); }
    } catch { setSubmitState("error"); }
  };

  const current = steps[Math.min(step, 4)];
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, lead, sourceContext);
  const variants = {
    enter: (travel: number) => ({ opacity: 0, x: reducedMotion ? 0 : travel * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (travel: number) => ({ opacity: 0, x: reducedMotion ? 0 : travel * -24 }),
  };

  return (
    <div className={`flow-stepper ${compact ? "compact" : ""}`} ref={contentRef}>
      <div className="sdr-topline"><span>{complete ? "Diagnóstico inicial" : current.label}</span><span>{String(Math.min(step + 1, 5)).padStart(2, "0")} / 05</span></div>
      <div className="sdr-progress" role="progressbar" aria-label="Progresso do diagnóstico" aria-valuemin={1} aria-valuemax={5} aria-valuenow={Math.min(step + 1, 5)}><motion.span animate={{ width: `${(Math.min(step + 1, 5) / 5) * 100}%` }} transition={{ duration: reducedMotion ? 0 : 0.38 }} /></div>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}>
          {!complete && <fieldset className="sdr-step">
            <legend data-step-heading tabIndex={-1}>{current.question}</legend>
            {current.helper && <p className="sdr-helper">{current.helper}</p>}
            <div className="sdr-options">{Object.entries(labels[current.key]).map(([value, label], index) => {
              const selected = lead[current.key] === value;
              return <button key={value} type="button" className={selected ? "selected" : ""} onClick={() => setLead((old) => ({ ...old, [current.key]: value }))} aria-pressed={selected}><span className="sdr-option-index">{String(index + 1).padStart(2, "0")}</span><span>{label}</span><span className="sdr-option-mark" aria-hidden="true">{selected ? "●" : ""}</span></button>;
            })}</div>
            <div className="sdr-navigation"><button className="sdr-back" type="button" disabled={step === 0} onClick={() => navigate(step - 1)}>← Voltar</button><button className="sdr-next" type="button" onClick={() => navigate(step + 1)}>{step === 4 ? "Ver diagnóstico" : "Continuar"} →</button></div>
          </fieldset>}
          {complete && <div className="sdr-step sdr-result">
            <p className="column-label">Diagnóstico inicial</p><h3 data-step-heading tabIndex={-1}>Existem oportunidades principalmente em:</h3>
            <ul>{recommendations[lead.painPoint].map((item) => <li key={item}>{item}</li>)}</ul><p>O próximo passo é validar essas hipóteses com o contexto real da operação.</p>
            <form className="sdr-fields" onSubmit={submitContact} noValidate>{([ ["name", "Nome", "text"], ["company", "Empresa", "text"], ["whatsapp", "WhatsApp", "tel"], ["email", "E-mail (opcional)", "email"] ] as const).map(([field, label, type]) => <label key={field}><span>{label}</span><input id={`${formId}-${field}`} type={type} value={lead[field]} autoComplete={field === "name" ? "name" : field === "whatsapp" ? "tel" : field === "email" ? "email" : "organization"} aria-invalid={field !== "email" && errors.includes(field)} onChange={(event) => setLead({ ...lead, [field]: event.target.value })} />{field !== "email" && errors.includes(field) && <small>Preencha este campo.</small>}</label>)}<input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="sdr-whatsapp" type="submit" disabled={submitState === "loading"}>{submitState === "loading" ? "Registrando…" : "Continuar no WhatsApp →"}</button></form>
            <p className={`submit-status ${submitState}`} role="status">{submitState === "success" ? "Contato registrado. Abrimos o WhatsApp para continuar." : submitState === "error" ? <>Não foi possível registrar agora. {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click", { sourceContext, afterDiagnostic: true, leadPersisted: false })}>Continuar pelo WhatsApp sem registro.</a>}</> : ""}</p>
            <button className="sdr-back" type="button" onClick={() => navigate(4)}>← Revisar resposta</button>
          </div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
