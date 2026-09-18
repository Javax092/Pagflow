"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { TrackedLink } from "@/components/ui/TrackedLink";
import styles from "./AccordionGallery.module.css";

export type AccordionGalleryItem = { image: StaticImageData; label: string; title: string; description: string; link: string; cta: string; slug: string; alt: string };

export function AccordionGallery({ items, defaultIndex = 1 }: { items: AccordionGalleryItem[]; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = media.matches;
    if (media.matches || !root.current) return;
    let cleanup = () => {};
    void import("gsap").then(({ gsap }) => {
      if (!root.current) return;
      const panels = root.current.querySelectorAll<HTMLElement>("[data-panel]");
      const animate = () => gsap.to(panels, { flexGrow: (index) => index === active ? (innerWidth <= 640 ? 3.2 : 2.6) : 1, duration: .62, ease: "power3.out", overwrite: true });
      animate();
      const observer = new ResizeObserver(animate);
      observer.observe(root.current);
      cleanup = () => { observer.disconnect(); gsap.killTweensOf(panels); };
    });
    return () => cleanup();
  }, [active]);

  const move = (event: KeyboardEvent, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (index + (backward ? -1 : 1) + items.length) % items.length;
    setActive(next);
    root.current?.querySelectorAll<HTMLElement>("[data-panel]")[next]?.focus();
  };
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (reduced.current || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - .5) * -3}deg`);
    event.currentTarget.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 3}deg`);
    event.currentTarget.style.setProperty("--px", `${((event.clientX - rect.left) / rect.width - .5) * -12}px`);
  };
  const selectOrFollow = (event: MouseEvent<HTMLElement>, index: number) => {
    if (active === index && !(event.target as HTMLElement).closest("a")) event.currentTarget.querySelector<HTMLAnchorElement>("a")?.click();
    else setActive(index);
  };

  return <div ref={root} className={styles.gallery} role="tablist" aria-label="Soluções FlowtechAM">
    {items.map((item, index) => <article data-panel key={item.link} tabIndex={0} role="tab" aria-selected={active === index} aria-controls={`solution-${index}`} className={styles.panel} data-active={active === index} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} onKeyDown={(event) => move(event, index)} onPointerMove={tilt} onPointerLeave={(event) => { event.currentTarget.style.removeProperty("--rx"); event.currentTarget.style.removeProperty("--ry"); event.currentTarget.style.removeProperty("--px"); }} onClick={(event) => selectOrFollow(event, index)}>
      <Image className={styles.image} src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 60vw" />
      <div className={styles.scrim} aria-hidden="true" />
      <span className={styles.index}>{item.label}</span>
      <div className={styles.content} id={`solution-${index}`} role="tabpanel">
        <h3>{item.title}</h3><p>{item.description}</p>
        <TrackedLink className={styles.link} href={item.link} sourceContext="home" sourceSection="solutions" ctaName={item.cta} eventData={{ solution: item.slug }}>{item.cta}</TrackedLink>
      </div>
    </article>)}
  </div>;
}
