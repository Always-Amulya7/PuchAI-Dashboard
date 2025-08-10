'use client';

import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleAiInsight, handleCodeGeneration } from '@/app/actions';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';

interface ActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab: 'insights' | 'codegen';
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : children}
    </Button>
  );
}

function InsightForm() {
  const [state, formAction] = useActionState(handleAiInsight, { output: null, error: null });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) toast({ variant: 'destructive', title: 'Error', description: state.error });
  }, [state, toast]);
  
  const handleSubmit = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <div className="space-y-4">
        <form ref={formRef} action={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="insight-data">Data from External Tools</Label>
                <Textarea
                id="insight-data"
                name="data"
                placeholder="Paste data from Jira, GitHub, Datadog, Slack, etc."
                rows={8}
                />
            </div>
            <SubmitButton>Generate Insights</SubmitButton>
        </form>
        {state.output && (
            <Card>
                <CardHeader>
                    <CardTitle>Generated Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Summary</h4>
                        <p className="text-sm text-muted-foreground">{state.output.summary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Actionable Insights</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {state.output.actionableInsights.map((insight, i) => <li key={i}>{insight}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}

function CodeGenForm() {
    const [state, formAction] = useActionState(handleCodeGeneration, { output: null, error: null });
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (state.error) toast({ variant: 'destructive', title: 'Error', description: state.error });
    }, [state, toast]);
    
    const handleSubmit = (formData: FormData) => {
        formAction(formData);
    };

    return (
        <div className="space-y-4">
            <form ref={formRef} action={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="pr-diff">PR Diff</Label>
                    <Textarea
                        id="pr-diff"
                        name="prDiff"
                        placeholder="Paste the PR diff here to generate code snippets."
                        rows={8}
                    />
                </div>
                <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Input id="instructions" name="instructions" placeholder="e.g., Generate a Jest test suite" />
                </div>
                <SubmitButton>Generate Code</SubmitButton>
            </form>
            {state.output && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Code</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {state.output.explanation && (
                            <div>
                                <h4 className="font-semibold">Explanation</h4>
                                <p className="text-sm text-muted-foreground">{state.output.explanation}</p>
                            </div>
                        )}
                        <div>
                            <h4 className="font-semibold">Code Snippet</h4>
                            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                <code>{state.output.codeSnippet}</code>
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export function ActionsModal({ open, onOpenChange, defaultTab }: ActionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <ScrollArea className="max-h-[80vh]">
            <div className="p-6">
                <DialogHeader>
                <DialogTitle>AI Actions</DialogTitle>
                <DialogDescription>
                    Perform advanced actions using Puch AI.
                </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue={defaultTab} className="pt-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="codegen">Code Generation</TabsTrigger>
                </TabsList>
                <TabsContent value="insights">
                    <InsightForm />
                </TabsContent>
                <TabsContent value="codegen">
                    <CodeGenForm />
                </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
