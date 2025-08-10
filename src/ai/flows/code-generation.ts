
// This file uses server-side code.
'use server';

/**
 * @fileOverview Generates code snippets, such as test suites, based on PR diffs.
 *
 * - generateCodeSnippet - A function that generates code snippets based on PR diffs.
 * - GenerateCodeSnippetInput - The input type for the generateCodeSnippet function.
 * - GenerateCodeSnippetOutput - The return type for the generateCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeSnippetInputSchema = z.object({
  prDiff: z
    .string()
    .describe('The diff of the pull request to generate code snippets for.'),
  instructions: z.string().optional().describe('Specific instructions for the code generation task.'),
});
export type GenerateCodeSnippetInput = z.infer<typeof GenerateCodeSnippetInputSchema>;

const GenerateCodeSnippetOutputSchema = z.object({
  codeSnippet: z.string().describe('The generated code snippet.'),
  explanation: z.string().optional().describe('Explanation of the generated code snippet.'),
});
export type GenerateCodeSnippetOutput = z.infer<typeof GenerateCodeSnippetOutputSchema>;

export async function generateCodeSnippet(input: GenerateCodeSnippetInput): Promise<GenerateCodeSnippetOutput> {
  return generateCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSnippetPrompt',
  input: {schema: GenerateCodeSnippetInputSchema},
  output: {schema: GenerateCodeSnippetOutputSchema},
  prompt: `You are an AI code generation expert. Based on the provided PR diff and instructions, you will generate a code snippet.

PR Diff:
\`\`\`
{{prDiff}}
\`\`\`

Instructions:
{{instructions}}

Generate the code snippet and provide a brief explanation.
`,
});

const generateCodeSnippetFlow = ai.defineFlow(
  {
    name: 'generateCodeSnippetFlow',
    inputSchema: GenerateCodeSnippetInputSchema,
    outputSchema: GenerateCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
