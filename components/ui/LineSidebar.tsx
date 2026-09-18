"use client";

import { useEffect, useRef, useState } from "react";

export interface LineSidebarItem {
  title: string;
  description: string;
}

export interface LineSidebarProps {
  items: readonly LineSidebarItem[];
  maxShift?: number;
  proximityRadius?: number;
}

export function LineSidebar({ items, maxShift = 14, proximityRadius = 150 }: LineSidebarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const respondToPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    const pointerY = event.clientY;
    frameRef.current = requestAnimationFrame(() => {
      listRef.current?.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
        const bounds = button.getBoundingClientRect();
        const distance = Math.abs(pointerY - (bounds.top + bounds.height / 2));
        const shift = Math.max(0, 1 - distance / proximityRadius) * maxShift;
        button.style.setProperty("--proximity-shift", `${shift}px`);
      });
    });
  };

  const resetPosition = () => {
    listRef.current?.querySelectorAll<HTMLButtonElement>("button").forEach((button) => button.style.setProperty("--proximity-shift", "0px"));
  };

  return (
    <div className="line-sidebar-composition">
      <div ref={listRef} className="line-sidebar" onPointerMove={respondToPointer} onPointerLeave={resetPosition}>
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            onPointerEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            aria-pressed={activeIndex === index}
          >
            <span className="line-sidebar-marker" aria-hidden="true" />
            <span className="line-sidebar-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div className="line-sidebar-description" aria-live="polite">
        <strong>{items[activeIndex].title}</strong>
        <p>{items[activeIndex].description}</p>
      </div>
    </div>
  );
}
