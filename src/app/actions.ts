'use server';

import { translateProductDescription as translate } from '@/ai/flows/translate-product-descriptions';
import type { TranslateProductDescriptionInput } from '@/ai/flows/translate-product-descriptions';

export async function translateProductDescription(input: TranslateProductDescriptionInput) {
  try {
    const result = await translate(input);
    return { success: true, translatedText: result.translatedText };
  } catch (error) {
    console.error('Translation failed:', error);
    return { success: false, error: 'Failed to translate description.' };
  }
}
