import Image from "next/image";
import { TrackedLink } from "@/components/ui/TrackedLink";
import ordersImage from "@/components/public/_ (18).jpeg";
import catalogImage from "@/components/public/Your Voice Shapes Tomorrow.jpeg";

const cases = [
  {
    title: "Gestão de pedidos e atendimento",
    image: ordersImage,
    alt: "Tela do sistema de gestão de pedidos e atendimento",
    problem: "Pedidos e controles espalhados por vários pontos da operação.",
    solution:
      "Pedidos, pagamentos, QR Code e acompanhamento em um único fluxo.",
    operation: "2.000+ pedidos registrados, com 25–50 pedidos por dia.",
  },
  {
    title: "Catálogo, pedidos e estoque",
    image: catalogImage,
    alt: "Tela do catálogo, pedidos e estoque",
    problem:
      "Venda, pedido e estoque precisavam funcionar como uma operação só.",
    solution:
      "Catálogo no celular, central de pedidos e estoque por peso ou unidade.",
    operation: "Do catálogo ao controle de estoque, tudo no mesmo fluxo.",
  },
];

export function Cases() {
  return (
    <section className="section home-cases" id="cases">
      <div className="section-container">
        <p className="movement-label">02 / Cases</p>
        {/* header (e não div) para não herdar as regras de ".home-cases > div > div" */}
        <header className="section-intro">
          <h2>Tecnologia colocada em operação.</h2>
          <p>
            Projetos construídos para operações reais, não apenas apresentações.
          </p>
        </header>
        <div>
          {cases.map((item) => (
            <article key={item.title}>
              <div className="home-case-image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
              </div>
              <div>
                <h3>{item.title}</h3>
                <dl>
                  <dt>Antes</dt>
                  <dd>{item.problem}</dd>
                  <dt>Agora</dt>
                  <dd>{item.solution}</dd>
                  <dt>Em uso</dt>
                  <dd>{item.operation}</dd>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <p className="cases-more">
          <TrackedLink
            href="/cases"
            sourceContext="home"
            sourceSection="cases"
            ctaName="ver_cases_completos"
          >
            Ver cases completos
          </TrackedLink>
        </p>
      </div>
    </section>
  );
}
