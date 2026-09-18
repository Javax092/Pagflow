import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function Philosophy() {
  return (
    <SectionContainer className="philosophy">
      <Reveal>
        <p className="split-line">
          Tecnologia não deveria adicionar complexidade.
          <strong>Deveria remover.</strong>
        </p>
      </Reveal>
    </SectionContainer>
  );
}
