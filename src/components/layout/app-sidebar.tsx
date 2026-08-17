import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SidebarNav } from "./sidebar-nav";
import { cn } from "@/lib/utils";

export interface AppSidebarProps extends ComponentPropsWithoutRef<"aside"> {
  user?: {
    name: string;
    email?: string;
    initials?: string;
    plan?: string;
  };
}

export function AppSidebar({
  user = {
    name: "Marina Souza",
    email: "marina.souza@exemplo.com",
    initials: "MS",
    plan: "plano grátis",
  },
  className,
  ...props
}: AppSidebarProps) {
  return (
    <aside
      data-slot="app-sidebar"
      className={cn(
        "w-60 shrink-0 bg-surface-sunken border-r border-border-divider flex flex-col justify-between p-4 min-h-screen",
        className
      )}
      {...props}
    >
      {/* Top Branding and Navigation */}
      <div className="flex flex-col gap-6">
        <div className="px-2 pt-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Logo />
          </Link>
        </div>

        <SidebarNav />
      </div>

      {/* Bottom User Profile Section */}
      <div className="pt-4 border-t border-border-divider">
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface-card border border-border-hairline hover:bg-surface-elevated transition-colors cursor-pointer group">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8.5 rounded-lg bg-surface-elevated border border-border-hairline flex items-center justify-center font-bold text-xs text-foreground shrink-0 group-hover:border-border-strong">
              {user.initials || "MS"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-note font-semibold text-foreground truncate">
                {user.name}
              </p>
              <p className="text-micro text-content-faint truncate">
                {user.plan || "plano grátis"}
              </p>
            </div>
          </div>
          <ChevronsUpDown className="size-4 text-content-ghost shrink-0" />
        </div>
      </div>
    </aside>
  );
}
