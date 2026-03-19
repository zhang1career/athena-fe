import type { GroupSummary } from "@/api/worldcup";

interface Props {
  summary: GroupSummary[];
}

export function GroupSummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {summary.map((s) => (
        <div
          key={s.group}
          className="rounded-xl border border-border-strong/50 bg-surface-elevated/80 p-3 transition-[border-color,box-shadow] hover:border-accent/40 hover:shadow-[0_0_20px_-8px_var(--accent-glow)]"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            组 {s.group}
          </span>
          <p className="mt-1 font-semibold text-foreground">{s.winner}</p>
          <p className="mt-0.5 font-mono text-xs text-accent">
            概率 {(s.winner_proba * 100).toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
}
