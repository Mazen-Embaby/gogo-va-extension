import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { TranslateComponent } from './pages/translate/translate.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { DeepChatComponent } from './components/deep-chat/deep-chat.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatDetailComponent } from './pages/chat/chat-detail/chat-detail.component';
import { ChatResolver } from './pages/chat/chat.resolver';
import { WritingComponent } from './pages/writing/writing.component';
import { WritingHistoryComponent } from './pages/writing/writing-history/writing-history.component';
import { WritingGeneratorComponent } from './pages/writing/writing-generator/writing-generator.component';
import { WritingResolver } from './pages/writing/writing.resolver';
import { WritingDetailsComponent } from './pages/writing/writing-details/writing-details.component';
import { TranslationResolver } from './pages/translation/translation.resolver';
import { TranslationComponent } from './pages/translation/translation.component';
import { TranslationDetailsComponent } from './pages/translation/translation-details/translation-details.component';
import { TranslationGeneratorComponent } from './pages/translation/translation-generator/translation-generator.component';
import { TranslationHistoryComponent } from './pages/translation/translation-history/translation-history.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { SummaryResolver } from './pages/summary/summary.resolver';
import { SummaryHistoryComponent } from './pages/summary/summary-history/summary-history.component';
import { SummaryDetailsComponent } from './pages/summary/summary-details/summary-details.component';
import { SummaryGeneratorComponent } from './pages/summary/summary-generator/summary-generator.component';
import { DeepChatConfigureComponent } from './components/deep-chat-configure/deep-chat-configure.component';
import { WritingAssistanceComponent } from './components/writing-assistance/writing-assistance.component';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },

  {
    path: 'chat',
    component: ChatComponent,
    resolve: {
      getConversations: ChatResolver,
    },
    children: [
      {
        path: 'history',
        component: ChatHistoryComponent,
      },
      {
        path: ':id',
        component: ChatDetailComponent,
      },
      {
        path: '',
        component: ChatDetailComponent,        
      },
    ],
  },
  {
    path: 'writing',
    component: WritingComponent,
    resolve: {
      getConversations: WritingResolver,
    },
    children: [
      {
        path: 'history',
        component: WritingHistoryComponent,
      },
      {
        path: 'details/:id',
        component: WritingDetailsComponent,
      },
      {
        path: 'details',
        component: WritingDetailsComponent,
      },
      {
        path: '',
        component: WritingGeneratorComponent,
      },

    ],
  },
  {
    path: 'summary',
    component: SummaryComponent,
    resolve: {
      // getConversations: SummaryResolver,
    },
    children: [
      {
        path: 'history',
        component: SummaryHistoryComponent,
      },
      {
        path: 'details/:id',
        component: SummaryDetailsComponent,
      },
      {
        path: 'details',
        component: SummaryDetailsComponent,
      },
      {
        path: '',
        component: SummaryGeneratorComponent,
      },

    ],
  },
  {
    path: 'translation',
    component: TranslationComponent,
    resolve: {
      // getConversations: TranslationResolver,
    },
    children: [
      {
        path: 'history',
        component: TranslationHistoryComponent,
      },
      {
        path: 'details/:id',
        component: TranslationDetailsComponent,
      },
      {
        path: 'details',
        component: TranslationDetailsComponent,
      },
      {
        path: '',
        component: TranslationGeneratorComponent,
      },

    ],
  },


  {
    path: 'lamp',
    component: WritingAssistanceComponent,
  },
  {
    path: 'b',
    component: ChatMessageComponent,
  },
  {
    path: 'deep',
    component: DeepChatConfigureComponent,
  },
];
