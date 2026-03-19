import type { NextConfig } from "next";

/** 后端地址由环境变量 NEXT_PUBLIC_API_BASE_URL 提供（见 src/api/worldcup.ts），不在此写死端口 */
const nextConfig: NextConfig = {
  // basePath: "/apps/worldcup/fe",  // 如需子路径部署可取消注释
};

export default nextConfig;
