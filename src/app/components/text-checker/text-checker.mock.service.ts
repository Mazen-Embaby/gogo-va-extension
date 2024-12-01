import { Injectable } from '@angular/core';
import SuggestionData from './types/suggestion-data.interface';

interface xx{
  matches: SuggestionData[]
}

@Injectable({
  providedIn: 'root',
})
export class GrammarMockService {
  constructor() {}

  async mockGrammarResponse(text: string) {
    // Mock grammar issues
    const mockGrammarIssues:xx  = {
      matches:  [
        {
          message: 'Possible spelling mistake found.',
          start: 10,
          end: 16,
          replacements: { oldValue: 'mistak',newValue: 'mistake' },
        },
        {
          message: "Consider using 'is' instead of 'are' in this context.",
          start: 22,
          end: 25,
          replacements: { oldValue: 'are', newValue: 'is' },
        },
      ],
      // other improvements
    };

    const grammarIssues = mockGrammarIssues.matches.filter((issue) => {
      return issue.end <= text.length;
    });
    return grammarIssues;
  }
}
