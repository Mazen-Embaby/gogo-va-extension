import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'deep-chat';

@Component({
  selector: 'app-deep-chat',
  standalone: true,
  imports: [],
  templateUrl: './deep-chat.component.html',
  styleUrl: './deep-chat.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exportAs: 'app-deep-chat'
})
export class DeepChatComponent {

  history = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
  ];
}
