import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SDR } from "@/components/sections/SDR";
import { MethodAccordion } from "@/components/ui/MethodAccordion";
import { DiagnosticProvider } from "@/components/ui/DiagnosticContext";
import { PageTracker } from "@/components/ui/PageTracker";
import { TrackedLink } from "@/components/ui/TrackedLink";
import backgroundImage from "@/components/public/fundo.jpeg";

export type ServiceLandingConfig = {
  sourceContext: "crm-whatsapp" | "sites" | "sistemas";
  initialProblem: "commercial-process" | "digital-presence" | "operation";
  eyebrow: string; headline: string; subheadline: string; cta: string;
  flow: readonly string[]; problemsTitle: string; problems: readonly string[];
  solutionTitle: string; solutionText: string; capabilities: readonly string[];
  statement: string; statementText: string;
  proof?: readonly { value: string; label: string }[];
  proofText: string;
  comparison?: { before: readonly string[]; after: readonly string[] };
  cases?: boolean;
};

export function ServiceLanding({ config }: { config: ServiceLandingConfig }) {
  return <DiagnosticProvider sourceContext={config.sourceContext} initialProblem={config.initialProblem}>
    <PageTracker sourceContext={config.sourceContext} />
    <div className={`ambient-background service-ambient service-ambient--${config.sourceContext}`} aria-hidden="true"><Image src={backgroundImage} alt="" fill sizes="100vw" /></div>
    <Navbar />
    <main className="service-page">
      <section className="service-hero"><div className="section-container service-hero-grid">
        <div><p className="eyebrow">{config.eyebrow}</p><h1>{config.headline}</h1><p>{config.subheadline}</p>
          <div className="service-actions"><TrackedLink href="#diagnostico" variant="primary" sourceContext={config.sourceContext} location="hero">{config.cta}</TrackedLink>{config.sourceContext === "crm-whatsapp" && <a href="#como-funciona">Ver como funciona ↓</a>}</div>
        </div>
        <ol className="service-flow" aria-label="Fluxo da solução">{config.flow.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </div></section>

      <section className="service-section section-container"><p className="movement-label">01 / Cenário atual</p><div className="service-heading"><h2>{config.problemsTitle}</h2><p>Um processo claro ajuda a equipe a acompanhar o que importa sem depender de controles dispersos.</p></div><ul className="problem-grid">{config.problems.map((item) => <li key={item}>{item}</li>)}</ul></section>

      {config.comparison && <section className="service-section service-comparison section-container"><div><p className="movement-label">Antes</p><ul>{config.comparison.before.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="movement-label">Depois</p><ul>{config.comparison.after.map((item) => <li key={item}>{item}</li>)}</ul></div></section>}

      <section className="service-proof"><div className="section-container service-proof-grid"><div><p className="movement-label">02 / Evidência</p><h2>Realidade antes de promessa.</h2></div>{config.proof ? <dl>{config.proof.map(({ value, label }) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl> : <p>{config.proofText}</p>}</div></section>

      {config.cases && <section className="service-section service-cases section-container"><p className="movement-label">03 / Cases</p><div className="service-heading"><h2>Tecnologia colocada em operação.</h2><p>Dois projetos reais, apresentados sem inflar resultados ou prometer o que não foi medido.</p></div><div className="landing-cases"><article><span>Case 01</span><h3>Gestão de pedidos e atendimento</h3><dl><div><dt>Problema</dt><dd>Pedidos e controles distribuídos entre diferentes pontos da operação.</dd></div><div><dt>Solução</dt><dd>Pedidos, pagamentos, QR Code e acompanhamento em um único fluxo.</dd></div><div><dt>Operação real</dt><dd>Mais de 2.000 pedidos registrados, com operação diária de 25–50 pedidos.</dd></div></dl></article><article><span>Case 02</span><h3>Catálogo, pedidos e estoque</h3><dl><div><dt>Problema</dt><dd>Venda, pedido e estoque precisavam funcionar como partes da mesma operação.</dd></div><div><dt>Solução</dt><dd>Catálogo mobile, central de pedidos e estoque por peso ou unidade.</dd></div><div><dt>Resultado observável</dt><dd>Mais clareza entre venda, pedido e operação.</dd></div></dl></article></div></section>}

      <section className="service-section service-solution" id="como-funciona"><div className="section-container"><p className="movement-label">{config.cases ? "04" : "03"} / Solução</p><div className="service-heading"><h2>{config.solutionTitle}</h2><p>{config.solutionText}</p></div><ul className="capability-grid">{config.capabilities.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ul></div></section>

      <section className="service-section section-container service-statement"><p className="movement-label">{config.cases ? "05" : "04"} / Estratégia</p><h2>{config.statement}</h2><p>{config.statementText}</p>{config.sourceContext === "sites" && <div className="channel-map"><span>Instagram<small>descoberta e relacionamento</small></span><i>→</i><span>Site<small>confiança e conversão</small></span><i>→</i><span>WhatsApp<small>conversa</small></span><i>→</i><span>CRM<small>acompanhamento</small></span></div>}</section>

      <section className="section home-method service-method"><div className="section-container"><p className="movement-label">{config.cases ? "06" : "05"} / Método</p><h2>Entender. Priorizar.<br />Construir. Medir.</h2><MethodAccordion /></div></section>

      <SDR label={`${config.cases ? "07" : "06"} / Diagnóstico`} />
      <section className="service-final"><div className="section-container"><p className="eyebrow">Próximo passo</p><h2>{config.cta}</h2><TrackedLink href="#diagnostico" variant="primary" sourceContext={config.sourceContext} location="final">Iniciar diagnóstico</TrackedLink></div></section>
    </main><Footer />
  </DiagnosticProvider>;
}
