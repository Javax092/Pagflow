import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

const words = ["Operações.", "Pedidos.", "Dados.", "Atendimento.", "Automação.", "Gestão.", "Comercial."];
const scale = ["Mais clientes.", "Mais pedidos.", "Mais dados.", "Mais processos.", "Mais decisões."];

export function Experience() {
  return (
    <SectionContainer id="empresa" className="movement movement-scale">
      <p className="movement-label">03 / Capacidade e escala</p>
      <div className="experience-grid">
        <Reveal>
          <h2 className="section-heading">Experiência aplicada.</h2>
          <p className="experience-copy">
            Já desenvolvemos soluções envolvendo operações comerciais, atendimento, pedidos, gestão, dados, automação e experiências digitais.
          </p>
        </Reveal>
        <Reveal className="word-field" aria-label="Áreas de experiência">
          {words.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </Reveal>
      </div>
      <div className="scale-flow">
        <Reveal className="scale-list">
          {scale.map((item) => <span key={item}>{item}</span>)}
        </Reveal>
        <Reveal className="scale-statement">
          <p>Tecnologia que acompanha o crescimento da empresa.</p>
          <strong>A tecnologia precisa acompanhar.</strong>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
