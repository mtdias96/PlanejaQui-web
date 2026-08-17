import { CreditCard, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Overline } from "@/components/ui/overline";
import { Money } from "@/components/ui/money";
import { IconTile } from "@/components/ui/icon-tile";
import { formatBRL } from "@/lib/format";
import type { UpcomingCommitment } from "../model/types";

export interface UpcomingCommitmentsCardProps {
  commitments: UpcomingCommitment[];
}

export function UpcomingCommitmentsCard({
  commitments,
}: UpcomingCommitmentsCardProps) {
  const totalCents = commitments.reduce((acc, c) => acc + c.cents, 0);

  return (
    <Card className="p-6 md:p-7 bg-surface-card border-border-hairline rounded-card flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Overline className="text-content-secondary text-micro tracking-wider font-semibold">
          COMPROMISSOS A VIR
        </Overline>
        <span className="text-note font-bold text-foreground">
          {formatBRL(totalCents)}
        </span>
      </div>

      {/* List */}
      <div className="divide-y divide-border-divider">
        {commitments.map((commitment) => (
          <div
            key={commitment.id}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <IconTile
                bank={commitment.bank}
                fill="solid"
                size="md"
                className="shrink-0"
              >
                {commitment.bank === "nubank" ? (
                  <CreditCard className="size-4" strokeWidth={2.2} />
                ) : (
                  <Landmark className="size-4" strokeWidth={2.2} />
                )}
              </IconTile>
              <div className="space-y-0.5">
                <p className="text-note font-semibold text-foreground">
                  {commitment.title}
                </p>
                <p className="text-micro text-content-soft">
                  {commitment.dueInfo}
                </p>
              </div>
            </div>

            <div>
              <Money
                cents={commitment.cents}
                size="note"
                className="font-bold text-foreground"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
