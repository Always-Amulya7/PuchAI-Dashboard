'use client';

import React, { useState } from 'react';
import { Bot, Code, HelpCircle, Settings, Sparkles, User, MessageSquare } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatPanel } from '@/components/chat-panel';
import { SettingsModal } from '@/components/modals/settings-modal';
import { ActionsModal } from '@/components/modals/actions-modal';
import { HelpModal } from '@/components/modals/help-modal';
import { Button } from './ui/button';

export function PuchDashboard() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isActionsOpen, setActionsOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [actionsDefaultTab, setActionsDefaultTab] = useState('insights');

  const openActionsModal = (tab: 'insights' | 'codegen') => {
    setActionsDefaultTab(tab);
    setActionsOpen(true);
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="p-2">
          <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="bg-primary/10 text-primary hover:bg-primary/20">
                <Bot />
              </Button>
              <h1 className="text-lg font-semibold tracking-tight">Puch Dashboard</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => openActionsModal('insights')} tooltip="Get AI-Powered Insights">
                <Sparkles />
                <span>AI Insights</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => openActionsModal('codegen')} tooltip="Generate Code from Diffs">
                <Code />
                <span>Code Generation</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSettingsOpen(true)} tooltip="Connections & Diagnostics">
                      <Settings />
                      <span>Settings</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setHelpOpen(true)} tooltip="MCP Server Requirements">
                      <HelpCircle />
                      <span>Help</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between p-2.5 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <SidebarTrigger />
          <Avatar>
            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" alt="User Avatar" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 flex flex-col">
          <ChatPanel />
        </main>
      </SidebarInset>
      
      <SettingsModal open={isSettingsOpen} onOpenChange={setSettingsOpen} />
      <ActionsModal open={isActionsOpen} onOpenChange={setActionsOpen} defaultTab={actionsDefaultTab} />
      <HelpModal open={isHelpOpen} onOpenChange={setHelpOpen} />
    </SidebarProvider>
  );
}
