import { ChatMessage } from './chat-message.interface';

export interface Conversation {
  id: string; // ULID
  name: string;
  date: number;
  messages: ChatMessage[];
  isFav: boolean;
}