"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarNav } from "./sidebar-nav";

export interface MobileHeaderProps {
  userName?: string;
}

export function MobileHeader({ userName = "Marina" }: MobileHeaderProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border-divider bg-surface-sunken sticky top-0 z-40">
      <Link href="/" className="inline-flex items-center gap-2">
        <Logo />
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Abrir menu"
            className="size-9 rounded-lg bg-surface-card border border-border-hairline flex items-center justify-center text-foreground hover:bg-surface-elevated transition-colors"
          >
            <Menu className="size-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-surface-sunken p-6 flex flex-col gap-6">
          <SheetHeader className="p-0 text-left">
            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
            <Link href="/" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto" onClick={() => setOpen(false)}>
            <SidebarNav />
          </div>

          <div className="pt-4 border-t border-border-divider text-xs text-content-faint">
            Logado como <strong className="text-foreground">{userName}</strong>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
