import { Injectable } from '@angular/core';
import SuggestionData from './type/suggestion-data.interface';

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
          offset: 10,
          length: 6,
          replacements: [{ old: 'mistak',new: 'mistake' }],
        },
        {
          message: "Consider using 'is' instead of 'are' in this context.",
          offset: 22,
          length: 3,
          replacements: [{ old: 'are', new: 'is' }],
        },
      ],
      // other improvements
    };

    const grammarIssues = mockGrammarIssues.matches.filter((issue) => {
      return issue.offset + issue.length <= text.length;
    });
    return grammarIssues;
  }
}
