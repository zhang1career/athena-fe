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

> **数据来自后端**：先启动 athena，并保证 `NEXT_PUBLIC_API_BASE_URL` 指向该服务。未配置或后端不可达时会报错（如 `Failed to fetch`）。直连跨域需后端允许 CORS。

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
│       └── RecordsTable.tsx
└── app/           # Next.js App Router
```
