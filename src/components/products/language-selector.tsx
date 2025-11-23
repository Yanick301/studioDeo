'use client';

import { useState, useTransition, useEffect } from 'react';
import { translateProductDescription } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface LanguageSelectorProps {
  originalText: string;
  isVisible: boolean;
}

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
];

export default function LanguageSelector({ originalText, isVisible }: LanguageSelectorProps) {
  const [translatedText, setTranslatedText] = useState(originalText);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTranslatedText(originalText);
  }, [originalText]);

  const handleLanguageChange = (language: string) => {
    if (language === 'en') {
      setTranslatedText(originalText);
      return;
    }
    startTransition(async () => {
      const result = await translateProductDescription({ text: originalText, language });
      if (result.success) {
        setTranslatedText(result.translatedText!);
      } else {
        // Handle error case, maybe show a toast
        console.error(result.error);
      }
    });
  };

  return (
    <div>
        <div className={`transition-all duration-300 ${isVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="mb-2">
                <Select onValueChange={handleLanguageChange} defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
      </div>
      {isPending ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : (
        <p className="text-muted-foreground">{translatedText}</p>
      )}
    </div>
  );
}
