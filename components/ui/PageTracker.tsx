"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function PageTracker({ sourceContext }: { sourceContext: string }) {
  useEffect(() => { trackEvent("landing_view", { sourceContext }); trackEvent("service_view", { sourceContext }); }, [sourceContext]);
  return null;
}
