import { ContextUsage, type ContextUsageData } from "../../components/context-usage";
import { EchoForm } from "../../components/echo-form";
import { MessageBoard } from "../../components/message-board";
import { ChatPanel } from "../../components/chat-panel";
import "../../components/context-usage.css";

const usage: ContextUsageData = {
  systemPrompt: 3100,
  toolDefinitions: 7200,
  rules: 509,
  skills: 2500,
  mcpTools: 4600,
  subagents: 1300,
  conversation: 41800,
  limit: 256000,
};

export default function Home() {
  return <main><ContextUsage data={usage} /><EchoForm /><MessageBoard /><ChatPanel /></main>;
}
