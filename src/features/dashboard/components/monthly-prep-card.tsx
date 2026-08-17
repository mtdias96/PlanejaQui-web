import { Card } from "@/components/ui/card";
import { Overline } from "@/components/ui/overline";
import { Money } from "@/components/ui/money";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MonthlyPrepData } from "../model/types";

export interface MonthlyPrepCardProps {
  data: MonthlyPrepData;
}

export function MonthlyPrepCard({ data }: MonthlyPrepCardProps) {
  return (
    <Card className="p-6 md:p-7 bg-surface-card border-border-hairline rounded-card flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Overline className="text-content-secondary text-micro tracking-wider font-semibold">
          A SE PREPARAR ESTE MÊS
        </Overline>
        <span className="text-note text-content-secondary font-medium">
          total <span className="text-foreground font-semibold">{formatBRL(data.totalCents)}</span>
        </span>
      </div>

      {/* 4 Category Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.categories.map((category) => (
          <div key={category.key} className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full shrink-0", category.indicatorColorClass)} />
              <span className="text-micro font-medium text-content-muted">
                {category.label}
              </span>
            </div>
            <div>
              <Money cents={category.cents} size="title" className="font-bold text-foreground" />
            </div>
          </div>
        ))}
      </div>

      {/* Contextual Footer Note */}
      <p className="text-micro text-content-soft pt-2 border-t border-border-divider leading-relaxed">
        {data.contextNote}
      </p>
    </Card>
  );
}
