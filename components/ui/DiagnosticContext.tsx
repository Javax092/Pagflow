"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SDRLead } from "@/lib/sdr";
import { useAttribution } from "@/components/ui/AttributionProvider";
import type { LeadAttribution } from "@/lib/attribution";

const initialLead: SDRLead = {
  segment: "commerce",
  painPoint: "manual",
  currentSystem: "partly",
  companySize: "2-5",
  desiredResult: "time",
  name: "",
  company: "",
  whatsapp: "",
  email: "",
};

type DiagnosticState = {
  step: number;
  setStep: (step: number) => void;
  lead: SDRLead;
  setLead: React.Dispatch<React.SetStateAction<SDRLead>>;
  sourceContext: string;
  attribution: LeadAttribution | null;
  initialProblem: string;
  startDiagnostic: (problem: string) => void;
};

const DiagnosticContext = createContext<DiagnosticState | null>(null);

export const initialPainPoints: Record<string, SDRLead["painPoint"]> = { "commercial-process": "sales", operation: "control", "digital-presence": "opportunities", automation: "manual", growth: "sales", discovery: "opportunities" };

export function DiagnosticProvider({ children, sourceContext = "home", initialProblem }: { children: ReactNode; sourceContext?: string; initialProblem?: string }) {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState(initialProblem ?? "");
  const [lead, setLead] = useState({ ...initialLead, painPoint: initialPainPoints[initialProblem ?? ""] ?? initialLead.painPoint });
  const attribution = useAttribution();
  const startDiagnostic = (nextProblem: string) => { setProblem(nextProblem); setLead((old) => ({ ...old, painPoint: initialPainPoints[nextProblem] ?? old.painPoint })); setStep(1); };
  return <DiagnosticContext.Provider value={{ step, setStep, lead, setLead, sourceContext, attribution, initialProblem: problem, startDiagnostic }}>{children}</DiagnosticContext.Provider>;
}

export function useDiagnostic() {
  const value = useContext(DiagnosticContext);
  if (!value) throw new Error("useDiagnostic deve ser usado dentro de DiagnosticProvider");
  return value;
}
