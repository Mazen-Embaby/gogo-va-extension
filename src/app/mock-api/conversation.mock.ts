import { Conversation } from '../types/conversation.interface';

export const conversationMockData: Conversation = {
  id: '01JDYNP2C1MBQHK7X33KNF61NF',
  name: 'who are you!',
  date: Date.now(),
  isFav: false,
  messages: [
    {
      content: 'Who are you!',
      role: 'user',
    },
    {
      content: 'I am the helpful assistance. ',
      role: 'system',
    },
  ],
};
