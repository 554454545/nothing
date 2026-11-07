import { createServer } from "node:http";
import { createAgentSession } from "@earendil-works/pi-coding-agent";

const port = Number(process.env.PI_CHAT_PORT ?? 8787);
const openaiModels = ["gpt-5.6-luna", "gpt-5.6-sol", "gpt-5.6-terra", "gpt-6-astra", "gpt-6-luna", "gpt-6-sol", "gpt-6.1-sol", "gpt-6.1-terra"];
const { session } = await createAgentSession({
  cwd: process.env.PI_CHAT_CWD ?? `${process.env.HOME}/workspace/coding`,
  agentDir: process.env.PI_AGENT_DIR ?? `${process.env.HOME}/.pi/agent`,
});

function json(response: import("node:http").ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    return json(response, 200, { ok: true, model: session.model?.id });
  }

  if (request.method === "POST" && request.url === "/chat") {
    let raw = "";
    for await (const chunk of request) raw += chunk;
    const body = JSON.parse(raw) as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return json(response, 400, { error: "请输入内容" });

    await session.prompt(message);
    return json(response, 200, {
      reply: session.getLastAssistantText(),
      model: session.model?.id,
      createdAt: new Date().toISOString(),
    });
  }

  if (request.method === "GET" && request.url === "/models") {
    return json(response, 200, { models: openaiModels, current: session.model?.id });
  }

  if (request.method === "POST" && request.url === "/model") {
    let raw = "";
    for await (const chunk of request) raw += chunk;
    const body = JSON.parse(raw) as { model?: unknown };
    const target = typeof body.model === "string" ? body.model : "";
    if (!openaiModels.includes(target)) return json(response, 400, { error: "只支持 OpenAI 模型" });

    for (let attempt = 0; attempt < 30 && session.model?.id !== target; attempt++) {
      await session.cycleModel("forward");
    }
    if (session.model?.id !== target) return json(response, 400, { error: `当前模型列表中找不到 ${target}` });
    return json(response, 200, { model: session.model.id, createdAt: new Date().toISOString() });
  }

  return json(response, 404, { error: "Not found" });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Pi chat server listening on http://127.0.0.1:${port}`);
});

process.on("SIGINT", () => { session.dispose(); server.close(); });
process.on("SIGTERM", () => { session.dispose(); server.close(); });
