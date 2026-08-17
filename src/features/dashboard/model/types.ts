import type { BankId } from "@/lib/tokens";

export interface SpendingDay {
  date: string;
  dayNumber: number;
  label: string;
  amountCents: number;
  intensity: number; // 0 a 100 para altura relativa da barra
  isRecent: boolean;
}

export interface SpendingPaceData {
  comparisonLabel: string;
  startDateLabel: string;
  endDateLabel: string;
  days: SpendingDay[];
}

export interface ForecastData {
  monthName: string;
  year: number;
  statusText: string;
  projectedSurplusCents: number;
  currentDay: number;
  totalDays: number;
  dailyPaceCents: number;
  pendingFixedCents: number;
  remainingDays: number;
  vsPreviousMonthPercent: number;
}

export interface MonthlyPrepCategory {
  key: "creditCard" | "loans" | "fixed" | "debts";
  label: string;
  cents: number;
  indicatorColorClass: string;
}

export interface MonthlyPrepData {
  totalCents: number;
  categories: MonthlyPrepCategory[];
  contextNote: string;
}

export interface FreeCashData {
  freeCents: number;
  realBalanceCents: number;
  accountsCount: number;
  reservedCents: number;
  envelopesCount: number;
}

export interface RecentTransaction {
  id: string;
  title: string;
  subtitle: string;
  cents: number;
  iconName?: "shopping-bag" | "send" | "shopping-cart" | "briefcase" | "tag";
}

export interface UpcomingCommitment {
  id: string;
  title: string;
  dueInfo: string;
  cents: number;
  bank: BankId;
}

export interface InsightData {
  prefix: string;
  highlightText: string;
  suffix: string;
}

export interface DashboardSummary {
  user: {
    name: string;
    email: string;
    initials: string;
    plan: string;
    syncStatus: string;
  };
  period: {
    month: string;
    year: number;
  };
  forecast: ForecastData;
  spendingPace: SpendingPaceData;
  monthlyPrep: MonthlyPrepData;
  freeCash: FreeCashData;
  recentTransactions: RecentTransaction[];
  upcomingCommitments: UpcomingCommitment[];
  insight: InsightData;
}
