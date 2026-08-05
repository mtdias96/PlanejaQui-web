import { Screen } from "@/components/layout/screen";
import { Section } from "@/components/layout/section";
import { StatTile } from "@/components/ui/stat-tile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Overline } from "@/components/ui/overline";

export default function DashboardPage() {
  return (
    <Screen className="py-8 space-y-8">
      <header className="space-y-1">
        <Overline>Visão Geral</Overline>
        <h1 className="text-display font-bold">Painel Financeiro</h1>
      </header>

      <Section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatTile label="Dinheiro Livre" cents={345080} tone="free" showSign />
        <StatTile label="Reservado em Envelopes" cents={180000} tone="intention" />
        <StatTile label="Faturas Pendentes" cents={-65000} tone="auto" />
      </Section>

      <Card tone="neutral">
        <CardHeader>
          <CardTitle>Benvindo ao PlanejaQui Web</CardTitle>
        </CardHeader>
        <CardContent className="text-body text-content-secondary">
          Seu planejamento financeiro estruturado com Server Components, Design Tokens nativos e suporte a Open Finance.
        </CardContent>
      </Card>
    </Screen>
  );
}
