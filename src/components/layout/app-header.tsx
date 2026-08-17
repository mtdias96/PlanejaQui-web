import type { ComponentPropsWithoutRef } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AppHeaderProps extends ComponentPropsWithoutRef<"header"> {
  userName?: string;
  syncStatus?: string;
  currentPeriod?: string;
}

export function AppHeader({
  userName = "Marina",
  syncStatus = "sincronizado hoje, 06:12 · quinta, 17 de julho",
  currentPeriod = "julho 2026",
  className,
  ...props
}: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2",
        className
      )}
      {...props}
    >
      {/* Left: Greeting & Sync Status */}
      <div className="space-y-1">
        <h1 className="text-h2 font-bold tracking-tight text-foreground flex items-center gap-2">
          Olá, {userName}{" "}
          <span
            role="img"
            aria-label="aceno amigável"
            className="inline-block animate-bounce"
          >
            👋
          </span>
        </h1>
        <div className="flex items-center gap-2 text-note text-content-secondary">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-free inline-block shrink-0 shadow-xs shadow-free/50"
          />
          <span className="text-micro sm:text-note">{syncStatus}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 self-start md:self-auto">
        {/* Period Selector */}
        <button
          type="button"
          aria-label="Selecionar período financeiro"
          aria-haspopup="listbox"
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-card border border-border-hairline text-note font-medium text-foreground hover:bg-surface-elevated transition-colors shadow-xs"
        >
          <span>{currentPeriod}</span>
          <ChevronDown className="size-3.5 text-content-secondary" aria-hidden="true" />
        </button>

        {/* Search button */}
        <button
          type="button"
          aria-label="Buscar transações e dados"
          className="size-9 rounded-lg bg-surface-card border border-border-hairline flex items-center justify-center text-content-secondary hover:text-foreground hover:bg-surface-elevated transition-colors shadow-xs"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>

        {/* CTA + Lançar */}
        <Button
          variant="free"
          size="sm"
          className="h-9 px-4 rounded-lg font-bold gap-1.5 shadow-cta transition-transform hover:scale-[1.02]"
        >
          <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
          <span>Lançar</span>
        </Button>
      </div>
    </header>
  );
}
