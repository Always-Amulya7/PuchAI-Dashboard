'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Server } from 'lucide-react';
import { JiraIcon, DatadogIcon } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { toast } = useToast();
  const [diagnosticLevel, setDiagnosticLevel] = useState('info');

  const handleConnect = (service: string) => {
    toast({
      title: `Connecting to ${service}`,
      description: `This is a placeholder action. A real connection flow would start here.`,
    });
  };

  const handleDiagnosticChange = (value: string) => {
    setDiagnosticLevel(value);
    toast({
      title: 'Diagnostic Level Set',
      description: `Diagnostic level has been set to "${value}".`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your connections and diagnostic preferences.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="connections">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          </TabsList>
          <TabsContent value="connections" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Connect with OAuth</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect to services using OAuth for secure, seamless
                  authentication.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleConnect('GitHub')}>
                    <Github className="mr-2 h-4 w-4" /> Connect GitHub
                  </Button>
                  <Button variant="outline" onClick={() => handleConnect('Jira')}>
                    <JiraIcon className="mr-2 h-4 w-4" /> Connect Jira
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Connect with Bearer Token
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For services like Datadog or custom MCP servers.
                </p>
                <div className="space-y-4">
                    <div className="flex items-end gap-2">
                      <div className="grid flex-1 gap-1.5">
                        <Label htmlFor="datadog-token">Datadog Token</Label>
                        <Input id="datadog-token" type="password" placeholder="Enter your Datadog API token" />
                      </div>
                      <Button onClick={() => handleConnect('Datadog')}>
                        <DatadogIcon className="mr-2 h-4 w-4" /> Connect
                      </Button>
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="grid flex-1 gap-1.5">
                            <Label htmlFor="mcp-url">MCP Server URL</Label>
                            <Input id="mcp-url" type="url" placeholder="https://your-mcp-server.com" />
                        </div>
                        <div className="grid flex-1 gap-1.5">
                            <Label htmlFor="mcp-token">Bearer Token</Label>
                            <Input id="mcp-token" type="password" placeholder="Enter your server token" />
                        </div>
                        <Button onClick={() => handleConnect('MCP Server')}>
                            <Server className="mr-2 h-4 w-4" /> Connect
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="diagnostics" className="pt-4">
            <div className="space-y-2">
              <Label htmlFor="diagnostic-level">Diagnostic Level</Label>
              <Select value={diagnosticLevel} onValueChange={handleDiagnosticChange}>
                <SelectTrigger id="diagnostic-level" className="w-[180px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warn</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Control the amount of diagnostic information you receive from
                MCP operations.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
