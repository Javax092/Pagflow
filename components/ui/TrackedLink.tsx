"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function TrackedLink({ sourceContext, sourceSection, ctaName, location, eventData, ...props }: ComponentProps<typeof Button> & { sourceContext: string; sourceSection?: string; ctaName?: string; location?: string; eventData?: Record<string, unknown> }) {
  return <Button {...props} onClick={(event) => { const params = new URLSearchParams(window.location.search); trackEvent("cta_click", { sourceContext, sourceSection: sourceSection ?? location, ctaName: ctaName ?? String(props.children), campaign: params.get("utm_campaign") ?? undefined, content: params.get("utm_content") ?? undefined, ...eventData }); props.onClick?.(event); }} />;
}
