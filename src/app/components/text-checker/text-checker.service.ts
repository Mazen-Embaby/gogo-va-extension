import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { map, ReplaySubject, switchMap, take } from 'rxjs';
import { SuggestionHighlightComponent } from './suggestion-highlight/suggestion-highlight.component';
import { ChatService } from '../../services/chat.service';
import SuggestionData from './type/suggestion-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TextCheckerService {
  constructor(private chatService: ChatService) {}

  textareaValue$ = new ReplaySubject<string>(1);
  selectedSuggestion$ = new ReplaySubject<SuggestionData>(1);

  suggestionHighlightComponents$ = new ReplaySubject<
    ComponentRef<SuggestionHighlightComponent>[]
  >(1);

  selectedTextChecker$ = new ReplaySubject<ViewContainerRef>(1);

  selectedSuggestionHighlightComponents$ = new ReplaySubject<
    ComponentRef<SuggestionHighlightComponent>
  >(1);

  setSuggestionHighlightComponents(
    x: ComponentRef<SuggestionHighlightComponent>[],
  ) {
    this.suggestionHighlightComponents$.next(x);
  }

  setSelectedTextChecker(x: ViewContainerRef) {
    this.selectedTextChecker$.next(x);
  }

  setSelectedSuggestionHighlightComponent(
    x: ComponentRef<SuggestionHighlightComponent>,
  ) {
    this.selectedSuggestionHighlightComponents$.next(x);
  }

  async checkMistakes(text: string) {
    const x = await this.chatService.promptText(text);
    return x;
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
