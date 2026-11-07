export async function POST(request: Request) {
  const body = (await request.json()) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return Response.json({ error: "请输入内容" }, { status: 400 });
  }

  return Response.json({ result: `后端收到：${message}` });
}
