export type Message = {
  id: number;
  content: string;
  createdAt: string;
};

type MessageStore = { messages: Message[]; nextId: number };

const globalStore = globalThis as typeof globalThis & { __messageStore?: MessageStore };
const store = globalStore.__messageStore ??= { messages: [], nextId: 1 };

export function listMessages() {
  return [...store.messages].reverse();
}

export function addMessage(content: string) {
  const message = { id: store.nextId++, content, createdAt: new Date().toISOString() };
  store.messages.push(message);
  return message;
}
