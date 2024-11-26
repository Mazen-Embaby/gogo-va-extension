import { Injectable } from '@angular/core';


import { CoreMessage, generateText, Message, streamText } from 'ai';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  conversations = new Map<string, Message>();

  session: Session | undefined;

  constructor() {}

  async createSesssion(messages?: Message[]) {
    if (messages) {
      this.session = await window.ai.languageModel.create({
        initialPrompts: messages,
      });
    } else {
      this.session = await window.ai.languageModel.create();
    }
  }

  async promptText(text: string): Promise<any> {
    if (!this.session) {
      await this.createSesssion();
    }
    const res = this.session!.prompt(text);
    return res;
  }

  async streamText(text: string) {
    if (!this.session) {
      await this.createSesssion();
    }
    const res = this.session!.promptStreaming(text);
    return res;
  }
}
