'use client';

import { useEffect, useRef } from 'react';
import { useChat, Message as TMessage } from 'ai/react';
import { Empty } from './Empty';
import { Message } from './Message';
import { AutoResizingTextarea } from './AutoResizingTextarea';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';
import { useModelStore } from '@/store/model';
import { useParams, useRouter } from 'next/navigation';
import { addMessages, createConversation } from '@/actions/conversation';
import { CHAT_ROUTES } from '@/constants/routes';

type Props = {
  initialMessages?: TMessage[];
};

export function Chat({ initialMessages }: Props) {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      onFinish: async (message) => {
        //param -> conversationId does not exist create new conversation
        if (!params.conversationId) {
          // 1. create new conversation
          const conversation = await createConversation(input);
          // 2. add message to conversation
          await addMessages(conversation.id, input, message.content);

          router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
        } else {
          //param -> conversationId exists add message to conversation
          await addMessages(params.conversationId, input, message.content);
        }
      },
    });
  const model = useModelStore((state) => state.model);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* chat area */}
      <div className="flex-1 ">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={'user'}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>

      {/* input area */}
      <div className="pb-5 sticky bottom-0 bg-white">
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e, { data: { model } })}
        >
          <AutoResizingTextarea value={input} onChange={handleInputChange} />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
