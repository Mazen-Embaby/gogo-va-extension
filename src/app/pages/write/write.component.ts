import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './write.component.html',
  styleUrl: './write.component.scss'
})
export class WriteComponent {
  messages: ChatMessage[] = [];
  userInput = '';

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message
    this.messages.push({ sender: 'user', text: this.userInput });

    // Simulate AI response
    setTimeout(() => {
      this.messages.push({ sender: 'ai', text: 'This is a response from AI.' });
    }, 1000);

    this.userInput = '';
  }
}