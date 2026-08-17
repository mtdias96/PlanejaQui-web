import { Sparkles } from "lucide-react";
import type { InsightData } from "../model/types";

export interface InsightBannerProps {
  data: InsightData;
}

export function InsightBanner({ data }: InsightBannerProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-card bg-surface-elevated/80 border border-border-hairline p-4 md:px-5 text-note text-content-secondary shadow-sm">
      <div className="size-8 rounded-full bg-intention/10 border border-intention/20 flex items-center justify-center shrink-0">
        <Sparkles className="size-4 text-intention" />
      </div>
      <p className="leading-snug">
        <span className="font-semibold text-foreground">{data.prefix}</span>
        <strong className="font-bold text-foreground">{data.highlightText}</strong>
        {data.suffix}
      </p>
    </div>
  );
}
