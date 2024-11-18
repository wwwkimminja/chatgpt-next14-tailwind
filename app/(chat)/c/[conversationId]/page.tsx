import { Chat } from '@/components/chat/Chat';
import { getMessageByConversation } from '@/data/conversations';
import React from 'react';

type Props = {
  params: {
    conversationId: string;
  };
};
export default async function ConversationPage({
  params: { conversationId },
}: Props) {
  const messages = await getMessageByConversation(conversationId);

  return <Chat initialMessages={messages}/>;
}
