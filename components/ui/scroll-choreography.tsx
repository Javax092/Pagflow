"use client";

import Image, { type StaticImageData } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ChoreographyImage = {
  src: StaticImageData;
  alt: string;
};

export function ScrollChoreography({ images }: { images: readonly [ChoreographyImage, ChoreographyImage, ChoreographyImage, ChoreographyImage] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    let anchorTimer = 0;
    const alignAnchor = () => {
      ScrollTrigger.refresh();
      if (window.location.hash === "#cases") {
        const section = root.current?.closest("#cases");
        if (section) {
          const scrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 74 });
          requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = scrollBehavior; });
        }
      }
    };
    const initialAlignment = requestAnimationFrame(() => requestAnimationFrame(alignAnchor));
    const onHashChange = () => { anchorTimer = window.setTimeout(alignAnchor, 100); };
    window.addEventListener("hashchange", onHashChange);
    const cleanAnchor = () => {
      cancelAnimationFrame(initialAlignment);
      clearTimeout(anchorTimer);
      window.removeEventListener("hashchange", onHashChange);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanAnchor;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-choreo-card]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-choreo-label]");
      const convergence = root.current!.querySelector<HTMLElement>("[data-convergence]");
      const overlay = root.current!.querySelector<HTMLElement>("[data-final-overlay]");
      const hero = cards[1];
      if (!hero || !convergence || !overlay) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=2100", pin: true, scrub: 0.65, anticipatePin: 1, invalidateOnRefresh: true },
          defaults: { ease: "none" },
        });
        timeline
          .fromTo(cards, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.18 })
          .fromTo(labels, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.03, duration: 0.14 }, 0.06)
          .to(cards, { x: 0, y: 0, duration: 0.28, ease: "power2.inOut" }, 0.3)
          .to(labels, { autoAlpha: 0, duration: 0.1 }, 0.38)
          .fromTo(convergence, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 0.42)
          .to(cards.filter((_, index) => index !== 1), { autoAlpha: 0, scale: 0.9, duration: 0.18 }, 0.55)
          .to(convergence, { autoAlpha: 0, duration: 0.1 }, 0.58)
          .to(hero, { width: "100vw", height: "100svh", x: 0, y: 0, duration: 0.35, ease: "power2.inOut" }, 0.58)
          .fromTo(overlay, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.82);
      });
      mm.add("(max-width: 767px)", () => {
        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=1150", pin: true, scrub: 0.55, anticipatePin: 1, invalidateOnRefresh: true },
          defaults: { ease: "none" },
        })
          .fromTo(cards, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, stagger: 0.04, duration: 0.18 })
          .to(cards, { x: 0, y: 0, duration: 0.25 }, 0.3)
          .to(cards.filter((_, index) => index !== 1), { autoAlpha: 0, duration: 0.16 }, 0.55)
          .to(hero, { width: "100vw", height: "100svh", x: 0, y: 0, duration: 0.34, ease: "power2.inOut" }, 0.58)
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 }, 0.82);
      });
      return () => mm.revert();
    }, root);

    return () => { cleanAnchor(); context.revert(); };
  }, []);

  const labels = ["OPERAÇÃO", "GESTÃO", "ATENDIMENTO", "DADOS"];

  return <div className="scroll-choreography" ref={root}>
    <div className="choreography-stage">
      {images.map((image, index) => <figure className={`choreography-card choreography-card-${index + 1}`} data-choreo-card key={image.alt}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 86vw, 44vw" priority={index === 1} />
        <figcaption data-choreo-label>{labels[index]}</figcaption>
      </figure>)}
      <p className="choreography-convergence" data-convergence>PROCESSOS CONECTADOS</p>
      <div className="choreography-overlay" data-final-overlay>
        <p>VISÃO INTEGRADA</p>
        <div><span>TECNOLOGIA EM OPERAÇÃO</span><strong>Sistemas construídos em torno da realidade de cada operação.</strong></div>
        <small>SISTEMAS · AUTOMAÇÃO · DADOS · IA</small>
      </div>
    </div>
  </div>;
}
