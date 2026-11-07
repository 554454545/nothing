# Cloudflare 与 D1 规则

## 目标

让项目先保持标准 Next.js 本地运行，再平滑部署到 Cloudflare Workers，并使用 Cloudflare D1 持久化数据。

## 当前采用

```text
本地开发：Next.js + Node.js 22 LTS
部署适配：vinext
运行环境：Cloudflare Workers Free
数据库：Cloudflare D1 Free
```

## 规则

- 本地开发优先保证 `npm run dev` 和 `npm run build` 正常。
- Cloudflare binding 使用 `cloudflare:workers` 访问。
- D1 binding 名称固定为 `nextjs_mvp_db`。
- D1 迁移放在 `db/migrations/`。
- 先执行本地迁移，再执行远程迁移。
- 不在业务代码中依赖 Node.js 专属 API，除非同时提供 Workers 兼容方案。
- Cloudflare 配置放在项目根目录的 `cloudflare.config.ts` 和相关配置文件中。
- 不把凭证、Token、`.env` 或 Wrangler 私有配置提交到仓库。
- 部署前必须先通过本地 Next.js 构建和 vinext 构建。

## 常用命令

```bash
npm run dev
npm run build
npm run build:vinext
npm run cf:d1:migrate
npm run cf:d1:migrate:remote
npm run deploy:vinext
```

## 免费方案边界

当前只使用 Cloudflare Workers Free、D1 Free 和 `workers.dev` 子域名，不主动启用付费计划或付费服务。
