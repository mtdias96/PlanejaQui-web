import { Suspense } from "react";
import Link from "next/link";
import { Screen } from "@/components/layout/screen";
import { Overline } from "@/components/ui/overline";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { getCurrentUser } from "@/features/auth/data/queries";
import { getSessionState } from "@/features/auth/session/session";

async function UserChip() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <span className="text-note text-content-secondary hidden sm:inline">
      {user.name || user.email}
    </span>
  );
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDegraded } = await getSessionState();

  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      {isDegraded ? (
        <div
          role="status"
          className="border-b border-warning/20 bg-warning/10 px-4 py-2 text-center text-xs font-medium text-warning"
        >
          Não foi possível renovar sua sessão. Recarregue a página caso encontre instabilidades.
        </div>
      ) : null}

      <header className="border-b border-divider bg-surface-chrome">
        <Screen className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col">
              <span className="text-h3 font-extrabold tracking-tight text-free">
                PlanejaQui
              </span>
              <Overline>Web App</Overline>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <UserChip />
            </Suspense>
            <SignOutButton />
          </div>
        </Screen>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
