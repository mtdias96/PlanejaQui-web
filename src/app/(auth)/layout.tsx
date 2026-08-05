import { Logo } from "@/components/ui/logo";
import { AuthShowcase } from "@/features/auth/components/auth-showcase";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-2">
      <AuthShowcase className="lg:border-r lg:border-divider" />

      <div className="flex min-h-dvh flex-col lg:min-h-0">
        <header className="px-5.5 pt-8 sm:px-8 lg:hidden">
          <Logo />
        </header>

        <main className="flex flex-1 items-center justify-center px-5.5 py-10 sm:px-8 lg:py-12">
          <div className="w-full max-w-104">{children}</div>
        </main>

        <footer className="px-5.5 pb-8 text-center text-micro text-content-ghost sm:px-8">
          &copy; {new Date().getFullYear()} PlanejaQui
        </footer>
      </div>
    </div>
  );
}
