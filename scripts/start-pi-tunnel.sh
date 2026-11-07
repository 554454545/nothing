#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PI_LOG="$ROOT/.pi-chat.log"
TUNNEL_LOG="$ROOT/.pi-tunnel.log"
CLOUDFLARED="${CLOUDFLARED_BIN:-$ROOT/bin/cloudflared}"

if [ ! -x "$CLOUDFLARED" ]; then
  CLOUDFLARED="$(command -v cloudflared || true)"
fi

if [ -z "$CLOUDFLARED" ]; then
  echo "未找到 cloudflared。请先安装 cloudflared，再运行此脚本。"
  exit 1
fi

if ! curl -fsS http://127.0.0.1:8787/health >/dev/null 2>&1; then
  (cd "$ROOT" && npm run pi:chat >"$PI_LOG" 2>&1) &
  for _ in $(seq 1 30); do
    curl -fsS http://127.0.0.1:8787/health >/dev/null 2>&1 && break
    sleep 1
  done
fi

if ! curl -fsS http://127.0.0.1:8787/health >/dev/null 2>&1; then
  echo "Pi 服务启动失败，请查看 $PI_LOG"
  exit 1
fi

echo "Pi 服务已运行：http://127.0.0.1:8787"
echo "正在创建临时 Cloudflare Tunnel，保持此终端运行。"
"$CLOUDFLARED" tunnel --url http://127.0.0.1:8787 2>&1 | tee "$TUNNEL_LOG"
