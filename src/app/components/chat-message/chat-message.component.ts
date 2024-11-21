import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [NgClass, ChatBubbleComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {

  @Input() message!: { text: string };
  @Input() isUser!: boolean;

  handleClick(){}
}