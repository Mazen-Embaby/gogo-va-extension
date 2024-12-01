import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionService {
  constructor(private router: Router) {
    this.listenForContextClick();
  }

  listenForContextClick() {

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const type: string = message.type as string;
      const data: string = message.data as string;

      console.debug(`Message Type:  ${type}`);
      console.debug(`Message data:  ${data}`);
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };

      if (type === 'va-elaborate') {
        this.router.navigate(['/chat'], { queryParams: { name: `ELABORATE - ${data.slice(0, 28)}`, prompt: this.elaborateAgent(data) } });
      }
      else if (type === 'va-rewrite') {
        this.router.navigate(['/chat'], { queryParams: { name: `RE_WRITE - ${data.slice(0, 28)}`, prompt: this.reWriteAgent(data) } });
      }
      else if (type === 'va-summarize') {
        this.router.navigate(['/summary'], { queryParams: { text: data } });
      }
      else if (message.type === 'va-translate') {
        this.router.navigate(['/translation'], { queryParams: { text: data } });
      }
    });
  }

  elaborateAgent(text: string): string {
    return `
    Elaborate more of the following:
    '${text}'
    `
  }

  summarizeAgent(text: string): string {
    return `
    Summarize the following:
    '${text}'
    `
  }

  reWriteAgent(text: string) {
    return `
    Re-phrase the following:
    '${text}'
    `
  }


  
}
