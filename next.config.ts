import type { NextConfig } from "next";

/**
 * 后端地址：
 * - 客户端由 NEXT_PUBLIC_API_BASE_URL 控制（空则同源）
 * - Next 模式：rewrites 代理到 API_BACKEND_URL
 * - 静态模式：需 nginx 代理 /api（见 README）
 */
const useStaticExport = process.env.OUTPUT_STATIC === "1";

const nextConfig: NextConfig = {
  // basePath: "/apps/worldcup/fe",  // 如需子路径部署可取消注释
  /** OUTPUT_STATIC=1 时：纯静态导出，无 Node 进程，内存极低 */
  ...(useStaticExport && { output: "export" as const }),
  ...(!useStaticExport && {
    async rewrites() {
      const backend =
        process.env.API_BACKEND_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "http://127.0.0.1:19001";
      return [{ source: "/api/v1/:path*", destination: `${backend}/api/v1/:path*` }];
    },
  }),
};

export default nextConfig;
