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
          className="rounded-lg border border-gray-200 p-3"
        >
          <span className="text-xs font-medium text-gray-500">组 {s.group}</span>
          <p className="mt-0.5 font-semibold text-gray-800">{s.winner}</p>
          <p className="text-xs text-gray-600">
            概率 {(s.winner_proba * 100).toFixed(1)}%
          </p>
        </div>
      ))}
    </div>
  );
}
