"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import revealImage from "@/components/public/_ (19).jpeg";

gsap.registerPlugin(ScrollTrigger);

export interface TechnologyRevealProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

const headline = "Quando a operação cresce, a tecnologia precisa acompanhar.";

export function TechnologyReveal({ videoSrc, posterSrc, className = "" }: TechnologyRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-reveal-word]");
      const media = section.querySelector<HTMLElement>("[data-reveal-media]");
      const followUp = section.querySelector<HTMLElement>("[data-reveal-follow-up]");
      const shade = section.querySelector<HTMLElement>("[data-reveal-shade]");
      if (!media || !followUp || !shade) return;

      const createTimeline = (distance: number, startMask: string) => gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: `+=${distance}`, pin: true, scrub: 0.65, invalidateOnRefresh: true, anticipatePin: 1 },
        defaults: { ease: "none" },
      })
        .fromTo(words, { autoAlpha: 0, yPercent: 26, rotate: 2 }, { autoAlpha: 1, yPercent: 0, rotate: 0, stagger: 0.025, duration: 0.18, ease: "power2.out" }, 0)
        .fromTo(media, { clipPath: startMask }, { clipPath: "circle(24% at 57% 51%)", duration: 0.28, ease: "power2.inOut" }, 0.2)
        .to(media, { clipPath: "inset(3% 3% 3% 3% round 0px)", duration: 0.42, ease: "power2.inOut" }, 0.48)
        .fromTo(followUp, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" }, 0.58)
        .to(shade, { opacity: 0.7, duration: 0.22 }, 0.78)
        .to(words, { autoAlpha: 0.16, duration: 0.16 }, 0.78);

      const matchMedia = gsap.matchMedia();
      matchMedia.add("(max-width: 767px)", () => createTimeline(800, "circle(12% at 56% 51%)"));
      matchMedia.add("(min-width: 768px) and (max-width: 1199px)", () => createTimeline(1000, "circle(9% at 58% 50%)"));
      matchMedia.add("(min-width: 1200px)", () => createTimeline(1200, "circle(7% at 58% 49%)"));
      return () => matchMedia.revert();
    }, section);

    return () => context.revert();
  }, []);

  return <section id="technology-reveal" ref={sectionRef} className={`technology-reveal ${className}`.trim()} aria-labelledby="technology-reveal-title">
    <div className="technology-reveal-copy section-container">
      <p className="eyebrow">Tecnologia aplicada</p>
      <h2 id="technology-reveal-title" aria-label={headline}>
        {headline.split(" ").map((word, index) => <span key={`${word}-${index}`} data-reveal-word aria-hidden="true">{word}&nbsp;</span>)}
      </h2>
      <p className="technology-reveal-follow-up" data-reveal-follow-up>Processos deixam de ser improvisos<br />e passam a funcionar como sistema.</p>
    </div>
    <div className="technology-reveal-media" data-reveal-media aria-hidden="true">
      <Image className="technology-reveal-poster" src={revealImage} alt="" fill sizes="100vw" />
      {videoSrc && !videoUnavailable && <video src={videoSrc} poster={posterSrc} autoPlay muted loop playsInline preload="metadata" onError={() => setVideoUnavailable(true)} />}
      <div className="technology-reveal-fallback" />
      <div className="technology-reveal-shade" data-reveal-shade />
    </div>
  </section>;
}
