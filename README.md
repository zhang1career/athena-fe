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

# 配置（可选）
cp .env.example .env.local

# 开发时默认通过 Next 代理访问后端（同源 /api → http://127.0.0.1:19001），一般无需改配置。
# 若要让浏览器直连后端，设置 NEXT_PUBLIC_API_BASE_URL。
# 若后端地址不同，可设置 API_PROXY_TARGET（仅 dev / next start 的 rewrites 使用）。

# 启动开发服务
npm run dev
```

访问：http://localhost:3000（若启用 `basePath` 则为 `/apps/worldcup/fe`）

> **数据来自后端**：需先启动 athena 后端（默认 `http://127.0.0.1:19001`）。未启动时页面会报错（如 `Failed to fetch` 或 HTTP 错误）。

## 构建与部署

```bash
npm run build
npm start
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
│       ├── RecordsTable.tsx
│       └── ThetaInfoBlock.tsx
└── app/           # Next.js App Router
```
