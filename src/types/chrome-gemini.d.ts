export {};
import type { ReadableStream } from 'node:stream/web';

declare global {
  interface CreateSessionParams {
    systemPrompt?: string;
    temperature?: number;
    topK?: number;
    initialPrompts?: { role: string; content: string }[];
  }

  interface Session {
    prompt: (string, signal?: {}) => any; // possibly string
    // promptStreaming: (string, signal?: {}) => AsyncIterableIterator<string>;
    promptStreaming: (string, signal?: {}) => ReadableStream<any>; // object

    clone: (signal?: any) => Promise<any>;
  }

  interface AISession {
    create: (params?: CreateSessionParams) => Promise<Session>;
    capabilities: () => Promise<any>;
    // destroy: () => void;
  }
  interface AI {
    languageModel: AISession;
  }
  interface Window {
    ai: AI;
  }
}
