import { Component, OnInit } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

const updateBackgroundColor = (color: string) =>
  (document.body.style.backgroundColor = color);

@Component({
  selector: 'app-colorize',
  standalone: true,
  imports: [ColorPickerModule],
  templateUrl: './colorize.component.html',
  styleUrl: './colorize.component.scss',
})
export class ColorizeComponent implements OnInit {
  color = '#ffffff';

  ngOnInit(): void {
    console.log('COLORIZE');

    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
    });
  }

  public updateColor(color: string) {
    chrome.runtime.onMessage.addListener((data) => console.log('update color'));

    chrome.storage.sync.set({ color });
  }

  public colorize() {
    chrome.runtime.onMessage.addListener((data) => console.log('colorize'));
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: updateBackgroundColor,
        args: [this.color],
      });
    });
  }
}
