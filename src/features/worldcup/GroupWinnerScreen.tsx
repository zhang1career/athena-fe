"use client";

import { useEffect, useState } from "react";
import {
  fetchGroupWinnerPrediction,
  type GroupWinnerPredictionData,
} from "@/api/worldcup";
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
      <div className="flex items-center gap-3 py-8 text-muted">
        <Spinner />
        <span>加载预测数据...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-[var(--danger-border)] bg-[var(--danger-bg)] p-4 text-[var(--danger-text)]"
        role="alert"
      >
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          各组预测第一
        </h4>
        <GroupSummaryCards summary={data.groups_summary} />
      </section>
      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          详细预测
        </h4>
        <RecordsTable records={data.records} />
      </section>
    </div>
  );
}

function Spinner() {
  return (
    <div
      className="h-5 w-5 animate-spin rounded-full border-2 border-border-strong border-t-accent"
      aria-hidden
    />
  );
}
