#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PI_LOG="$ROOT/.pi-chat.log"
TUNNEL_LOG="$ROOT/.pi-tunnel.log"
CLOUDFLARED="${CLOUDFLARED_BIN:-$ROOT/bin/cloudflared}"

if [ ! -x "$CLOUDFLARED" ]; then CLOUDFLARED="$(command -v cloudflared || true)"; fi
if [ -z "$CLOUDFLARED" ]; then echo "未找到 cloudflared。"; exit 1; fi

if ! curl -fsS http://127.0.0.1:8787/health >/dev/null 2>&1; then
  (cd "$ROOT" && npm run pi:chat >"$PI_LOG" 2>&1) &
fi
for _ in $(seq 1 30); do
  curl -fsS http://127.0.0.1:8787/health >/dev/null 2>&1 && break
  sleep 1
done
curl -fsS http://127.0.0.1:8787/health >/dev/null 2>&1 || { echo "Pi 服务启动失败，请查看 $PI_LOG"; exit 1; }

if ! pgrep -f "$CLOUDFLARED tunnel --url http://127.0.0.1:8787" >/dev/null 2>&1; then
  : > "$TUNNEL_LOG"
  "$CLOUDFLARED" tunnel --url http://127.0.0.1:8787 >"$TUNNEL_LOG" 2>&1 &
fi
PI_CHAT_URL=""
for _ in $(seq 1 30); do
  PI_CHAT_URL="$(grep -o 'https://[-a-z0-9]*\.trycloudflare\.com' "$TUNNEL_LOG" | head -1 || true)"
  [ -n "$PI_CHAT_URL" ] && break
  sleep 1
done
[ -n "$PI_CHAT_URL" ] || { echo "Tunnel 地址生成失败，请查看 $TUNNEL_LOG"; exit 1; }

echo "Pi：127.0.0.1:8787"
echo "Tunnel：$PI_CHAT_URL"
cd "$ROOT/nextjs"
PI_CHAT_URL="$PI_CHAT_URL" npm run deploy:vinext
echo "公网网页：https://nextjs-mvp.quacker-zhang.workers.dev"
