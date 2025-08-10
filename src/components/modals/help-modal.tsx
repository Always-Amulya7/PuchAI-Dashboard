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

              <Card>
                <CardHeader>
                    <CardTitle>Quick Setup Guide</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold'>1</div>
                        <div>
                            <h4 className='font-semibold'>Prepare Your MCP Server</h4>
                            <p className='text-muted-foreground'>Ensure your MCP server is publicly accessible and serving over HTTPS.</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold'>2</div>
                        <div>
                            <h4 className='font-semibold'>Connect from Puch Chat</h4>
                            <p className='text-muted-foreground'>Use the <code className='bg-muted px-1 py-0.5 rounded'>/mcp connect</code> command in any Puch conversation.</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold'>3</div>
                        <div>
                            <h4 className='font-semibold'>Verify Connection</h4>
                            <p className='text-muted-foreground'>Puch will confirm successful connection and show available tools, or display error messages for troubleshooting.</p>
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
                      Defines any number of tools.
                    </span>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      Validate Tool:
                    </span>{' '}
                    Has a tool named validate that returns your own number in {'{country_code}{number}'} format. Example: 919876543210 for +91-9876543210.
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
                  <code className="bg-muted px-1 py-0.5 rounded">/mcp</code>. You can have up to 5 configurations.
                </p>
                <div className="space-y-4 mt-2 text-muted-foreground">
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp connect &lt;url&gt; &lt;bearer_token&gt;</code></p>
                        <p className="pl-2 mt-1">Connect to your MCP server.</p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp connect &lt;url&gt;</code></p>
                        <p className="pl-2 mt-1">To connect to remote MCP Server via OAuth.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp use &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Add a shared MCP server by ID.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp list</code></p>
                        <p className="pl-2 mt-1">List all your MCP server configurations.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp enable &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Enable a specific MCP server.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp disable &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Disable a specific MCP server.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp remove &lt;server_id&gt;</code></p>
                        <p className="pl-2 mt-1">Delete a server configuration.</p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp activate</code></p>
                        <p className="pl-2 mt-1">Activate all MCP servers.</p>
                    </div>
                     <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp deactivate</code></p>
                        <p className="pl-2 mt-1">Deactivate all MCP servers.</p>
                    </div>
                    <div>
                        <p><code className="bg-muted px-1 py-0.5 rounded font-semibold text-foreground">/mcp diagnostics-level (error|warn|info|debug)</code></p>
                        <p className="pl-2 mt-1">Set the diagnostic level for MCP.</p>
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
