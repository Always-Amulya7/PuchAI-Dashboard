import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

interface ChatMessageProps {
  sender: 'user' | 'ai';
  text: React.ReactNode;
}

export function ChatMessage({ sender, text }: ChatMessageProps) {
  const isUser = sender === 'user';
  return (
    <div className={cn('flex items-start gap-4', isUser ? 'justify-end' : '')}>
      {!isUser && (
        <Avatar className="w-8 h-8 border">
          <AvatarFallback className="bg-primary/10 text-primary">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn('max-w-2xl w-fit', isUser ? 'text-right' : 'text-left')}>
        <div
          className={cn(
            'rounded-lg px-4 py-3',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          )}
        >
          <div className="text-sm break-words">{text}</div>
        </div>
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" alt="User Avatar" />
          <AvatarFallback>
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
