# athena-fe

Athena 预测平台前端，Next.js + React + TypeScript + Tailwind。

## 功能

- 世界杯小组赛第一名预测（单屏展示）

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## 开发

```bash
# 安装依赖
npm install

# 配置后端地址（必填）
cp .env.example .env.local
# 编辑 .env.local，设置 NEXT_PUBLIC_API_BASE_URL 为你的后端根地址（勿带尾部斜杠）

# 启动开发服务
npm run dev
```

访问：http://localhost:3000（若启用 `basePath` 则为 `/apps/worldcup/fe`）

> **数据来自后端**：先启动 athena。服务器部署时建议使用代理模式（见下），无需 CORS。

## 构建与部署

```bash
npm run build
npm start
```

**服务器部署**（解决 "Failed to fetch"）：

- 将 `NEXT_PUBLIC_API_BASE_URL` 留空或注释，前端通过同源 `/api` 请求，由 Next 代理到后端
- 设置 `API_BACKEND_URL=http://127.0.0.1:19001`（与后端同机时）作为代理目标
- 这样用户从任意 IP 访问前端时，请求都经 Next 转发到本机后端，不会出现 127.0.0.1 指向用户电脑的问题

**低配置服务器：静态导出（省内存）**：

```bash
npm run build:static
# 产物在 out/ 目录，用 nginx 等静态服务器托管，无需 Node 进程
```

内存对比：`npm run dev` ~200–500MB，`npm start` ~100–200MB，**静态 + nginx ~10–50MB**。

需在 nginx 中代理 `/api` 到后端，例如：

```nginx
server {
    listen 80;
    root /path/to/athena-fe/out;
    index index.html;
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:19001;
    }
}
```

部署路径：`/apps/worldcup/fe`（通过 `basePath` 配置）

## 项目结构

```
src/
├── api/           # API 客户端（按领域划分）
│   └── worldcup.ts
├── features/      # 功能模块（高内聚）
│   └── worldcup/
│       ├── GroupWinnerScreen.tsx
│       ├── GroupSummaryCards.tsx
│       └── RecordsTable.tsx
└── app/           # Next.js App Router
```
