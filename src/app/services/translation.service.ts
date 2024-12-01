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
export class TranslationService {
  session: Session | undefined;
  private _conversationKey = 'translation';
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
  ): Promise<Map<string, Conversation>> {
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
          throwError(
            () =>
              new Error('Could not found conversation with id of ' + id + '!'),
          );
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
        chrome.storage.local.set(
          { [this._conversationKey]: Array.from(conversations) },
          () => {
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
        chrome.storage.local.set(
          { [this._conversationKey]: Array.from(conversations) },
          () => {
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
          chrome.storage.local.set(
            { [this._conversationKey]: Array.from(conversations) },
            () => {
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

  async canDetect (): Promise<string | undefined> {
    if (window.translation) {
      const canDetect = await window.translation.canDetect();
      if (canDetect === 'no') {
        // The language detector isn't usable.
        throw Error(`The language detector isn't usable.`);
      } else if (canDetect === 'readily') {
        // The language detector can immediately be used.
        return canDetect;
      } else {
        // The language detector can be used after model download.
        const detector = await window.translation.createDetector();
        console.log(`he language detector can be used after model download`);
      }
    } else {
      throw Error('Enable API..');
    }
    return undefined;
  }

  async detecLanguage(text: string): Promise<Detected[] | undefined> {
    if (await this.canDetect()!=='readily'){
      return;
    }
    // The language detector can immediately be used.
    const detector = await window.translation.createDetector();
    // detect function problem when used in chrome extension doesn't return anything;
    const x = await detector.detect(text);

    return x;
  }


  async canTranslate (sourceLanguage = 'en', targetLanguage ='fr'): Promise<string | undefined> {
    if (window.translation) {
      const canTranslate = await window.translation.canTranslate({sourceLanguage: sourceLanguage, targetLanguage: targetLanguage });
      if (canTranslate === 'readily') {
        // The language detector can immediately be used.
        return canTranslate;
      }
      else if (canTranslate === 'no') {
        // The language detector isn't usable.
        throw Error(`possible for this browser to translate as requested.`);
      } 
      else if (canTranslate ==='after-download') {
        throw Error(`The browser can perform the translation, but only after it downloads the relevant model`);
      }
      else {
        // The language detector can be used after model download.
        const detector = await window.translation.createTranslator({sourceLanguage: sourceLanguage, targetLanguage: targetLanguage, });
        console.log(`The language detector can be used after model download`);
      }
    } else {
      throw Error('Enable API..');
    }
    return undefined;
  }


  async translate(text: string, sourceLanguage = 'en', targetLanguage ='fr'): Promise<string | undefined> {
    if (await this.canTranslate()!=='readily'){
      return;
    }
    // The language detector can immediately be used.
    const translator = await window.translation.createTranslator({sourceLanguage: sourceLanguage, targetLanguage: targetLanguage, });
    // detect function problem when used in chrome extension doesn't return anything;
    const x = await translator.translate(text);
    return x;
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

  async promptText(text: string, newSession = true): Promise<any> {
    if (!this.session || newSession) {
      await this.createSesssion();
    }
    const res = this.session!.prompt(text);
    return res;
  }

  async streamText(text: string, newSession = true) {
    if (!this.session) {
      await this.createSesssion();
    }
    const res = this.session!.promptStreaming(text);
    return res;
  }
}
