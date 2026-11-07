export async function POST(request: Request) {
  const body = await request.text();
  try {
    const { env } = await import("cloudflare:workers");
    const target = env.PI_CHAT_URL || "http://127.0.0.1:8787";
    const response = await fetch(`${target}/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    return new Response(await response.text(), {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return Response.json({ error: "Pi 对话服务未启动，请先运行 npm run pi:chat" }, { status: 503 });
  }
}

export async function PUT() {
  try {
    const { env } = await import("cloudflare:workers");
    const target = env.PI_CHAT_URL || "http://127.0.0.1:8787";
    const response = await fetch(`${target}/model/next`, { method: "POST" });
    return new Response(await response.text(), {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return Response.json({ error: "Pi 对话服务未启动" }, { status: 503 });
  }
}

export async function GET() {
  try {
    const { env } = await import("cloudflare:workers");
    const target = env.PI_CHAT_URL || "http://127.0.0.1:8787";
    const response = await fetch(`${target}/models`);
    return new Response(await response.text(), { status: response.status, headers: { "content-type": "application/json" } });
  } catch {
    return Response.json({ error: "Pi 对话服务未启动" }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { env } = await import("cloudflare:workers");
    const target = env.PI_CHAT_URL || "http://127.0.0.1:8787";
    const response = await fetch(`${target}/model`, { method: "POST", headers: { "content-type": "application/json" }, body: await request.text() });
    return new Response(await response.text(), { status: response.status, headers: { "content-type": "application/json" } });
  } catch {
    return Response.json({ error: "Pi 对话服务未启动" }, { status: 503 });
  }
}
