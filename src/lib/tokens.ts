export const TONES = ["free", "intention", "warning", "danger", "neutral"] as const;
export type Tone = (typeof TONES)[number];

export const BANK_IDS = [
  "nubank",
  "picpay",
  "inter",
  "itau",
  "bradesco",
  "santander",
  "caixa",
  "bb",
  "c6",
  "btg",
  "xp",
] as const;

export type KnownBankId = (typeof BANK_IDS)[number];
export type BankId = KnownBankId | (string & {});

type CssVar = `var(--${string})`;

export const cssVar = {
  free: "var(--color-free)",
  freeDeep: "var(--color-free-deep)",
  intention: "var(--color-intention)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  track: "var(--color-track-600)",
} as const satisfies Record<string, CssVar>;

export const bankVar = {
  nubank: "var(--color-bank-nubank)",
  picpay: "var(--color-bank-picpay)",
  inter: "var(--color-bank-inter)",
  itau: "var(--color-bank-itau)",
  bradesco: "var(--color-bank-bradesco)",
  santander: "var(--color-bank-santander)",
  caixa: "var(--color-bank-caixa)",
  bb: "var(--color-bank-bb)",
  c6: "var(--color-bank-c6)",
  btg: "var(--color-bank-btg)",
  xp: "var(--color-bank-xp)",
} as const satisfies Record<KnownBankId, CssVar>;

export function getBankColor(bank?: BankId, customColor?: string): string | undefined {
  if (customColor) {
    if (customColor.startsWith("var(") || customColor.startsWith("#") || customColor.startsWith("rgb")) {
      return customColor;
    }
    return `var(--color-bank-${customColor})`;
  }
  if (bank && bank in bankVar) {
    return bankVar[bank as KnownBankId];
  }
  if (bank) {
    return `var(--color-bank-${bank})`;
  }
  return undefined;
}
