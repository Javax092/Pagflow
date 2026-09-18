import Image from "next/image";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { FlowStepper } from "@/components/ui/FlowStepper";
import diagnosticImage from "@/components/public/_ (18).jpeg";

export function SDR({ label = "05 / Diagnóstico" }: { label?: string }) {
  return (
    <SectionContainer className="sdr-section" id="diagnostico">
      <div className="sdr-intro">
        <p className="movement-label">{label}</p>
        <h2>Onde tecnologia pode gerar mais impacto na sua operação?</h2>
        <p>Responda algumas perguntas rápidas para termos contexto antes da conversa.</p>
      </div>

      <div className="sdr-composition"><div className="sdr-visual" aria-hidden="true"><Image src={diagnosticImage} alt="" fill sizes="(max-width: 620px) 46vw, 22vw" /></div><FlowStepper /></div>
    </SectionContainer>
  );
}
