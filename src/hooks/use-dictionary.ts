'use client';

import { useContext } from 'react';
import { DictionaryContext, DictionaryContextType } from '@/context/dicionary-provider';


export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context.dictionary;
}
