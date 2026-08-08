import { signOutAction } from "@/features/auth/data/actions";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 text-note font-medium text-content-secondary transition-colors hover:text-danger"
      >
        <LogOut className="h-4 w-4" />
        Sair
      </button>
    </form>
  );
}
