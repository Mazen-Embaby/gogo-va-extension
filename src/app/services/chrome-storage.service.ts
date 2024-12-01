import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChromeStorageService {
  private storageSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    // Listen for changes in chrome.storage.session
    // chrome.storage.onChanged.addListener((changes, areaName) => {
    //   if (areaName === 'session') {
    //     // If the session storage changes, update the BehaviorSubject
    //     this.storageSubject.next(changes);
    //   }
    // });
  }

  // Get the observable to subscribe to
  getStorageChanges() {
    return this.storageSubject.asObservable();
  }

  // Optionally: Method to get a value from chrome.storage
  getItem(key: string): Promise<any> {
    return new Promise((resolve) => {
      chrome.storage.session.get([key], (result) => {
        resolve(result[key]);
      });
    });
  }

  // Optionally: Method to set a value in chrome.storage
  setItem(key: string, value: any): void {
    chrome.storage.session.set({ [key]: value });
  }
}
