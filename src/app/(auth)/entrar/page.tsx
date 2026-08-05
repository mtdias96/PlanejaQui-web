import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Entrar | PlanejaQui",
  description: "Acesse sua conta e veja como o seu mês está indo.",
};

export default function EntrarPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-h1 text-balance">Que bom te ver de volta</h1>
        <p className="text-body text-pretty text-content-secondary">
          Entre para ver como seu mês está indo.
        </p>
      </header>

      <LoginForm />
    </div>
  );
}
