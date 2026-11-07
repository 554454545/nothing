"use client";

import { FormEvent, useEffect, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string; createdAt: string };

const formatTime = (value: string) => new Intl.DateTimeFormat("zh-CN", {
  hour: "2-digit", minute: "2-digit", second: "2-digit",
}).format(new Date(value));

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("当前模型");
  const [models, setModels] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadModels() {
    const response = await fetch("/api/chat");
    const data = await response.json() as { models?: string[]; current?: string };
    setModels(data.models ?? []);
    if (data.current) setModel(data.current);
  }

  useEffect(() => { void loadModels(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || busy) return;
    const createdAt = new Date().toISOString();
    setMessages((items) => [...items, { role: "user", content, createdAt }]);
    setInput("");
    setBusy(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: content }),
    });
    const data = await response.json() as { reply?: string; model?: string; error?: string; createdAt?: string };
    setMessages((items) => [...items, { role: "assistant", content: data.reply ?? data.error ?? "没有返回内容", createdAt: data.createdAt ?? new Date().toISOString() }]);
    if (data.model) setModel(data.model);
    setBusy(false);
  }

  async function selectModel(value: string) {
    const response = await fetch("/api/chat", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ model: value }) });
    const data = await response.json() as { model?: string; error?: string };
    setModel(data.model ?? data.error ?? "切换失败");
  }

  return (
    <section className="chat-panel">
      <div className="chat-header"><h2>Pi 对话</h2><select value={model} onChange={(event) => void selectModel(event.target.value)}><option value="当前模型">切换模型</option>{models.map((item) => <option key={item} value={item}>{item}</option>)}</select><span>{model}</span></div>
      <div className="chat-messages">{messages.length === 0 && <p>开始和 Pi 对话</p>}{messages.map((item, index) => <div className={`chat-message ${item.role}`} key={`${item.role}-${index}`}><div>{item.content}</div><time>{formatTime(item.createdAt)}</time></div>)}</div>
      <form onSubmit={submit} className="chat-form"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="输入问题" disabled={busy} /><button type="submit" disabled={busy}>{busy ? "处理中" : "发送"}</button></form>
    </section>
  );
}
