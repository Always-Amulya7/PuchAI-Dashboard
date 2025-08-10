'use server';

import { z } from 'zod';
import { naturalLanguageQuery } from '@/ai/flows/natural-language-query';
import { generateCodeSnippet } from '@/ai/flows/code-generation';
import { aiPoweredInsight } from '@/ai/flows/ai-powered-insight';

const querySchema = z.object({
  query: z.string().min(1, { message: 'Query cannot be empty.' }),
});

export async function handleNaturalLanguageQuery(prevState: any, formData: FormData) {
  const validatedFields = querySchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return { response: null, error: validatedFields.error.flatten().fieldErrors.query?.join(', ') };
  }
  
  const { query } = validatedFields.data;

  // Mock command handling
  if (query.startsWith('/mcp')) {
    return { response: `Command acknowledged: "${query}". This is a mocked response as command execution logic is not implemented.`, error: null };
  }

  try {
    const result = await naturalLanguageQuery({ query });
    return { response: result.response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error: 'An error occurred while processing your query.' };
  }
}

const codeGenSchema = z.object({
    prDiff: z.string().min(1, "PR Diff is required."),
    instructions: z.string().optional(),
});

export async function handleCodeGeneration(prevState: any, formData: FormData) {
    const validatedFields = codeGenSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { output: null, error: "Invalid input." };
    }

    try {
        const output = await generateCodeSnippet(validatedFields.data);
        return { output, error: null };
    } catch (error) {
        console.error(error);
        return { output: null, error: "Failed to generate code." };
    }
}

const insightSchema = z.object({
    data: z.string().min(1, "Data is required."),
});

export async function handleAiInsight(prevState: any, formData: FormData) {
    const validatedFields = insightSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { output: null, error: "Invalid input." };
    }
    
    try {
        const output = await aiPoweredInsight(validatedFields.data);
        return { output, error: null };
    } catch (error) {
        console.error(error);
        return { output: null, error: "Failed to generate insights." };
    }
}
