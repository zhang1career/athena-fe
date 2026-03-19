import type { NextConfig } from "next";

/** Next rewrites 转发目标（与 athena 服务端一致） */
const API_PROXY_TARGET =
  process.env.API_PROXY_TARGET || "http://127.0.0.1:19001";

const nextConfig: NextConfig = {
  // basePath: "/apps/worldcup/fe",  // 如需子路径部署可取消注释

  async rewrites() {
    return [
      {
        source: "/api/v1/worldcup/:path*",
        destination: `${API_PROXY_TARGET.replace(/\/$/, "")}/api/v1/worldcup/:path*`,
      },
    ];
  },
};

export default nextConfig;
