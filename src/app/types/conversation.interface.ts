import { ChatMessage } from "./chat-message.interface";

export interface Conversation {
    id: string; // ULID
    messages: ChatMessage[];
}