"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import construirImage from "@/components/public/constuir.jpeg";
import entenderImage from "@/components/public/entender.jpeg";
import medirImage from "@/components/public/medir.jpeg";
import priorizarImage from "@/components/public/priorizar.jpeg";

type Step = { title: string; text: string; outcome: string; image: StaticImageData };

const steps: readonly Step[] = [
  { title: "Entender", text: "Mapeamos processo, pessoas, dados e pontos de atrito.", outcome: "Problema claramente definido.", image: entenderImage },
  { title: "Priorizar", text: "Identificamos onde tecnologia gera maior impacto com menor complexidade.", outcome: "Escopo recomendado.", image: priorizarImage },
  { title: "Construir", text: "Colocamos a solução em uso real.", outcome: "Produto funcional.", image: construirImage },
  { title: "Medir", text: "Acompanhamos uso e oportunidades de evolução.", outcome: "Próximo ponto de melhoria.", image: medirImage },
];
export function MethodAccordion() {
  const [active, setActive] = useState(0); const root = useRef<HTMLDivElement>(null);
  const keydown = (event: KeyboardEvent, index: number) => { if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return; event.preventDefault(); const back = event.key === "ArrowLeft" || event.key === "ArrowUp"; const next = event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : (index + (back ? -1 : 1) + steps.length) % steps.length; setActive(next); root.current?.querySelectorAll<HTMLElement>("article")[next]?.focus(); };
  const tilt = (event: PointerEvent<HTMLElement>) => { if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return; const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--method-tilt", `${((event.clientX - rect.left) / rect.width - .5) * 2}deg`); };
  return <div className="method-accordion" ref={root} role="tablist" aria-label="Etapas do método">{steps.map(({ title, text, outcome, image }, index) => <article key={title} role="tab" tabIndex={0} aria-selected={active === index} data-active={active === index} onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} onKeyDown={(event) => keydown(event, index)} onPointerMove={tilt} onPointerLeave={(event) => event.currentTarget.style.removeProperty("--method-tilt")}><span className="method-index">{String(index + 1).padStart(2, "0")}</span><div className="method-media" aria-hidden="true"><div className="method-image"><Image src={image} alt="" fill sizes="(max-width: 640px) 84vw, (max-width: 1000px) 55vw, 30vw" /></div></div><div className="method-copy"><h3>{title}</h3><p>{text}</p><small><b>Saída /</b> {outcome}</small></div></article>)}</div>;
}
