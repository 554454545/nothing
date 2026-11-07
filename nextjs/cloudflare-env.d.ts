declare module "cloudflare:workers" {
  export const env: {
    PI_CHAT_URL?: string;
    nextjs_mvp_db: {
      prepare(query: string): {
        bind(...values: unknown[]): {
          first<T = unknown>(): Promise<T | null>;
        };
        all<T = unknown>(): Promise<{ results: T[] }>;
      };
    };
  };
}
