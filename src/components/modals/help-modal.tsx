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
                      Validate Tool:
                    </span>{' '}
                    Your MCP server must have a validate tool that returns the server owner's phone number in the format: {'{country_code}{number}'} Example: 919876543210 for +91-9876543210
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      HTTPS Requirement:
                    </span>{' '}
                    All endpoints must be served over HTTPS for security. HTTP connections will be rejected.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      Prepare for production:
                    </span>{' '}
                    Before sharing your server, deploy it on a hosting platform such as Vercel, Cloudflare, or any other service. Ensure that the server is publicly accessible so others can connect to it.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Available Commands</h3>
                <p className="mt-2 text-muted-foreground">
                  Use the chat input to run commands. All commands start with{' '}
                  <code className="bg-muted px-1 py-0.5 rounded">/mcp</code>.
                </p>
                <div className="space-y-4 mt-2 text-muted-foreground">
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp connect &lt;url&gt; &lt;bearer_token&gt;</code></p>
                        <p className="pl-2 mt-1">Connect your MCP server with Puch AI. Your MCP server must have a validate tool that accepts the bearer token and returns the user's phone number in the format {'{country_code}{number}'} (e.g., 919876543210 for +91-9876543210). This validation is required for authentication. The validate tool must return the user's phone number when given the bearer token for authentication to succeed.</p>
                        <p className="pl-2 mt-1">Example: <code className="bg-muted px-1 py-0.5 rounded">/mcp connect https://mcp.example.com/mcp abc123token</code></p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp connect &lt;url&gt;</code></p>
                        <p className="pl-2 mt-1">For servers supporting OAuth authentication. A browser window may open for consent and authentication.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp use &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Connect to a hosted MCP server using its unique identifier. You can connect upto 5 MCP servers at a time.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp remove &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Remove a hosted MCP server from your list of connected servers.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp list</code></p>
                        <p className="pl-2 mt-1">List all your MCP server configurations.</p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp deactivate</code></p>
                        <p className="pl-2 mt-1">Safely disconnect from all currently active MCP servers. This will remove access to all server-provided tools.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp diagnostics-level (error|warn|info|debug)</code></p>
                        <p className="pl-2 mt-1">Control the amount of diagnostic information you receive from MCP operations. Available levels: error, warn, info, debug.</p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp disable &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Disable a specific MCP server. You will still be connected to the server but you won't be able to use its tools. This is mostly for debugging. You can re-enable the server later using the /mcp enable command.</p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp enable &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Enable a specific MCP server. By default, the server you connected to will be enabled.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
