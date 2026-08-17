import type { Metadata } from "next";
import { Screen } from "@/components/layout/screen";
import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { getDashboardData } from "@/features/dashboard/data/queries";

export const metadata: Metadata = {
  title: "Dashboard | PlanejaQui",
  description:
    "Visão geral das finanças, sobra prevista, ritmo de gastos e compromissos do PlanejaQui.",
};

export default async function DashboardPage() {
  const summary = await getDashboardData();

  return (
    <Screen className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <DashboardView summary={summary} />
    </Screen>
  );
}
