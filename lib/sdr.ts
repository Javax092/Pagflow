export type Segment = "commerce" | "services" | "food" | "health" | "industry" | "other";
export type PainPoint = "manual" | "scattered" | "service" | "control" | "sales" | "opportunities";
export type CurrentSystem = "yes" | "partly" | "no";
export type CompanySize = "solo" | "2-5" | "6-20" | "20+";
export type DesiredResult = "time" | "control" | "sales" | "service" | "scale";

export interface SDRLead {
  segment: Segment;
  painPoint: PainPoint;
  currentSystem: CurrentSystem;
  companySize: CompanySize;
  desiredResult: DesiredResult;
  name: string;
  company: string;
  whatsapp: string;
  email: string;
}

export const labels = {
  segment: { commerce: "Comércio", services: "Serviços", food: "Alimentação", health: "Saúde", industry: "Indústria", other: "Outra" },
  painPoint: { manual: "Processos manuais", scattered: "Informações espalhadas", service: "Atendimento", control: "Controle da operação", sales: "Processo comercial", opportunities: "Quero descobrir oportunidades" },
  currentSystem: { yes: "Já utilizamos um sistema.", partly: "Utilizamos algumas ferramentas separadas.", no: "Grande parte ainda é manual." },
  companySize: { solo: "1 pessoa", "2-5": "2–5", "6-20": "6–20", "20+": "20+" },
  desiredResult: { time: "Reduzir trabalho manual", control: "Ter mais controle", sales: "Vender e acompanhar melhor", service: "Melhorar o atendimento", scale: "Preparar a operação para crescer" },
} as const;

const contextOpenings: Record<string, string> = {
  "crm-whatsapp": "gostaria de analisar meu processo comercial.",
  sites: "gostaria de criar ou melhorar o site da minha empresa.",
  sistemas: "gostaria de mapear um processo da minha operação.",
};

export function buildWhatsAppMessage(lead: SDRLead, sourceContext = "home") {
  return [
    `Olá! Vim pelo site da FlowtechAM e ${contextOpenings[sourceContext] ?? "gostaria de analisar minha operação."}`,
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Segmento: ${labels.segment[lead.segment]}`,
    `Principal desafio: ${labels.painPoint[lead.painPoint]}`,
    `Sistema atual: ${labels.currentSystem[lead.currentSystem]}`,
    `Tamanho da operação: ${labels.companySize[lead.companySize]}`,
    `Resultado desejado: ${labels.desiredResult[lead.desiredResult]}`,
    "",
    "Gostaria de conversar sobre possíveis melhorias.",
  ].join("\n");
}

export function buildWhatsAppUrl(number: string, lead: SDRLead, sourceContext?: string) {
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(lead, sourceContext))}` : "";
}
