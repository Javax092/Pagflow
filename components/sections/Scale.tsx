import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

const scale = ["Mais clientes.", "Mais pedidos.", "Mais dados.", "Mais processos.", "Mais decisões."];

export function Scale() {
  return (
    <SectionContainer>
      <Reveal className="scale-stack">
        <h2>Tecnologia que acompanha o crescimento da empresa.</h2>
        {scale.map((item) => (
          <span className="scale-item" key={item}>
            {item}
          </span>
        ))}
        <span className="scale-item scale-final">A tecnologia precisa acompanhar.</span>
      </Reveal>
    </SectionContainer>
  );
}
