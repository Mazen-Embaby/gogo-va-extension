import { Injectable } from '@angular/core';
import { ChatMessage } from '../types/chat-message.interface';
import { Conversation } from '../types/conversation.interface';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  constructor() { }

  async createSesssion(messages?: ChatMessage[]): Promise<Session> {

    if (messages) {
      return await window.ai.languageModel.create({
        initialPrompts: messages,
      });
    } else {
      return await window.ai.languageModel.create();
    }
  }

  async promptText(text: string, session?: Session): Promise<any> {
    if (!session) {
      session = await this.createSesssion();
    }
    const res = session.prompt(text);
    return res;
  }

  async streamText(text: string, session?: Session) {
    if (!session) {
      session = await this.createSesssion();
    }
    const res = session.promptStreaming(text);
    return res;
  }
}
