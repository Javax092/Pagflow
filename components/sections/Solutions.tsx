import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

const solutions = [
  {
    title: "Operações",
    text: "Sistemas internos para organizar processos, informações, equipes e rotinas.",
  },
  {
    title: "Comercial",
    text: "Tecnologia para acompanhar oportunidades, organizar clientes e tornar processos comerciais mais eficientes.",
  },
  {
    title: "Automação",
    text: "Fluxos que eliminam tarefas repetitivas e conectam ferramentas.",
  },
  {
    title: "Dados",
    text: "Indicadores e estruturas que ajudam empresas a entender melhor suas operações.",
  },
  {
    title: "Inteligência Artificial",
    text: "IA aplicada a processos reais de atendimento, análise e operação.",
  },
  {
    title: "Experiências Digitais",
    text: "Sites e plataformas desenvolvidos para representar empresas com profissionalismo.",
  },
];

export function Solutions() {
  return (
    <SectionContainer id="solucoes">
      <Reveal>
        <h2 className="section-heading">O que podemos transformar</h2>
      </Reveal>
      <div className="solution-list">
        {solutions.map((solution, index) => (
          <Reveal key={solution.title}>
            <article className="solution-row">
              <span className="solution-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
