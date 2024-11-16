import { Textarea } from '@/components/ui/textarea';
import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

export function AutoResizingTextarea({
  value,
  ...others
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  return (
    <Textarea
      value={value}
      ref={textareaRef}
      {...others}
      className="min-h-[20px] max-h-[200px]"
    />
  );
}
