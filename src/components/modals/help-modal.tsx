'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, CheckCircle2, X } from 'lucide-react';

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>MCP Server Help</DialogTitle>
              <DialogDescription>
                Requirements for connecting your MCP server to Puch AI.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-6 text-sm">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" />
                    <span>Protocol Compatibility</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Puch follows the core{' '}
                    <a
                      href="#"
                      className="text-primary underline hover:text-primary/80"
                    >
                      MCP specification
                    </a>{' '}
                    with the following supported features:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="flex items-center font-semibold text-green-500 mb-2">
                        <Check className="mr-2 h-5 w-5" />
                        Supported
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Core protocol messages</li>
                        <li>Tool definitions and calls</li>
                        <li>Authentication (Bearer & OAuth)</li>
                        <li>Error handling</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center font-semibold text-destructive mb-2">
                        <X className="mr-2 h-5 w-5" />
                        Not Supported
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Videos extension</li>
                        <li>Resources extension</li>
                        <li>Prompts extension</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="font-semibold text-foreground">
                  MCP Server Requirements
                </h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">
                      HTTPS Endpoints:
                    </span>{' '}
                    All server endpoints must be served over HTTPS for security.
                    HTTP connections will be rejected.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      Production Environment:
                    </span>{' '}
                    Before sharing your server, deploy it on a hosting platform
                    like Vercel, Cloudflare, or any other public service to
                    ensure it is accessible.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      `validate` Tool:
                    </span>{' '}
                    Your MCP server must implement a `validate` tool. This tool is
                    used for authentication when connecting with a Bearer Token. It
                    must accept the token and return the server owner's phone
                    number in the format `(country_code)(number)`, e.g.,
                    `919876543210`.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Available Commands</h3>
                <p className="mt-2 text-muted-foreground">
                  Use the chat input to run commands. All commands start with{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">/mcp</code>.
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">/mcp connect [url] [token]</code>: Connect with a Bearer Token.
                  </li>
                  <li>
                     <code className="bg-muted px-1 py-0.5 rounded">/mcp connect oauth [url]</code>: Connect with OAuth.
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">/mcp list</code>: List all connected servers.
                  </li>
                   <li>
                    <code className="bg-muted px-1 py-0.5 rounded">/mcp disconnect</code>: Disconnect from all servers.
                  </li>
                  <li>
                    <code className="bg-muted px-1 py-0.5 rounded">/mcp set-diagnostic-level [level]</code>: Set diagnostic level (error, warn, info, debug).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
