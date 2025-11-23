'use server';

/**
 * @fileOverview Translates product descriptions to a specified language.
 *
 * - translateProductDescription - A function that translates the given product description.
 * - TranslateProductDescriptionInput - The input type for the translateProductDescription function.
 * - TranslateProductDescriptionOutput - The return type for the translateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateProductDescriptionInputSchema = z.object({
  text: z.string().describe('The product description to translate.'),
  language: z.string().describe('The target language for the translation (e.g., es for Spanish, fr for French).'),
});
export type TranslateProductDescriptionInput = z.infer<typeof TranslateProductDescriptionInputSchema>;

const TranslateProductDescriptionOutputSchema = z.object({
  translatedText: z.string().describe('The translated product description.'),
});
export type TranslateProductDescriptionOutput = z.infer<typeof TranslateProductDescriptionOutputSchema>;

export async function translateProductDescription(input: TranslateProductDescriptionInput): Promise<TranslateProductDescriptionOutput> {
  return translateProductDescriptionFlow(input);
}

const translateProductDescriptionPrompt = ai.definePrompt({
  name: 'translateProductDescriptionPrompt',
  input: {schema: TranslateProductDescriptionInputSchema},
  output: {schema: TranslateProductDescriptionOutputSchema},
  prompt: `Translate the following product description to {{language}}:\n\n{{text}}`,
});

const translateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'translateProductDescriptionFlow',
    inputSchema: TranslateProductDescriptionInputSchema,
    outputSchema: TranslateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await translateProductDescriptionPrompt(input);
    return output!;
  }
);
