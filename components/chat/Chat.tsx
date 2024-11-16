'use client';
import { useState } from 'react';
import { Empty } from './Empty';
import { Message } from './Message';
import { AutoResizingTextarea } from './AutoResizingTextarea';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const MESSAGE_DUMMY = [
  { id: '1', content: 'Dummy Data1', role: 'user' },
  { id: '2', content: 'Dummy Data2', role: 'assistant' },
];
export function Chat() {
  const [value, setValue] = useState('');

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
      <div className="pb-5">
        <form className="flex items-center justify-center gap-4">
          <AutoResizingTextarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
    </div>
  );
}
