"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptText,
  Mail,
  Target,
  CreditCard,
  Landmark,
  Tag,
  CalendarCheck,
  Scale,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Extrato", href: "/extrato", icon: ReceiptText },
  { label: "Envelopes", href: "/envelopes", icon: Mail },
  { label: "Metas", href: "/metas", icon: Target },
  { label: "Cartão", href: "/cartao", icon: CreditCard },
  { label: "Empréstimos", href: "/emprestimos", icon: Landmark },
  { label: "Categorias", href: "/categorias", icon: Tag },
  { label: "Fixas", href: "/fixas", icon: CalendarCheck },
  { label: "Acertos", href: "/acertos", icon: Scale },
  { label: "Alertas", href: "/alertas", icon: Bell },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 w-full" aria-label="Navegação Principal">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-note font-medium transition-all duration-150 group",
              isActive
                ? "bg-surface-elevated text-free border border-free/20 font-semibold shadow-xs"
                : "text-content-secondary hover:text-foreground hover:bg-surface-elevated/60"
            )}
          >
            <Icon
              className={cn(
                "size-4.5 shrink-0 transition-colors",
                isActive ? "text-free" : "text-content-faint group-hover:text-foreground"
              )}
              strokeWidth={isActive ? 2.2 : 1.9}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
