import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GrammarMockService {
  constructor() {}

  async mockGrammarResponse(text: string) {
    // Mock grammar issues
    const mockGrammarIssues = {
      matches: [
        {
          message: 'Possible spelling mistake found.',
          offset: 10,
          length: 6,
          replacements: [{ value: 'mistake' }],
        },
        {
          message: "Consider using 'is' instead of 'are' in this context.",
          offset: 22,
          length: 3,
          replacements: [{ value: 'is' }],
        },
      ],
    };

    const grammarIssues = mockGrammarIssues.matches.filter((issue) => {
      return issue.offset + issue.length <= text.length;
    });
    return grammarIssues;
  }
}
