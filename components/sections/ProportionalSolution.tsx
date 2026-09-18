import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function ProportionalSolution() {
  return (
    <SectionContainer className="contrast">
      <div className="contrast-grid">
        <Reveal>
          <h2>Nem todo problema precisa de um sistema enorme.</h2>
        </Reveal>
        <Reveal className="contrast-copy">
          <strong>Às vezes, uma automação resolve.</strong>
          <span>Em outros casos, é necessário construir uma plataforma inteira.</span>
          <span>Nosso trabalho é encontrar a solução proporcional ao problema.</span>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
