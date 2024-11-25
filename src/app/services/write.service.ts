import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WriteService {
  constructor() {}

  escapeHtml(text: string) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
