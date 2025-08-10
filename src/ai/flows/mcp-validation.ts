'use server';

/**
 * @fileOverview This file defines a Genkit flow for validating a bearer token for MCP server connection.
 *
 * - validateBearerToken - A function that handles the bearer token validation.
 * - ValidateBearerTokenInput - The input type for the validateBearerToken function.
 * - ValidateBearerTokenOutput - The return type for the validateBearerToken function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateBearerTokenInputSchema = z.object({
  bearerToken: z.string().describe('The bearer token to validate.'),
});
export type ValidateBearerTokenInput = z.infer<typeof ValidateBearerTokenInputSchema>;

const ValidateBearerTokenOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the bearer token is valid.'),
  phoneNumber: z.string().optional().describe('The phone number associated with the token, in the format {country_code}{number}.'),
});
export type ValidateBearerTokenOutput = z.infer<typeof ValidateBearerTokenOutputSchema>;

export async function validateBearerToken(input: ValidateBearerTokenInput): Promise<ValidateBearerTokenOutput> {
  return validateBearerTokenFlow(input);
}

// This is a mock validation. In a real application, you would
// look up the token in a database or call an external service.
const validateBearerTokenFlow = ai.defineFlow(
  {
    name: 'validateBearerTokenFlow',
    inputSchema: ValidateBearerTokenInputSchema,
    outputSchema: ValidateBearerTokenOutputSchema,
  },
  async ({bearerToken}) => {
    // For this example, we'll accept a specific token and return a mock phone number.
    // In a real application, you would have secure logic to validate the token.
    if (bearerToken === 'amul456andreasmessi') {
      return {
        isValid: true,
        phoneNumber: '919876543210', // Example phone number
      };
    }

    return {
      isValid: false,
    };
  }
);
