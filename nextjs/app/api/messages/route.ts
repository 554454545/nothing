import { addMessage, listMessages } from "../../../src/lib/messages-store";

async function getD1() {
  try {
    const { env } = await import("cloudflare:workers");
    return env.nextjs_mvp_db;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = await getD1();
  if (db) {
    const result = await db
      .prepare("SELECT id, content, created_at AS createdAt FROM messages ORDER BY id DESC")
      .all();
    return Response.json({ messages: result.results });
  }

  return Response.json({ messages: listMessages() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { content?: unknown };
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!content) {
    return Response.json({ error: "请输入内容" }, { status: 400 });
  }

  const db = await getD1();
  if (db) {
    const message = await db
      .prepare("INSERT INTO messages (content) VALUES (?) RETURNING id, content, created_at AS createdAt")
      .bind(content)
      .first();
    return Response.json({ message }, { status: 201 });
  }

  return Response.json({ message: addMessage(content) }, { status: 201 });
}
