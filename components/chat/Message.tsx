import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  name?: string;
  content?: string;
  role: string;
};

export function Message({ name = 'User', content = '', role }: Props) {
  const isAssistant = role === 'assistant';
  const avatarName = isAssistant ? 'Chat GPT' : name;

  return (
    <div className="flex items-start gap-2 mb-5 ">
      {/* avatar */}
      <Avatar>
        <AvatarImage src={isAssistant ? '/logo.png' : ''} alt="avatar" />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar>
      {/* avatar name + content */}
      <div className="mt-2">
        <h2 className="font-bold">{avatarName}</h2>
        <div className="mt-2 whitespace-break-spaces">{content}</div>
      </div>
    </div>
  );
}
