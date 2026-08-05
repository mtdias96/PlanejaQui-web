import Image from "next/image";

import { IconTile } from "@/components/ui/icon-tile";
import { Logo } from "@/components/ui/logo";
import { Overline } from "@/components/ui/overline";
import { cn } from "@/lib/utils";
import type { KnownBankId } from "@/lib/tokens";

const FEATURED_BANKS: { id: KnownBankId; label: string; name: string }[] = [
  { id: "nubank", label: "nu", name: "Nubank" },
  { id: "picpay", label: "P", name: "PicPay" },
  { id: "inter", label: "in", name: "Inter" },
  { id: "itau", label: "it", name: "Itaú" },
];

export function AuthShowcase({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative isolate hidden flex-col overflow-hidden bg-surface-canvas p-10 lg:flex xl:p-14",
        className
      )}
    >
      <Logo className="shrink-0" />

      <div className="relative my-10 min-h-0 flex-1">
        <Image
          src="/envelope.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-contain object-center"
        />
      </div>

      <div className="max-w-md shrink-0 space-y-5">
        <h2 className="text-display text-balance text-foreground">
          Seu dinheiro, com clareza total.
        </h2>
        <p className="text-body text-pretty text-content-secondary">
          Todos os bancos num só lugar e uma previsão honesta de como o mês vai
          fechar.
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
          <Overline>Conecta com</Overline>
          <ul className="flex items-center gap-2">
            {FEATURED_BANKS.map((bank) => (
              <li key={bank.id}>
                <IconTile
                  bank={bank.id}
                  fill="solid"
                  size="sm"
                  role="img"
                  aria-label={bank.name}
                >
                  {bank.label}
                </IconTile>
              </li>
            ))}
            <li>
              <IconTile
                tone="neutral"
                size="sm"
                role="img"
                aria-label="e mais 40 instituições"
                className="text-micro text-content-soft"
              >
                +40
              </IconTile>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
