'use client';

import React, { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleNaturalLanguageQuery } from '@/app/actions';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat-message';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: React.ReactNode;
};

const initialState = {
  response: null,
  error: null,
};

const commands = [
    { command: '/mcp connect <url> <bearer_token>', description: 'Connect to your MCP server.' },
    { command: '/mcp connect <url>', description: 'Connect to remote MCP Server via OAuth.' },
    { command: '/mcp use <server_id>', description: 'Add a shared MCP server by ID.' },
    { command: '/mcp list', description: 'List all your MCP server configurations.' },
    { command: '/mcp enable <server_id>', description: 'Enable a specific MCP server.' },
    { command: '/mcp disable <server_id>', description: 'Disable a specific MCP server.' },
    { command: '/mcp remove <server_id>', description: 'Delete a server configuration.' },
    { command: '/mcp activate', description: 'Activate all MCP servers.' },
    { command: '/mcp deactivate', description: 'Deactivate all MCP servers.' },
    { command: '/mcp diagnostics-level (error|warn|info|debug)', description: 'Set the diagnostic level for MCP.' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      <SendHorizonal />
    </Button>
  );
}

export function ChatPanel() {
  const [state, formAction] = useActionState(handleNaturalLanguageQuery, initialState);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Welcome to the Puch Dashboard! How can I assist you today?',
    },
    {
      id: 'welcome-2',
      sender: 'ai',
      text: 'You can ask me questions in natural language, use commands starting with `/`, or explore AI Insights and Code Generation from the sidebar.',
    },
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
      setMessages((prev) => prev.slice(0, -1));
    }
    if (state.response) {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.sender === 'ai') {
          lastMessage.text = state.response;
        }
        return newMessages;
      });
    }
  }, [state, toast]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: query },
      { id: `ai-loading-${Date.now()}`, sender: 'ai', text: <Skeleton className="h-4 w-32" /> },
    ]);
    
    formAction(formData);
    formRef.current?.reset();
    setInputValue('');
    setPopoverOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setPopoverOpen(value.startsWith('/'));
  };

  const handleCommandSelect = (command: string) => {
    const commandName = command.split(' ')[0] + ' ' + command.split(' ')[1];
    setInputValue(`${commandName} `);
    setPopoverOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
      <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} sender={message.sender} text={message.text} />
          ))}
        </div>
      </ScrollArea>
      <div className="px-4">
        <form
          ref={formRef}
          action={handleFormSubmit}
          className="flex items-center gap-2"
        >
          <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverAnchor asChild>
                <Input
                    ref={inputRef}
                    name="query"
                    placeholder="Type a message or a command like /mcp list..."
                    autoComplete="off"
                    disabled={pending}
                    className="w-full flex-1"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </PopoverAnchor>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Card>
                <CardHeader>
                    <CardTitle>Commands</CardTitle>
                    <CardDescription>Select a command to start.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        {commands.map((cmd) => (
                            <div key={cmd.command} onClick={() => handleCommandSelect(cmd.command)} className="p-2 hover:bg-muted rounded-md cursor-pointer">
                                <p className="font-semibold">{cmd.command}</p>
                                <p className="text-sm text-muted-foreground">{cmd.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
