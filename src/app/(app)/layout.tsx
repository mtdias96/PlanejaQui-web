import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Screen } from "@/components/layout/screen";
import { getCurrentUser } from "@/features/auth/data/queries";
import { getSessionState } from "@/features/auth/session/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDegraded } = await getSessionState();
  const user = await getCurrentUser();

  const displayName = user?.name || "Marina Souza";
  const firstName = displayName.split(" ")[0];
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MS";

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* 1. Desktop App Sidebar (persistente entre todas as rotas filhas) */}
      <AppSidebar
        user={{
          name: displayName,
          email: user?.email,
          initials,
          plan: "plano grátis",
        }}
        className="hidden md:flex sticky top-0 h-screen overflow-y-auto"
      />

      {/* 2. Área principal com Header global persistente */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header com drawer de navegação */}
        <MobileHeader userName={displayName} />

        {isDegraded ? (
          <div
            role="status"
            className="border-b border-warning/20 bg-warning/10 px-4 py-2 text-center text-xs font-medium text-warning"
          >
            Não foi possível renovar sua sessão. Recarregue a página caso encontre instabilidades.
          </div>
        ) : null}

        {/* Header global do sistema (Saudação, Sincronização, Período, Busca, + Lançar) */}
        <div className="border-b border-border-divider/40 bg-background/95 backdrop-blur-sm sticky top-0 z-30">
          <Screen className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <AppHeader
              userName={firstName}
              syncStatus="sincronizado hoje, 06:12 · quinta, 17 de julho"
              currentPeriod="julho 2026"
            />
          </Screen>
        </div>

        {/* 3. Conteúdo dinâmico da rota ativa */}
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
