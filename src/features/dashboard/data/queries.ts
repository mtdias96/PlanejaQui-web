import { cache } from "react";
import "server-only";
import type { DashboardSummary } from "../model/types";

export const getDashboardData = cache(async (): Promise<DashboardSummary> => {
  // Simulação de leitura de dados estruturada para o Dashboard
  return {
    user: {
      name: "Marina Souza",
      email: "marina.souza@exemplo.com",
      initials: "MS",
      plan: "plano grátis",
      syncStatus: "sincronizado hoje, 06:12 · quinta, 17 de julho",
    },
    period: {
      month: "julho",
      year: 2026,
    },
    forecast: {
      monthName: "JULHO",
      year: 2026,
      statusText: "no ritmo",
      projectedSurplusCents: 93478,
      currentDay: 17,
      totalDays: 31,
      dailyPaceCents: 11700,
      pendingFixedCents: 56780,
      remainingDays: 14,
      vsPreviousMonthPercent: -12,
    },
    spendingPace: {
      comparisonLabel: "melhor que junho",
      startDateLabel: "4 jul",
      endDateLabel: "hoje",
      days: [
        { date: "2026-07-04", dayNumber: 4, label: "4 jul", amountCents: 4500, intensity: 35, isRecent: false },
        { date: "2026-07-05", dayNumber: 5, label: "5 jul", amountCents: 5200, intensity: 48, isRecent: false },
        { date: "2026-07-06", dayNumber: 6, label: "6 jul", amountCents: 2300, intensity: 22, isRecent: false },
        { date: "2026-07-07", dayNumber: 7, label: "7 jul", amountCents: 6100, intensity: 58, isRecent: false },
        { date: "2026-07-08", dayNumber: 8, label: "8 jul", amountCents: 7400, intensity: 72, isRecent: false },
        { date: "2026-07-09", dayNumber: 9, label: "9 jul", amountCents: 9500, intensity: 95, isRecent: false },
        { date: "2026-07-10", dayNumber: 10, label: "10 jul", amountCents: 4100, intensity: 40, isRecent: false },
        { date: "2026-07-11", dayNumber: 11, label: "11 jul", amountCents: 3200, intensity: 30, isRecent: false },
        { date: "2026-07-12", dayNumber: 12, label: "12 jul", amountCents: 4900, intensity: 48, isRecent: true },
        { date: "2026-07-13", dayNumber: 13, label: "13 jul", amountCents: 7100, intensity: 70, isRecent: true },
        { date: "2026-07-14", dayNumber: 14, label: "14 jul", amountCents: 5800, intensity: 58, isRecent: true },
        { date: "2026-07-15", dayNumber: 15, label: "15 jul", amountCents: 3400, intensity: 35, isRecent: true },
        { date: "2026-07-16", dayNumber: 16, label: "16 jul", amountCents: 8200, intensity: 82, isRecent: true },
        { date: "2026-07-17", dayNumber: 17, label: "Hoje", amountCents: 7600, intensity: 78, isRecent: true },
      ],
    },
    monthlyPrep: {
      totalCents: 463260,
      categories: [
        {
          key: "creditCard",
          label: "Fatura cartão",
          cents: 234790,
          indicatorColorClass: "bg-bank-nubank",
        },
        {
          key: "loans",
          label: "Empréstimos",
          cents: 91690,
          indicatorColorClass: "bg-bank-inter",
        },
        {
          key: "fixed",
          label: "Fixas a vir",
          cents: 56780,
          indicatorColorClass: "bg-content-secondary",
        },
        {
          key: "debts",
          label: "Dívidas",
          cents: 80000,
          indicatorColorClass: "bg-intention",
        },
      ],
      contextNote:
        "Contas: R$ 3.142 de livre · R$ 260 a receber. Contas e empréstimos vencem no fim de agosto.",
    },
    freeCash: {
      freeCents: 314258,
      realBalanceCents: 1344258,
      accountsCount: 3,
      reservedCents: 1030000,
      envelopesCount: 3,
    },
    recentTransactions: [
      {
        id: "tx-1",
        title: "iFood",
        subtitle: "alimentação fora · hoje",
        cents: -6290,
        iconName: "shopping-bag",
      },
      {
        id: "tx-2",
        title: "Pix - Rafa",
        subtitle: "não é renda · acerto",
        cents: 20000,
        iconName: "send",
      },
      {
        id: "tx-3",
        title: "Mercado Zaffari",
        subtitle: "mercado · ontem",
        cents: -21435,
        iconName: "shopping-cart",
      },
      {
        id: "tx-4",
        title: "Salário - ACME",
        subtitle: "salário · 05/jul",
        cents: 580000,
        iconName: "briefcase",
      },
    ],
    upcomingCommitments: [
      {
        id: "comm-1",
        title: "Fatura Nubank",
        dueInfo: "vence 2 ago",
        cents: 234790,
        bank: "nubank",
      },
      {
        id: "comm-2",
        title: "Empréstimo Inter",
        dueInfo: "parcela 10 ago",
        cents: 65820,
        bank: "inter",
      },
    ],
    insight: {
      prefix: "Boa! ",
      highlightText: "Gasto 12% menor",
      suffix: " que junho no mesmo período.",
    },
  };
});
