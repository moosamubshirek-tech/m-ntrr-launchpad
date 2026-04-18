import { ReactNode, useState } from "react";
import { Trash2 } from "lucide-react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ emoji, title, hint }: { emoji: string; title: string; hint?: string }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-border rounded-3xl bg-card/50">
      <div className="text-5xl mb-3">{emoji}</div>
      <p className="font-bold text-foreground">{title}</p>
      {hint && <p className="text-sm text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

export function SkeletonRows({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}

export function StatCard({ label, value, emoji, accent }: { label: string; value: number | string; emoji: string; accent?: boolean }) {
  return (
    <div className={`rounded-3xl p-5 border-t-4 ${accent ? "border-accent" : "border-primary"} bg-card shadow-[0_4px_0_hsl(var(--border))]`}>
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="text-2xl sm:text-3xl font-black text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export function DeleteConfirm({ onConfirm, label = "Delete" }: { onConfirm: () => void; label?: string }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-destructive hover:text-destructive/80 p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
        title={label}
      >
        <Trash2 size={14} />
      </button>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="text-muted-foreground hidden sm:inline">Sure?</span>
      <button
        onClick={() => setConfirming(false)}
        className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-bold hover:bg-muted/80"
      >
        Cancel
      </button>
      <button
        onClick={() => { onConfirm(); setConfirming(false); }}
        className="px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90"
      >
        Delete
      </button>
    </div>
  );
}

export const inputCls =
  "w-full border-2 border-border rounded-xl px-3 py-2 text-sm bg-background focus:border-primary focus:outline-none transition-colors";
export const labelCls = "text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1";
export const cardCls = "p-4 sm:p-5 border-2 border-border rounded-3xl bg-card";
export const primaryBtn =
  "bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-1.5";
export const accentBtn =
  "bg-accent text-accent-foreground px-4 py-2.5 rounded-full text-sm font-bold hover:bg-accent/90 transition-colors flex items-center gap-1.5";
export const ghostBtn =
  "border-2 border-border text-foreground px-4 py-2 rounded-full text-sm font-bold hover:bg-muted transition-colors flex items-center gap-1.5";
