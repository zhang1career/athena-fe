import type { GroupWinnerRecord } from "@/api/worldcup";

interface Props {
  records: GroupWinnerRecord[];
}

export function RecordsTable({ records }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-[500px] w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-strong bg-[var(--table-head)] text-left">
            <th className="px-3 py-2.5 font-medium text-muted">组别</th>
            <th className="px-3 py-2.5 font-medium text-muted">球队</th>
            <th className="px-3 py-2.5 font-medium text-muted">赔率概率</th>
            <th className="px-3 py-2.5 font-medium text-muted">融合概率</th>
            <th className="px-3 py-2.5 font-medium text-muted">预测第一</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr
              key={`${r.group}-${r.team}-${i}`}
              className={
                r.is_predicted_winner
                  ? "border-b border-border bg-[var(--success-bg)]"
                  : "border-b border-border"
              }
            >
              <td className="px-3 py-2.5 text-muted">{r.group}</td>
              <td className="px-3 py-2.5 font-medium text-foreground">{r.team}</td>
              <td className="px-3 py-2.5 text-muted">
                {(r.odds_proba * 100).toFixed(1)}%
              </td>
              <td className="px-3 py-2.5 text-muted">
                {(r.fused_proba * 100).toFixed(1)}%
              </td>
              <td className="px-3 py-2.5">
                {r.is_predicted_winner ? (
                  <span className="inline-flex rounded-md border border-[var(--success-border)] bg-accent-soft px-2 py-0.5 text-xs font-semibold text-[var(--success-text)]">
                    是
                  </span>
                ) : (
                  <span className="text-muted/50">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
