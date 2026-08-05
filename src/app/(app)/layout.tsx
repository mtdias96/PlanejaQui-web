import Link from "next/link";
import { Screen } from "@/components/layout/screen";
import { Overline } from "@/components/ui/overline";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <header className="border-b border-divider bg-surface-chrome">
        <Screen className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col">
              <span className="text-h3 font-extrabold tracking-tight text-free">PlanejaQui</span>
              <Overline>Web App</Overline>
            </Link>
          </div>

          {/* Sem sessão ainda: por ora "Sair" só devolve para a tela de login. */}
          <Link
            href="/entrar"
            className="text-note text-content-secondary hover:text-foreground transition-colors"
          >
            Sair
          </Link>
        </Screen>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
