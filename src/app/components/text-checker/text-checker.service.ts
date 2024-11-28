import { Injectable } from '@angular/core';
import { map, ReplaySubject, switchMap, take } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import SuggestionData from './types/suggestion-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TextCheckerService {
  constructor(private chatService: ChatService) {}

  textareaValue$ = new ReplaySubject<string>(1);
  selectedSuggestion$ = new ReplaySubject<SuggestionData>(1);


  async checkMistakes(text: string) {
    const response = await this.chatService.promptText(text);
    return response;
  }

  changeToCurrentSuggestion() {
    return this.textareaValue$.pipe(
      take(1),
      switchMap((textVal) =>
        this.selectedSuggestion$.pipe(
          map((suggestion) => {
            const x =
              textVal.substring(0, suggestion.offset) +
              suggestion.replacements![0].new +
              textVal.substring(suggestion.offset + suggestion.length);
            this.textareaValue$.next(x);
            return x;
          }),
        ),
      ),
    );
  }
  escapeHtml(text: string) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
