"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

interface MaskedHeadingStyle extends CSSProperties {
  "--mask-x": string;
  "--mask-y": string;
  "--mask-scale": number;
  "--mask-brightness": number;
  "--mask-saturation": number;
}

export interface MaskedHeadingProps {
  children: string;
  src: string;
  className?: string;
  fillScale?: number;
  parallax?: number;
  drift?: number;
  brightness?: number;
  saturation?: number;
}

export function MaskedHeading({
  children,
  src,
  className = "",
  fillScale = 1.3,
  parallax = 16,
  drift = 6,
  brightness = 0.96,
  saturation = 0.78,
}: MaskedHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(element, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" });
    }, element);

    if (coarsePointer) return () => context.revert();

    const xTo = gsap.quickTo(element, "--mask-x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "--mask-y", { duration: 0.8, ease: "power3.out" });
    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      xTo(50 + ((event.clientX - bounds.left) / bounds.width - 0.5) * parallax);
      yTo(50 + ((event.clientY - bounds.top) / bounds.height - 0.5) * drift);
    };
    const onPointerLeave = () => { xTo(50); yTo(50); };

    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);
    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      context.revert();
    };
  }, [drift, parallax]);

  const style: MaskedHeadingStyle = {
    backgroundImage: `linear-gradient(rgba(165, 226, 233, .5), rgba(165, 226, 233, .5)), url(${src})`,
    "--mask-x": "50%",
    "--mask-y": "50%",
    "--mask-scale": fillScale,
    "--mask-brightness": brightness,
    "--mask-saturation": saturation,
  };

  return <span ref={ref} className={`masked-heading ${className}`.trim()} style={style}>{children}</span>;
}
