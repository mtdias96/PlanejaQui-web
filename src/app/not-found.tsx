import Link from "next/link";
import { Screen } from "@/components/layout/screen";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Screen className="flex items-center justify-center min-h-screen">
      <Card tone="neutral" className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-h1 text-warning">404</CardTitle>
          <CardDescription className="text-subtitle">Página não encontrada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-body text-content-secondary">
            A página que você está procurando não existe ou foi movida.
          </p>

          <Button asChild variant="free">
            <Link href="/">Voltar ao Início</Link>
          </Button>
        </CardContent>
      </Card>
    </Screen>
  );
}
