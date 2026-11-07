# Pi Agent 服务

## 启动

在项目根目录运行：

```bash
npm run pi:chat
```

服务监听 `127.0.0.1:8787`，提供连续对话和模型切换接口。

## 本地网页

另开终端运行：

```bash
cd nextjs
npm run dev
```

然后打开本地页面，使用“Pi 对话”面板。

## 说明

- Pi SDK 逻辑独立放在本目录。
- 对话服务使用本机 Pi 凭证和模型配置。
- 当前不部署到 Cloudflare Workers；Cloudflare Workers 不能直接运行本地 Pi SDK 进程。
- Next.js 页面通过本地 `/api/chat` 代理连接 Pi 服务。
