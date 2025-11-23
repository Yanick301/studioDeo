export const i18n = {
    defaultLocale: 'de',
    locales: ['de', 'en', 'fr', 'es', 'nl'],
  } as const
  
  export type Locale = (typeof i18n)['locales'][number]
  