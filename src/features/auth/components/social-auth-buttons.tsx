import { Button } from "@/components/ui/button";
import { AppleMark, GoogleMark } from "@/components/ui/brand-marks";

/**
 * Entradas de login social. Os handlers de OAuth ainda não estão ligados —
 * cada botão é um `type="button"` inerte até o provedor ser configurado.
 */
export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button type="button" variant="surface" size="ctaWeb">
        <GoogleMark />
        Google
      </Button>
      <Button type="button" variant="surface" size="ctaWeb">
        <AppleMark />
        Apple
      </Button>
    </div>
  );
}
