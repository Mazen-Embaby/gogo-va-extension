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
    summarizer: Summarizer;
  }


////////////////////////////////////////
interface CreateSummarizeParams {
  sharedContext: string = '';
  type: string = 'key-points';
  format: string = 'markdown';
  length: string = 'medium';
}

interface Summarizer {
  create: (params?: CreateSummarizeParams) => Promise<SummarizeResult>;
  capabilities: () => Promise<any>;

}
interface SummarizeOptionParams {
context: string = '';
}

interface SummarizeResult{
  summarize: (text: string, options?: SummarizeOptionParams) => Promise<string>;
  summarizeStreaming: (text: string, options?: SummarizeOptionParams ) => ReadableStream<any>; // object
}


///////////////////////////////////////

  interface CanTranslateParams {
    sourceLanguage: string;
    targetLanguage: string;
  }
  interface Detecor{
    detect: (string) => Promise<Detected[]>;
  }

  interface Translator {
    translate: (string) => Promise<any>;
  }

  interface Detected {
    detectedLanguage: any;
    confidence: any;
  }

  interface Translation {
    canDetect: () => Promise<any>;
    canTranslate: (CanTranslateParams) => Promise<any>;
    createDetector: () => Promise<Detecor>;
    createTranslator: (CanTranslateParams) => Promise<Translator>;
  }

  interface Window {
    ai: AI;
    translation: Translation;
  }
}
