/**
 * World Cup prediction API client.
 * Single module for types and fetch logic - high cohesion.
 */

/**
 * 未设置 NEXT_PUBLIC_API_BASE_URL 时走同源路径 `/api/...`，由 Next.js rewrites 转发到后端
 * （默认目标 `http://127.0.0.1:19001`，见 next.config.ts 的 API_PROXY_TARGET）。
 * 若需浏览器直连后端，在 .env.local 中设置 NEXT_PUBLIC_API_BASE_URL。
 */
const getBaseUrl = () => {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv.replace(/\/$/, "");
  }
  return "";
};

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
  const base = getBaseUrl().replace(/\/$/, "");
  const url = `${base}${GROUP_WINNER_ENDPOINT}`;

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
