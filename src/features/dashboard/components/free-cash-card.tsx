import { Card } from "@/components/ui/card";
import { Overline } from "@/components/ui/overline";
import { Money } from "@/components/ui/money";
import { formatBRL } from "@/lib/format";
import { calculateSplitRatio } from "../model/compute";
import type { FreeCashData } from "../model/types";

export interface FreeCashCardProps {
  data: FreeCashData;
}

export function FreeCashCard({ data }: FreeCashCardProps) {
  const { freeRatio, reservedRatio } = calculateSplitRatio(
    data.freeCents,
    data.realBalanceCents
  );

  return (
    <Card className="p-6 md:p-7 bg-surface-card border-border-hairline rounded-card flex flex-col gap-6">
      {/* Top Main Free Cash */}
      <div className="space-y-1">
        <Overline className="text-content-secondary text-micro tracking-wider font-semibold">
          DINHEIRO LIVRE
        </Overline>
        <div>
          <Money
            cents={data.freeCents}
            size="display"
            tone="free"
            className="font-extrabold tracking-tight"
          />
        </div>
      </div>

      {/* Real Balance & Envelopes Split Container */}
      <div className="space-y-3 pt-4 border-t border-border-divider">
        <div className="flex items-center justify-between text-note">
          <span className="text-content-secondary">
            Saldo real · {data.accountsCount} contas
          </span>
          <span className="font-bold text-foreground">
            {formatBRL(data.realBalanceCents)}
          </span>
        </div>

        {/* Dual Split Bar com Semântica WAI-ARIA */}
        <div
          role="meter"
          aria-label="Proporção entre saldo livre e reservado em envelopes"
          aria-valuenow={Math.round(freeRatio)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${Math.round(freeRatio)}% livre, ${Math.round(reservedRatio)}% reservado`}
          className="h-2 w-full bg-surface-input rounded-full overflow-hidden flex gap-1"
        >
          <div
            className="h-full bg-intention rounded-l-full transition-all duration-300"
            style={{ width: `${reservedRatio}%` }}
          />
          <div
            className="h-full bg-free rounded-r-full transition-all duration-300"
            style={{ width: `${freeRatio}%` }}
          />
        </div>

        {/* Envelopes Legend */}
        <div className="flex items-center gap-1.5 text-micro text-content-secondary">
          <span className="size-1.5 rounded-full bg-intention shrink-0" aria-hidden="true" />
          <span>
            {formatBRL(data.reservedCents)} reservados em {data.envelopesCount} envelopes
          </span>
        </div>
      </div>
    </Card>
  );
}
