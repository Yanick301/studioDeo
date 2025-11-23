'use client';

import { createContext, ReactNode } from 'react';
import { getDictionary } from '@/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export type DictionaryContextType = {
  dictionary: Dictionary | null;
};

export const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export function DictionaryProvider({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: Dictionary;
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
}
