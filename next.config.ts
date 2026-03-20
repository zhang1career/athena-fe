import type { NextConfig } from "next";

/**
 * 后端地址：
 * - 客户端由 NEXT_PUBLIC_API_BASE_URL 控制（空则同源，通过 rewrites 代理）
 * - 代理目标由 API_BACKEND_URL 或 NEXT_PUBLIC_API_BASE_URL 提供
 */
const nextConfig: NextConfig = {
  // basePath: "/apps/worldcup/fe",  // 如需子路径部署可取消注释
  async rewrites() {
    const backend =
      process.env.API_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://127.0.0.1:19001";
    return [{ source: "/api/v1/:path*", destination: `${backend}/api/v1/:path*` }];
  },
};

export default nextConfig;
