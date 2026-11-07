"use client";

import { FormEvent, useState } from "react";

export function EchoForm() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = (await response.json()) as { result?: string; error?: string };
    setResult(data.result ?? data.error ?? "");
  }

  return (
    <form className="echo-form" onSubmit={submit}>
      <label htmlFor="message">输入内容</label>
      <div className="echo-controls">
        <input
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="例如：你好 Next.js"
        />
        <button type="submit">发送</button>
      </div>
      {result && <p className="echo-result">{result}</p>}
    </form>
  );
}
