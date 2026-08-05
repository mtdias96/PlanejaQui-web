"use client";

import { useEffect } from "react";
import { Screen } from "@/components/layout/screen";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <Screen className="flex items-center justify-center min-h-screen">
      <Card tone="danger" className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-h2">Algo deu errado</CardTitle>
          <CardDescription>{error.message || "Ocorreu um erro inesperado."}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => reset()} variant="outline">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </Screen>
  );
}
