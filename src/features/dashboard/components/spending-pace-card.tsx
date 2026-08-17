import { ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Overline } from "@/components/ui/overline";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SpendingPaceData } from "../model/types";

export interface SpendingPaceCardProps {
  data: SpendingPaceData;
}

export function SpendingPaceCard({ data }: SpendingPaceCardProps) {
  return (
    <Card className="p-6 md:p-7 bg-surface-card border-border-hairline rounded-card flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Overline className="text-content-secondary text-micro tracking-wider font-semibold">
          RITMO DE GASTO — ÚLTIMAS 2 SEMANAS
        </Overline>
        <div className="flex items-center gap-1 text-note text-free font-medium">
          <ArrowDown className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
          <span>{data.comparisonLabel}</span>
        </div>
      </div>

      {/* Bar Chart Visual com Acessibilidade */}
      <div
        className="space-y-2"
        role="region"
        aria-label="Gráfico de ritmo de gastos das últimas 2 semanas"
      >
        <div className="h-28 flex items-end justify-between gap-1.5 sm:gap-2 px-1 pt-4">
          {data.days.map((day, idx) => {
            const formattedVal = formatBRL(day.amountCents);
            return (
              <div
                key={day.date || idx}
                className="flex-1 flex flex-col items-center h-full justify-end group relative"
              >
                {/* Bar */}
                <div
                  role="img"
                  title={`${day.label}: ${formattedVal}`}
                  aria-label={`${day.label}: ${formattedVal}`}
                  tabIndex={0}
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-300 focus-visible:outline-ring/60 focus-visible:outline-2",
                    day.isRecent
                      ? "bg-free hover:bg-free-bright shadow-sm"
                      : "bg-track-600 hover:bg-track-500"
                  )}
                  style={{ height: `${Math.max(day.intensity, 12)}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* X-Axis labels */}
        <div className="flex justify-between text-micro text-content-ghost px-1 select-none">
          <span>{data.startDateLabel}</span>
          <span>{data.endDateLabel}</span>
        </div>
      </div>
    </Card>
  );
}
