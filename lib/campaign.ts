export type HeroContent = {
  label: string;
  headline: string;
  subheadline: string;
  cta: string;
};

export const defaultHero: HeroContent = {
  label: "FlowtechAM / Tecnologia aplicada",
  headline:
    "Sua empresa não precisa de mais trabalho manual. Precisa de um fluxo.",
  subheadline:
    "Sistemas, CRM com WhatsApp, automações e sites feitos a partir de como a sua operação realmente funciona, aqui em Manaus.",
  cta: "Analisar minha operação",
};

const variants: { terms: string[]; content: HeroContent }[] = [
  {
    terms: [
      "crm_whatsapp",
      "crm_followup",
      "crm_lead_perdido",
      "crm_whatsapp_desorganizado",
    ],
    content: {
      label: "CRM + WhatsApp",
      headline:
        "O cliente chamou no WhatsApp. Quem respondeu, e quem vai voltar a falar com ele?",
      subheadline:
        "Organize contatos, oportunidades e retornos em um só lugar, antes que o próximo cliente fique sem resposta.",
      cta: "Analisar meu processo comercial",
    },
  },
  {
    terms: ["site_profissional", "site_captacao", "site_sem_presenca"],
    content: {
      label: "Sites / Presença digital",
      headline:
        "Quem pesquisa o nome da sua empresa encontra um site, ou só o Instagram?",
      subheadline:
        "Um site rápido, claro e com caminho direto para o WhatsApp transforma quem pesquisa em quem chama.",
      cta: "Avaliar minha presença digital",
    },
  },
  {
    terms: [
      "sistemas",
      "sistema_planilhas",
      "sistema_processos_manuais",
      "sistema_falta_controle",
    ],
    content: {
      label: "Sistemas / Operação",
      headline:
        "Pedido no WhatsApp, estoque em planilhas e a conta na cabeça de alguém?",
      subheadline:
        "Veja onde um sistema sob medida organiza a operação e acaba com o retrabalho.",
      cta: "Mapear minha operação",
    },
  },
];

export function heroForCampaign(campaign = "", content = "") {
  const value = `${campaign} ${content}`.toLowerCase();
  return (
    variants.find(({ terms }) => terms.some((term) => value.includes(term)))
      ?.content ?? defaultHero
  );
}
