import React from 'react';
import { Input } from '../ui/input';
import { Empty } from './Empty';
import { Message } from './Message';

const MESSAGE_DUMMY = [
  { id: '1', content: 'Dummy Data1', role: 'user' },
  { id: '2', content: 'Dummy Data2', role: 'assistant' },
];
export function Chat() {
  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* chat area */}
      <div className="flex-1 ">
        {MESSAGE_DUMMY.length === 0 ? (
          <Empty />
        ) : (
          <>
            {MESSAGE_DUMMY.map((message) => (
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
      <div></div>
    </div>
  );
}
