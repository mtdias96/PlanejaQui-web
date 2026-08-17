import { ForecastCard } from "./forecast-card";
import { SpendingPaceCard } from "./spending-pace-card";
import { MonthlyPrepCard } from "./monthly-prep-card";
import { FreeCashCard } from "./free-cash-card";
import { RecentTransactionsCard } from "./recent-transactions-card";
import { UpcomingCommitmentsCard } from "./upcoming-commitments-card";
import { InsightBanner } from "./insight-banner";
import type { DashboardSummary } from "../model/types";

export interface DashboardViewProps {
  summary: DashboardSummary;
}

export function DashboardView({ summary }: DashboardViewProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column */}
      <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6">
        <ForecastCard data={summary.forecast} />
        <SpendingPaceCard data={summary.spendingPace} />
        <MonthlyPrepCard data={summary.monthlyPrep} />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-6">
        <FreeCashCard data={summary.freeCash} />
        <RecentTransactionsCard transactions={summary.recentTransactions} />
        <UpcomingCommitmentsCard commitments={summary.upcomingCommitments} />
        <InsightBanner data={summary.insight} />
      </div>
    </div>
  );
}
