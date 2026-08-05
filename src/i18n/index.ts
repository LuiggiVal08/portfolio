import es from './es.json';
import en from './en.json';

export const dictionaries = { es, en } as const;

export type Locale = keyof typeof dictionaries;

export type UI = (typeof dictionaries)[Locale];

export function getUI(locale: Locale): UI {
  return dictionaries[locale];
}
