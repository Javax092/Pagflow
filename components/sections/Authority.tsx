import { SectionContainer } from "@/components/ui/SectionContainer";
const proof = [["2.000+", "Pedidos registrados"], ["25–50", "Pedidos/dia em operação"]];
export function Authority() { return <SectionContainer className="authority"><p className="movement-label">Tecnologia em operação real.</p><div className="authority-grid">{proof.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}<p>Projetos construídos para operações reais, não apenas apresentações.</p></div></SectionContainer>; }
