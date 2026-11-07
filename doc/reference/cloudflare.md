# Cloudflare Workers、D1 与 vinext

## 官方资料

### Workers

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)：官方文档入口。
- [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)：查询 Worker 中可用的请求、响应、流和运行时 API。
- [Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/)：核对 Free 和 Paid 方案的额度与计费。

### Next.js 部署

- [Next.js on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)：Cloudflare 官方 Next.js 部署和绑定说明。
- [vinext Repository](https://github.com/cloudflare/vinext)：官方文档入口。
- [vinext Documentation](https://github.com/cloudflare/vinext#readme)：查询 vinext 初始化、构建、绑定和部署命令。

### D1

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)：官方文档入口。
- [D1 API](https://developers.cloudflare.com/d1/worker-api/)：在 Worker 中执行 SQL 和访问 D1 binding。
- [D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/)：查看 D1 免费额度、读取和写入计费。
- [D1 Limits](https://developers.cloudflare.com/d1/platform/limits/)：确认数据库大小、查询和账户限制。
- [D1 Migrations](https://developers.cloudflare.com/d1/reference/migrations/)：管理本地和远程数据库迁移。

### Wrangler

- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)：官方文档入口。
- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)：配置 Worker、D1 binding 和环境。
- [Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/)：查询部署、迁移、登录和资源管理命令。

## 项目用途

- Workers：运行部署后的 Next.js 页面和 API
- D1：保存应用数据
- vinext：将 Next.js 项目适配到 Cloudflare Workers
- Wrangler：执行 D1 迁移、类型生成和 Cloudflare 操作

## Cloudflare Tunnel

- [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)：将本地服务安全连接到 Cloudflare 网络。
- [Quick Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/)：生成临时 `trycloudflare.com` 地址，适合本地测试。
- [cloudflared Releases](https://github.com/cloudflare/cloudflared/releases)：安装和更新 `cloudflared` 客户端。

### 项目测试用途

临时 Tunnel 用于把本地 Pi 服务暴露给测试链路。它依赖本机持续运行、地址每次可能变化，不作为长期生产服务。
