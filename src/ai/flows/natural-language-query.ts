'use server';

/**
 * @fileOverview A natural language query AI agent.
 *
 * - naturalLanguageQuery - A function that handles the natural language query process.
 * - NaturalLanguageQueryInput - The input type for the naturalLanguageQuery function.
 * - NaturalLanguageQueryOutput - The return type for the naturalLanguageQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageQueryInputSchema = z.object({
  query: z.string().describe('The natural language query to execute.'),
});
export type NaturalLanguageQueryInput = z.infer<typeof NaturalLanguageQueryInputSchema>;

const NaturalLanguageQueryOutputSchema = z.object({
  response: z.string().describe('The response to the natural language query.'),
});
export type NaturalLanguageQueryOutput = z.infer<typeof NaturalLanguageQueryOutputSchema>;

export async function naturalLanguageQuery(input: NaturalLanguageQueryInput): Promise<NaturalLanguageQueryOutput> {
  return naturalLanguageQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageQueryPrompt',
  input: {schema: NaturalLanguageQueryInputSchema},
  output: {schema: NaturalLanguageQueryOutputSchema},
  prompt: `You are an AI assistant that can query data across connected tools like Jira, GitHub, Datadog, and Slack using natural language.

  User Query: {{{query}}}

  Response: `,
});

const naturalLanguageQueryFlow = ai.defineFlow(
  {
    name: 'naturalLanguageQueryFlow',
    inputSchema: NaturalLanguageQueryInputSchema,
    outputSchema: NaturalLanguageQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
