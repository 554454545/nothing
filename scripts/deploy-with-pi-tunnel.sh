#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TUNNEL_LOG="$ROOT/.pi-tunnel.log"

if ! grep -q 'trycloudflare.com' "$TUNNEL_LOG" 2>/dev/null; then
  echo "没有找到正在运行的临时 Tunnel。先运行 npm run pi:tunnel，并保持该终端运行。"
  exit 1
fi

PI_CHAT_URL="$(grep -o 'https://[-a-z0-9]*\.trycloudflare\.com' "$TUNNEL_LOG" | head -1)"
if [ -z "$PI_CHAT_URL" ]; then
  echo "无法从 $TUNNEL_LOG 读取 Tunnel 地址。"
  exit 1
fi

echo "使用 Pi Tunnel：$PI_CHAT_URL"
cd "$ROOT/nextjs"
PI_CHAT_URL="$PI_CHAT_URL" npm run deploy:vinext
