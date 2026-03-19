"use client";

import { useEffect, useState } from "react";
import {
  fetchGroupWinnerPrediction,
  type GroupWinnerPredictionData,
  type GroupSummary,
  type GroupWinnerRecord,
  type ThetaInfo,
} from "@/api/worldcup";
import { ThetaInfoBlock } from "./ThetaInfoBlock";
import { GroupSummaryCards } from "./GroupSummaryCards";
import { RecordsTable } from "./RecordsTable";

export function GroupWinnerScreen() {
  const [data, setData] = useState<GroupWinnerPredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroupWinnerPrediction()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-8 text-gray-500">
        <Spinner />
        <span>加载预测数据...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        采用 <strong>统一度量 + 简单归一化</strong> 融合多个中间结果，预测各队获得小组第一的概率。
      </p>
      {data.edition && (
        <p className="text-sm font-medium text-gray-700">
          世界杯 {data.edition}
        </p>
      )}
      <ThetaInfoBlock theta={data.theta} />
      <section>
        <h4 className="mb-2 font-semibold text-gray-800">各组预测第一</h4>
        <GroupSummaryCards summary={data.groups_summary} />
      </section>
      <section>
        <h4 className="mb-2 font-semibold text-gray-800">详细预测</h4>
        <RecordsTable records={data.records} />
      </section>
    </div>
  );
}

function Spinner() {
  return (
    <div
      className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-500"
      aria-hidden
    />
  );
}
