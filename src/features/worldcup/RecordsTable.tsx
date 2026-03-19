import type { GroupWinnerRecord } from "@/api/worldcup";

interface Props {
  records: GroupWinnerRecord[];
}

export function RecordsTable({ records }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[500px] w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left">
            <th className="px-3 py-2 font-medium text-gray-700">组别</th>
            <th className="px-3 py-2 font-medium text-gray-700">球队</th>
            <th className="px-3 py-2 font-medium text-gray-700">赔率概率</th>
            <th className="px-3 py-2 font-medium text-gray-700">融合概率</th>
            <th className="px-3 py-2 font-medium text-gray-700">预测第一</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr
              key={`${r.group}-${r.team}-${i}`}
              className={
                r.is_predicted_winner
                  ? "border-b border-gray-100 bg-green-50"
                  : "border-b border-gray-100"
              }
            >
              <td className="px-3 py-2 text-gray-700">{r.group}</td>
              <td className="px-3 py-2 font-medium text-gray-800">{r.team}</td>
              <td className="px-3 py-2 text-gray-600">
                {(r.odds_proba * 100).toFixed(1)}%
              </td>
              <td className="px-3 py-2 text-gray-600">
                {(r.fused_proba * 100).toFixed(1)}%
              </td>
              <td className="px-3 py-2">
                {r.is_predicted_winner ? (
                  <span className="inline-flex rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    是
                  </span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
