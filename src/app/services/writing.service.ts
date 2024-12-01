import { Injectable } from '@angular/core';
import { Message } from 'ai';
import {
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { Conversation } from '../types/conversation.interface';
import { ChatMessage } from '../types/chat-message.interface';

@Injectable({
  providedIn: 'root',
})
export class WritingService {
  session: Session | undefined;
  private _conversationKey = 'writing';
  private _conversation = new ReplaySubject<Conversation>(1);
  private _conversations = new ReplaySubject<Map<string, Conversation>>(1);

  /**
   * Constructor
   */

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for conversation
   */
  get conversation$(): Observable<Conversation> {
    return this._conversation.asObservable();
  }

  /**
   * Getter for conversations
   */
  get conversations$(): Observable<Map<string, Conversation>> {
    return this._conversations.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get conversations
   * @param size
   * @param sort
   * @param order
   * @param search
   */

  async getConversations(
    sort = 'id',
    order: 'asc' | 'desc' | '' = 'asc',
    search = '',
  )  :Promise<Map<string, Conversation>> {
    let restoredMap = new Map<string, Conversation>();
    chrome.storage.local.get(this._conversationKey, (result) => {
      if (result[this._conversationKey]) {
        restoredMap = new Map<string, Conversation>(
          result[this._conversationKey],
        );
        console.debug('Restored Map:', restoredMap);
      } else {
        console.debug('No Map Stored.');
      }

      this._conversations.next(restoredMap);
      return map;
    });
    return restoredMap;
  }

  /**
   * Get conversation by id
   */
  getConversationById(id: string): Observable<Conversation | null> {
    return this._conversations.pipe(
      take(1),
      map((conversations) => {
        // Find the conversation
        const conversation = conversations.get(id) || null;

        // Update the conversation
        if (conversation) {
          this._conversation.next(conversation);
          this.createSesssion(conversation.messages);
        }

        // Return the conversation
        return conversation;
      }),
      switchMap((conversation) => {
        if (!conversation) {
          throwError(() => new Error('Could not found conversation with id of ' + id + '!'))
        }

        return of(conversation);
      }),
    );
  }

  /**
   * Create conversation
   */
  createConversation(conversation: Conversation) {
    return this.conversations$.pipe(
      take(1),
      map((conversations) => {
        console.log('createConversation!');
        conversations.set(conversation.id, conversation);
        // Convert Map to an array and store it
        chrome.storage.local.set( { [this._conversationKey]: Array.from(conversations) }, () => {
            console.log('Map stored successfully!');
            // Update the conversations with the new conversation
            this._conversations.next(conversations);
            // Return the new conversation
            return conversation;
          },
        );
      }),
    );
  }

  updateConversation(conversation: Conversation) {
    return this.conversations$.pipe(
      take(1),
      map((conversations) => {
        conversations.set(conversation.id, conversation);
        // Convert Map to an array and store it
        chrome.storage.local.set( { [this._conversationKey]: Array.from(conversations) }, () => {
            console.log('Map stored successfully!');
            // Update the conversations with the new conversation
            this._conversations.next(conversations);
            // Return the new conversation
            return conversation;
          },
        );
      }),
    );
  }

  deleteConversation(id: string) {
    return this.conversations$.pipe(
      take(1),
      map((conversations) => {
        const isDeleted = conversations.delete(id);
        if (isDeleted) {
          chrome.storage.local.set( { [this._conversationKey]: Array.from(conversations) }, () => {
              console.debug('Map deleted successfully!');
              // Update the conversations with the new conversation
              this._conversations.next(conversations);
              // Return the new conversation
              return true;
            },
          );
        }
      }),
    );
  }

  async createSesssion(messages?: ChatMessage[]) {
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
