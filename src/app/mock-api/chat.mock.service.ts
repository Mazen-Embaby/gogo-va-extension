import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatMockService {
  constructor() {}

  
  async *mockAIResponse(input: string): AsyncIterableIterator<string> {
    const responses = [
      `Thinking about "${input}"...`,
      'This is my first thought...',
      'Here’s something deeper...',
    ];
    for (const response of responses) {
      yield response;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
