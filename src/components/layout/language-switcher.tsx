'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n, type Locale } from '@/i18n-config'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const router = useRouter()

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const currentLocale = pathName.split('/')[1] as Locale;

  const handleLanguageChange = (locale: Locale) => {
    router.push(redirectedPathName(locale));
  };

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={currentLocale}>
        <SelectTrigger className="w-auto border-0 bg-transparent">
            <SelectValue asChild>
                <Globe />
            </SelectValue>
        </SelectTrigger>
        <SelectContent>
        {i18n.locales.map((locale) => {
            return (
                <SelectItem key={locale} value={locale}>
                    {locale.toUpperCase()}
                </SelectItem>
            )
        })}
        </SelectContent>
    </Select>
  )
}
