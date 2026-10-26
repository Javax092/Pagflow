import { MethodAccordion } from "@/components/ui/MethodAccordion";

export function Methodology() {
  return (
    <section className="section home-method" id="metodo">
      <div className="section-container">
        <p className="movement-label">04 / Método</p>
        <h2>
          Não começamos pela ferramenta.
          <br />
          Começamos pela operação.
        </h2>
        <MethodAccordion />
      </div>
    </section>
  );
}
