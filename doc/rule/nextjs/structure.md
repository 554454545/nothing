# Next.js 项目结构规则

## 目标

保持 Next.js App Router 项目结构清晰，让页面、接口、组件、业务逻辑和数据库迁移各自有明确位置。

## 当前采用

使用 Taxonomy 风格的轻量化结构，不复制大型项目的 monorepo 复杂度。

```text
nextjs/
├── app/
│   ├── (web)/
│   │   └── page.tsx
│   ├── (api)/
│   │   └── api/
│   │       └── <resource>/
│   │           └── route.ts
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── <feature-components>/
├── lib/
│   ├── db/
│   └── <domain-logic>/
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
| `app/` | 页面路由、布局和 Route Handlers 的入口 |
| `app/(web)/` | 前端页面、样式和设计规范 |
| `app/(api)/` | 后端 HTTP 接口 |
| `components/` | 可复用 React 组件 |
| `lib/` | 数据访问、业务逻辑和工具函数 |

| `db/migrations/` | Cloudflare D1 数据库迁移 |
| `public/` | 静态资源 |
| `scripts/` | 本地开发和环境脚本 |

## 规则

- 页面路由放在 `app/`，不要把路由组件集中搬到 `src/pages/`。
- API 按资源划分，例如 `app/(api)/api/messages/route.ts`。
- 组件放在 `components/`，通用 UI 组件放在 `components/ui/`。
- 数据库访问和业务逻辑放在 `lib/`，Route Handler 只负责请求解析、调用和响应。
- 数据库变更必须新增迁移文件，不直接修改已经应用的迁移。
- 生成目录和依赖目录不作为源码整理对象：`.next/`、`.cloudflare/`、`.vinext/`、`dist/`、`node_modules/`。
- 标识符使用英文，字符串和注释使用中文。

## 升级条件

只有在项目出现多个可独立部署应用、多个共享包或明显的构建边界时，才考虑 monorepo。

## 前端设计规范

- 前端页面、数据展示、布局、响应式和交互设计前，先阅读 `app/(web)/design.md`。
- `design.md` 是 Vercel 风格的前端设计参考，不是通用后端或项目管理规则。

## 前后端目录分隔

在 Next.js App Router 中使用路由组显式区分前端和后端：

```text
app/
├── (web)/
│   ├── design.md
│   ├── globals.css
│   └── page.tsx
├── (api)/
│   └── api/
│       ├── echo/
│       │   └── route.ts
│       └── messages/
│           └── route.ts
└── layout.tsx
```

- `app/(web)/` 放页面、前端样式和前端设计规范。
- `app/(api)/` 放 API Route Handlers 和服务端入口。
- 括号目录是 Next.js Route Group，不会出现在 URL 中。
- `app/(web)/page.tsx` 仍然对应 `/`。
- `app/(api)/api/messages/route.ts` 仍然对应 `/api/messages`。
- 页面组件、业务逻辑和数据访问继续放在 `components/` 和 `lib/`。
- 数据库迁移继续放在 `db/migrations/`。

## 本地 Agent 运行层

- Pi SDK 和 Agent 服务独立放在项目根目录的 `agent/`。
- `agent/` 不属于 Next.js 页面或 Cloudflare Worker 代码。
- Next.js 页面通过本地 API 代理连接 `agent/` 中的 Pi 服务。
- Cloudflare Workers 部署网页和 D1；Pi 服务在本地运行。
