import { ElementRef, Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _targetElement$: Subject<ElementRef> = new ReplaySubject(1);

  get targetElement() {
    return this._targetElement$.asObservable();
  }

  setTargetElement(targetElement: ElementRef) {
    this._targetElement$.next(targetElement);
  }
}
