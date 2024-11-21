import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { TranslateComponent } from './pages/translate/translate.component';
import { WriteComponent } from './pages/write/write.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { DeepChatComponent } from './components/deep-chat/deep-chat.component';

export const routes: Routes = [

  { path: '', redirectTo: '/chat', pathMatch: 'full' },


  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'write',
    component: WriteComponent,
  },
  {
    path: 'translate',
    component: TranslateComponent,
  },

  {
    path: 'b',
    component: ChatMessageComponent,
  },
  {
    path: 'deep',
    component: DeepChatComponent,
  },
];
