import { Screen } from "@/components/layout/screen";

export default function Loading() {
  return (
    <Screen className="py-8 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-track-600 rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-surface-input rounded-card border border-border-strong/40" />
        <div className="h-28 bg-surface-input rounded-card border border-border-strong/40" />
        <div className="h-28 bg-surface-input rounded-card border border-border-strong/40" />
      </div>
      <div className="h-48 bg-surface-input rounded-card border border-border-strong/40" />
    </Screen>
  );
}
