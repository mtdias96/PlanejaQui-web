import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Overline } from "@/components/ui/overline";
import { Money } from "@/components/ui/money";
import { calculateMonthProgress } from "../model/compute";
import type { ForecastData } from "../model/types";

export interface ForecastCardProps {
  data: ForecastData;
}

export function ForecastCard({ data }: ForecastCardProps) {
  const progress = calculateMonthProgress(data.currentDay, data.totalDays);
  // Clampar a posição do texto para evitar sobreposição nos dias 1 e 31 em telas estreitas
  const safeLabelPosition = Math.min(Math.max(progress, 14), 86);

  return (
    <Card className="p-6 md:p-7 bg-surface-card border-border-hairline rounded-card flex flex-col gap-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Overline className="text-content-secondary text-micro tracking-wider font-semibold">
          PREVISÃO DE {data.monthName}
        </Overline>
        <Badge
          variant="outline"
          className="border-free/30 bg-free/10 text-free text-xs font-semibold px-2.5 py-0.5 rounded-full"
        >
          {data.statusText}
        </Badge>
      </div>

      {/* Main Metric */}
      <div className="space-y-1">
        <p className="text-note text-free font-medium">
          Sobra prevista no fim do mês
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-display font-extrabold tracking-tight text-foreground">
            +
          </span>
          <Money
            cents={data.projectedSurplusCents}
            size="display"
            className="font-extrabold tracking-tight text-foreground"
          />
        </div>
      </div>

      {/* Progress Timeline com Semântica WAI-ARIA */}
      <div className="space-y-2 pt-1">
        <div
          role="progressbar"
          aria-label="Progresso do mês"
          aria-valuenow={data.currentDay}
          aria-valuemin={1}
          aria-valuemax={data.totalDays}
          aria-valuetext={`Dia ${data.currentDay} de ${data.totalDays}`}
          className="relative w-full h-1.5 bg-surface-input rounded-full overflow-visible"
        >
          {/* Active progress bar */}
          <div
            className="absolute top-0 left-0 h-full bg-free rounded-full"
            style={{ width: `${progress}%` }}
          />

          {/* Marker Dot for Today */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 -translate-y-1/2 size-3.5 bg-free rounded-full border-2 border-surface-card shadow-sm -ml-1.5"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Timeline labels com proteção de colisão nos extremos */}
        <div className="relative flex justify-between text-micro text-content-ghost pt-1 select-none">
          <span>1 {data.monthName.slice(0, 3).toLowerCase()}</span>
          <span
            className="absolute -translate-x-1/2 text-free font-medium"
            style={{ left: `${safeLabelPosition}%` }}
          >
            hoje - dia {data.currentDay}
          </span>
          <span>
            {data.totalDays} {data.monthName.slice(0, 3).toLowerCase()}
          </span>
        </div>
      </div>

      {/* 4 Bottom Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-divider">
        <div className="space-y-1">
          <Overline className="text-micro text-content-faint">RITMO / DIA</Overline>
          <div>
            <Money cents={data.dailyPaceCents} size="title" className="font-bold text-foreground" />
          </div>
        </div>

        <div className="space-y-1">
          <Overline className="text-micro text-content-faint">FIXAS A VIR</Overline>
          <div>
            <Money cents={data.pendingFixedCents} size="title" tone="warning" className="font-bold" />
          </div>
        </div>

        <div className="space-y-1">
          <Overline className="text-micro text-content-faint">FALTAM</Overline>
          <p className="text-title font-bold text-foreground">{data.remainingDays} dias</p>
        </div>

        <div className="space-y-1">
          <Overline className="text-micro text-content-faint">VS JUNHO</Overline>
          <p className="text-title font-bold text-free">
            {data.vsPreviousMonthPercent > 0 ? `+${data.vsPreviousMonthPercent}%` : `${data.vsPreviousMonthPercent}%`}
          </p>
        </div>
      </div>
    </Card>
  );
}
