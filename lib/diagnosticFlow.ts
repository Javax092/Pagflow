export function revealDiagnosticFlow() {
  requestAnimationFrame(() => {
    const flow = document.querySelector<HTMLElement>(".express-flow");
    if (!flow) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    flow.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
    flow.querySelector<HTMLElement>("[data-step-heading]")?.focus();
  });
}

/** Campanha e conteúdo da URL atual, para anexar aos eventos. */
export function campaignParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
  };
}
