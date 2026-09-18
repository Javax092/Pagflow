"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { attributionFromUrl, type LeadAttribution } from "@/lib/attribution";

const STORAGE_KEY = "flowtech:first-touch";
const AttributionContext = createContext<LeadAttribution | null>(null);

export function AttributionProvider({ children }: { children: ReactNode }) {
  const [attribution, setAttribution] = useState<LeadAttribution | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as LeadAttribution | null; } catch { return null; }
  });
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return;
      const captured = attributionFromUrl(new URL(window.location.href), document.referrer);
      if (captured) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
        const timer = window.setTimeout(() => setAttribution(captured), 0);
        return () => window.clearTimeout(timer);
      }
    } catch { /* Storage can be disabled; conversion still works without attribution. */ }
  }, []);
  return <AttributionContext.Provider value={attribution}>{children}</AttributionContext.Provider>;
}

export function useAttribution() { return useContext(AttributionContext); }
