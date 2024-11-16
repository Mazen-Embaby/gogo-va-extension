import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  ngOnInit(): void {
    // Display suggestions in the popup if needed for further analysis
    chrome.storage.sync.get(
      'suggestions',
      (data: { suggestions: string[] }) => {
        const suggestionsContainer = document.getElementById('suggestions');
        if (suggestionsContainer && data.suggestions) {
          data.suggestions.forEach((suggestion: string) => {
            const div = document.createElement('div');
            div.innerText = suggestion;
            suggestionsContainer.appendChild(div);
          });
        }
      }
    );
  }
}
