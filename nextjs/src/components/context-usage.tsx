"use client";

export type ContextUsageData = {
  systemPrompt: number;
  toolDefinitions: number;
  rules: number;
  skills: number;
  mcpTools: number;
  subagents: number;
  conversation: number;
  limit: number;
};

const segments = [
  ["System prompt", "systemPrompt", "context-segment-system"],
  ["Tool definitions", "toolDefinitions", "context-segment-tools"],
  ["Rules", "rules", "context-segment-rules"],
  ["Skills", "skills", "context-segment-skills"],
  ["MCP & dynamic tools", "mcpTools", "context-segment-mcp"],
  ["Subagent definitions", "subagents", "context-segment-subagents"],
  ["Conversation", "conversation", "context-segment-conversation"],
] as const;

const formatTokens = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toLocaleString();

export function ContextUsage({ data }: { data: ContextUsageData }) {
  const total = segments.reduce((sum, [, key]) => sum + data[key], 0);
  const percent = Math.min((total / data.limit) * 100, 100);

  return (
    <section className="context-card" aria-label="Context Usage">
      <div className="context-heading">
        <div>
          <h2>Context Usage</h2>
          <p>{Math.round(percent)}% Full</p>
        </div>
        <span>~{formatTokens(total)} / {formatTokens(data.limit)} Tokens</span>
      </div>

      <div className="context-bar" aria-label={`${Math.round(percent)} percent used`}>
        {segments.map(([, key, className]) => (
          <span
            key={key}
            className={`context-segment ${className}`}
            style={{ width: `${(data[key] / data.limit) * 100}%` }}
          />
        ))}
      </div>

      <div className="context-legend">
        {segments.map(([label, key, className]) => (
          <div className="context-row" key={key}>
            <span className={`context-swatch ${className}`} />
            <span>{label}</span>
            <strong>{formatTokens(data[key])}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
