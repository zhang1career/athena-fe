/**
 * World Cup prediction API client.
 * Single module for types and fetch logic - high cohesion.
 */

/**
 * 后端根地址。
 * - 未设置或为空：使用同源（通过 Next 的 rewrites 代理到后端），适合服务器部署
 * - 已设置：直接请求该地址，适合本地开发且后端已开 CORS 的场景
 */
function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (raw === undefined || String(raw).trim() === "") {
    return ""; // 同源，由 next.config rewrites 代理
  }
  return String(raw).replace(/\/$/, "");
}

/** API response wrapper */
export interface ApiResponse<T> {
  errorCode: number;
  message: string;
  data: T | null;
}

/** θ (theta) correlation metrics from artifact */
export interface ThetaInfo {
  auc: number;
  brier: number;
  spearman: number;
  suggested_weight: number;
}

/** Single group predicted winner summary */
export interface GroupSummary {
  group: string;
  winner: string;
  winner_proba: number;
}

/** Single team record in detailed table */
export interface GroupWinnerRecord {
  group: string;
  team: string;
  odds_proba: number;
  fused_proba: number;
  is_predicted_winner: boolean;
}

/** Full response from group-winner-prediction */
export interface GroupWinnerPredictionData {
  edition: string | null;
  theta: ThetaInfo | null;
  groups_summary: GroupSummary[];
  records: GroupWinnerRecord[];
}

const GROUP_WINNER_ENDPOINT = "/api/v1/worldcup/group-winner-prediction";

export async function fetchGroupWinnerPrediction(): Promise<GroupWinnerPredictionData> {
  const url = `${getApiBaseUrl()}${GROUP_WINNER_ENDPOINT}`;

  const res = await fetch(url, { credentials: "omit" });
  const json: ApiResponse<GroupWinnerPredictionData> = await res.json();

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}`);
  }
  if (json.errorCode !== 0) {
    throw new Error(json.message || "Request failed");
  }
  if (!json.data) {
    throw new Error("Empty response data");
  }

  return json.data;
}
