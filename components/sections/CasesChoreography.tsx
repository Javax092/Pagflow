import { ScrollChoreography, type ChoreographyImage } from "@/components/ui/scroll-choreography";
import operationImage from "@/components/public/_ (17).jpeg";
import managementImage from "@/components/public/Your Voice Shapes Tomorrow.jpeg";
import serviceImage from "@/components/public/_ (19).jpeg";
import dataImage from "@/components/public/_ (18).jpeg";

const images = [
  { src: operationImage, alt: "Composição visual de dados representando a operação" },
  { src: managementImage, alt: "Painéis de indicadores representando gestão integrada" },
  { src: serviceImage, alt: "Interfaces conectadas representando atendimento" },
  { src: dataImage, alt: "Central de monitoramento representando dados operacionais" },
] as const satisfies readonly [ChoreographyImage, ChoreographyImage, ChoreographyImage, ChoreographyImage];

export function CasesChoreography() {
  return <section className="cases-choreography" aria-labelledby="choreography-title">
    <div className="section-container choreography-intro">
      <p className="eyebrow">Da rotina à visão integrada</p>
      <h2 id="choreography-title">Quatro frentes.<br />Um único fluxo.</h2>
      <p>Operação, atendimento, gestão e dados deixam de funcionar como pontos isolados.</p>
    </div>
    <ScrollChoreography images={images} />
    <div className="section-container choreography-exit"><span>CASOS EM OPERAÇÃO</span><i /></div>
  </section>;
}
