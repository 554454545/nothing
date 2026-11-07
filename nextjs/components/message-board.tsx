"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Message } from "../lib/messages-store";

export function MessageBoard() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  async function loadMessages() {
    const response = await fetch("/api/messages");
    const data = (await response.json()) as { messages: Message[] };
    setMessages(data.messages);
  }

  useEffect(() => { void loadMessages(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setContent("");
    await loadMessages();
  }

  return (
    <section className="message-board">
      <h2>最小全栈示例</h2>
      <form onSubmit={submit} className="echo-form">
        <div className="echo-controls">
          <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="写一条内容" />
          <button type="submit">保存</button>
        </div>
      </form>
      <ul className="message-list">
        {messages.map((message) => <li key={message.id}>{message.content}</li>)}
      </ul>
    </section>
  );
}
