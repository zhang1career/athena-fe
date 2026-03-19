import type { ThetaInfo } from "@/api/worldcup";

interface Props {
  theta: ThetaInfo | null;
}

export function ThetaInfoBlock({ theta }: Props) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-sm">
      <span className="font-medium text-gray-700">相关度 θ：</span>
      <span className="text-gray-600">
        {theta
          ? `AUC=${theta.auc} · Brier=${theta.brier} · Spearman=${theta.spearman} · 建议权重=${theta.suggested_weight}`
          : "未加载 artifact，使用原始赔率"}
      </span>
    </div>
  );
}
