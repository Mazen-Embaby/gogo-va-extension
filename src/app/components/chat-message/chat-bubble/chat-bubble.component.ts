import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.scss',
})
export class ChatBubbleComponent {
  // ChatBubble inputs
  @Input() variant: 'received' | 'sent' = 'received';
  @Input() layout: 'default' | 'ai' = 'default';

  // Avatar inputs
  @Input() avatarSrc?: string;
  @Input() avatarFallback?: string;

  // Message inputs
  @Input() isLoading = false;
  @Input() messageContent?: string;

  // Timestamp input
  @Input() timestamp?: string;

  // Action inputs
  @Input() actionIcon?: string; // Replace with actual icon type or component
  @Input() onActionClick?: () => void;

  // Compute dynamic classes for ChatBubble
  getBubbleClasses(): string {
    const baseClasses = 'flex gap-2 max-w-[60%] items-end relative group';
    const variantClasses =
      this.variant === 'received' ? 'self-start' : 'self-end flex-row-reverse';
    const layoutClasses =
      this.layout === 'ai' ? 'max-w-full w-full items-center' : '';
    return `${baseClasses} ${variantClasses} ${layoutClasses}`;
  }

  // Compute dynamic classes for ChatBubbleMessage
  getMessageClasses(): string {
    const baseClasses = 'p-4';
    const variantClasses =
      this.variant === 'received'
        ? 'bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg'
        : 'bg-primary text-primary-foreground rounded-l-lg rounded-tr-lg';
    const layoutClasses =
      this.layout === 'ai' ? 'border-t w-full rounded-none bg-transparent' : '';
    return `${baseClasses} ${variantClasses} ${layoutClasses}`;
  }
}
