import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-text-monitor',
  imports: [NgFor, NgIf],
  standalone: true,
  template: `
    <textarea (input)="onTextInput($event)" placeholder="Type here..."></textarea>
    <div *ngIf="suggestions.length > 0">
      <h4>Suggestions</h4>
      <ul>
        <li *ngFor="let suggestion of suggestions">{{ suggestion }}</li>
      </ul>
    </div>
  `,
  styles: [`
    textarea {
      width: 100%;
      height: 100px;
    }
  `],
})
export class TextMonitorComponent {
  suggestions: string[] = [];

  onTextInput(event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    console.log('User input:', text);

    // Send text to background script for grammar checking
    // chrome.runtime.sendMessage({ type: 'checkGrammar', text }, (response) => {
    //   if (response && response.suggestions) {
    //     this.suggestions = response.suggestions.map((s: any) => s.message);
    //   }
    // });
  }
}
