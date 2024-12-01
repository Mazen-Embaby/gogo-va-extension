import { Component } from '@angular/core';
import { TextCheckerComponent } from '../../components/text-checker/text-checker.component';
import { SuggestionCardComponent } from '../../components/text-checker/suggestion-card/suggestion-card.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { ulid } from 'ulidx';
import { Conversation } from '../../types/conversation.interface';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [ TextCheckerComponent , SuggestionCardComponent, LottieComponent],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss'
})
export class TranslateComponent {

  options: AnimationOptions = {
    path: 'assets/lottie/successfully-done.json',
  };

  constructor(private chatService:ChatService){}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    
  }

  async getStorage (){
    this.chatService.getConversations();
  }

  async createChat() {
    const xx: Conversation = {
      id: '22',
      name: '22',
      date: Date.now(),
      messages:[{content:'Hello', role:"assistant", avatar:""}],
      isFav: false,
    }
    this.chatService.createConversation(xx).subscribe();
  }

  async newChat() {
    const xx: Conversation = {
      id: ulid(),
      name: '23',
      date: Date.now(),
      messages:[{content:'Hello', role:"assistant", avatar:""}],
      isFav: false,
    }
    this.chatService.createConversation(xx).subscribe();
  }

  async update() {
    const xx: Conversation = {
      id: '22',
      name: '22',
      date: Date.now(),
      messages:[{content:'updated', role:"assistant", avatar:""}],
      isFav: false,
    }
    this.chatService.updateConversation(xx).subscribe();
  }

  async delete() {
    this.chatService.deleteConversation('22').subscribe();
  }
  
}
