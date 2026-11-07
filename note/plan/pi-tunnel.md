# Pi 临时 Tunnel 使用规则

## 用途

在测试阶段，让公网网页临时访问本机 Pi 服务：

```text
公网网页
  ↓
Cloudflare Worker
  ↓
临时 trycloudflare.com Tunnel
  ↓
本地 Pi 服务
```

## 每次开机后的启动顺序

### 一键启动

如果希望自动启动 Pi、创建临时 Tunnel、部署公网 Worker，直接运行：

```bash
cd /home/judy/workspace/coding
npm run pi:public
```

脚本会自动完成：

1. 启动本地 Pi 服务。
2. 创建临时 Cloudflare Tunnel。
3. 读取本次生成的 `trycloudflare.com` 地址。
4. 将地址配置到 Cloudflare Worker。
5. 构建并部署公网网页。
6. 输出公网网页地址。

保持运行 Pi 和 Tunnel 的终端或后台进程，不要主动结束它们。

### 1. 启动临时 Tunnel

在项目根目录运行：

```bash
npm run pi:tunnel
```

脚本会：

- 检查 `cloudflared` 是否已安装。
- 启动本地 Pi 服务 `127.0.0.1:8787`。
- 检查 Pi 健康状态。
- 启动临时 Tunnel。
- 在终端显示本次生成的 `trycloudflare.com` 地址。

### 2. 保持终端运行

临时 Tunnel 依赖当前进程。关闭终端、关机或网络断开后，公网访问会停止。

### 3. 本地网页

另开终端运行：

```bash
cd nextjs
npm run dev
```

## 重启后的行为

- 每次启动可能得到新的临时地址。
- Pi 服务和 Tunnel 都需要重新启动。
- Cloudflare Worker 如果配置了旧 Tunnel 地址，需要更新为新地址并重新部署。

## 适用范围

- 只用于个人测试和开发验证。
- 不作为长期公网服务。
- 不在临时 Tunnel 上放置真实用户数据或长期凭证。

## 日志

- Pi 日志：`.pi-chat.log`
- Tunnel 日志：`.pi-tunnel.log`

这些日志文件已加入 Git 忽略规则。

## 统一恢复命令

以后用户说“一键恢复”时，默认执行：

```bash
cd /home/judy/workspace/coding
npm run pi:public
```

执行要求：

- 使用 tmux 会话托管本地 Pi 和临时 Tunnel，避免当前终端结束时服务被清理。
- 如果已有 `pi-public` 会话，先检查并复用可用进程。
- 如果 Pi 或 Tunnel 已停止，重新启动对应进程。
- 读取新的临时 Tunnel 地址。
- 使用新的 `PI_CHAT_URL` 重新部署 Cloudflare Worker。
- 部署完成后验证公网 `/api/chat`。
- 向用户报告公网地址、Tunnel 状态和验证结果。
