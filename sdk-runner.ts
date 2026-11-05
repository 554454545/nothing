import { createAgentSession } from "@earendil-works/pi-coding-agent";

const { session } = await createAgentSession({
  agentDir: `${process.cwd()}/.pi/agent`,
});

const prompt = process.argv.slice(2).join(" ") || "Say hello in one sentence.";
await session.prompt(prompt);
console.log(session.getLastAssistantText());
session.dispose();
