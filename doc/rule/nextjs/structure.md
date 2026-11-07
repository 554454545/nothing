# Next.js 项目结构规则

## 目标

保持 Next.js App Router 项目结构清晰，让页面、接口、组件、业务逻辑和数据库迁移各自有明确位置。

## 当前采用

使用 Taxonomy 风格的轻量化结构，不复制大型项目的 monorepo 复杂度。

```text
nextjs/
├── app/
│   ├── api/
│   │   └── <resource>/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/
│   ├── lib/
│   └── types/
├── db/
│   └── migrations/
├── public/
├── scripts/
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 目录职责

| 目录 | 职责 |
| --- | --- |
| `app/` | 页面路由、布局和 Route Handlers |
| `app/api/` | 后端 HTTP 接口 |
| `src/components/` | 可复用 React 组件 |
| `src/lib/` | 数据访问、业务逻辑和工具函数 |
| `src/types/` | 跨页面和接口共享的 TypeScript 类型 |
| `db/migrations/` | Cloudflare D1 数据库迁移 |
| `public/` | 静态资源 |
| `scripts/` | 本地开发和环境脚本 |

## 规则

- 页面路由放在 `app/`，不要把路由组件集中搬到 `src/pages/`。
- API 按资源划分，例如 `app/api/messages/route.ts`。
- 组件放在 `src/components/`，不在 `app/` 内重复创建通用组件。
- 数据库访问和业务逻辑放在 `src/lib/`，Route Handler 只负责请求解析、调用和响应。
- 数据库变更必须新增迁移文件，不直接修改已经应用的迁移。
- 生成目录和依赖目录不作为源码整理对象：`.next/`、`.cloudflare/`、`.vinext/`、`dist/`、`node_modules/`。
- 标识符使用英文，字符串和注释使用中文。

## 升级条件

只有在项目出现多个可独立部署应用、多个共享包或明显的构建边界时，才考虑 monorepo。
