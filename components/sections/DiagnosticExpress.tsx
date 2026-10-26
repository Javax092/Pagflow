"use client";

import Image from "next/image";
import { useDiagnostic } from "@/components/ui/DiagnosticContext";
import { FlowStepper } from "@/components/ui/FlowStepper";
import { trackEvent } from "@/lib/analytics";
import { campaignParams, revealDiagnosticFlow } from "@/lib/diagnosticFlow";
import diagnosticBackground from "@/components/public/_ (20).jpeg";

const options = [
  ["growth", "Conseguir mais clientes"],
  ["commercial-process", "Organizar clientes e vendas"],
  ["operation", "Organizar a operação"],
  ["automation", "Automatizar tarefas"],
  ["digital-presence", "Criar ou melhorar meu site"],
  ["discovery", "Ainda não sei"],
] as const;

export function DiagnosticExpress() {
  const { sourceContext, startDiagnostic, step } = useDiagnostic();

  const choose = (initialProblem: string) => {
    startDiagnostic(initialProblem);
    trackEvent("diagnostic_start", {
      sourceContext,
      sourceSection: "diagnostic_express",
      initialProblem,
      ...campaignParams(),
    });
    revealDiagnosticFlow();
  };

  return (
    <section className="section diagnostic-express" id="diagnostico">
      <Image
        className="diagnostic-background"
        src={diagnosticBackground}
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="diagnostic-backdrop" aria-hidden="true" />
      <div className="section-container">
        <p className="movement-label">01 / Diagnóstico expresso</p>
        <h2>O que você quer melhorar?</h2>
        <div className="express-grid">
          {options.map(([value, label], index) => (
            <button key={value} type="button" onClick={() => choose(value)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
              <i aria-hidden="true">→</i>
            </button>
          ))}
        </div>
        <div className={`express-flow ${step > 0 ? "active" : ""}`}>
          {step > 0 && <FlowStepper />}
        </div>
      </div>
    </section>
  );
}
