// export default interface Message {
//   content: string;
//   role: string;
// }

import { Message } from 'ai';

export type ChatMessage = {
  content: string;
  role: 'system' | 'user' | 'assistant' | 'function' | 'data' | 'tool';
  avatar? :string;
};
