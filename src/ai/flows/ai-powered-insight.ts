'use server';

/**
 * @fileOverview This file defines a Genkit flow for processing data from external tools via an MCP server,
 * summarizing the data, and identifying actionable insights.
 *
 * - aiPoweredInsight - A function that handles the AI-powered insight generation process.
 * - AiPoweredInsightInput - The input type for the aiPoweredInsight function.
 * - AiPoweredInsightOutput - The return type for the aiPoweredInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredInsightInputSchema = z.object({
  data: z.string().describe('Data from external tools, such as Jira, GitHub, Datadog, and Slack.'),
});
export type AiPoweredInsightInput = z.infer<typeof AiPoweredInsightInputSchema>;

const AiPoweredInsightOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the data.'),
  actionableInsights: z.array(z.string()).describe('A list of actionable insights derived from the data.'),
});
export type AiPoweredInsightOutput = z.infer<typeof AiPoweredInsightOutputSchema>;

export async function aiPoweredInsight(input: AiPoweredInsightInput): Promise<AiPoweredInsightOutput> {
  return aiPoweredInsightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredInsightPrompt',
  input: {schema: AiPoweredInsightInputSchema},
  output: {schema: AiPoweredInsightOutputSchema},
  prompt: `You are an AI assistant that processes data from external tools to provide summaries and actionable insights.

  Analyze the following data:
  {{data}}

  Provide a concise summary of the data and identify actionable insights. Return the actionable insights in a numbered list.
  Summary:
  Actionable Insights:
  `,
});

const aiPoweredInsightFlow = ai.defineFlow(
  {
    name: 'aiPoweredInsightFlow',
    inputSchema: AiPoweredInsightInputSchema,
    outputSchema: AiPoweredInsightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
