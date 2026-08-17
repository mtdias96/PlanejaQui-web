import Link from "next/link";
import { Utensils, ArrowUpRight, ShoppingCart, Briefcase, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Overline } from "@/components/ui/overline";
import { Money } from "@/components/ui/money";
import type { RecentTransaction } from "../model/types";

export interface RecentTransactionsCardProps {
  transactions: RecentTransaction[];
}

function TransactionIcon({ name }: { name?: RecentTransaction["iconName"] }) {
  const iconProps = { className: "size-4 text-content-secondary", strokeWidth: 2 };

  switch (name) {
    case "shopping-bag":
      return <Utensils {...iconProps} />;
    case "send":
      return <ArrowUpRight {...iconProps} />;
    case "shopping-cart":
      return <ShoppingCart {...iconProps} />;
    case "briefcase":
      return <Briefcase {...iconProps} />;
    default:
      return <Tag {...iconProps} />;
  }
}

export function RecentTransactionsCard({
  transactions,
}: RecentTransactionsCardProps) {
  return (
    <Card className="p-6 md:p-7 bg-surface-card border-border-hairline rounded-card flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Overline className="text-content-secondary text-micro tracking-wider font-semibold">
          ÚLTIMAS TRANSAÇÕES
        </Overline>
        <Link
          href="/extrato"
          className="text-note text-free hover:text-free-bright transition-colors font-medium"
        >
          ver tudo
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-border-divider">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="size-8.5 rounded-icon bg-surface-elevated flex items-center justify-center shrink-0 border border-border-hairline">
                <TransactionIcon name={tx.iconName} />
              </div>
              <div className="space-y-0.5">
                <p className="text-note font-semibold text-foreground">
                  {tx.title}
                </p>
                <p className="text-micro text-content-soft">
                  {tx.subtitle}
                </p>
              </div>
            </div>

            <div>
              <Money
                cents={tx.cents}
                tone={tx.cents > 0 ? "free" : "neutral"}
                showSign
                size="note"
                className="font-bold"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
