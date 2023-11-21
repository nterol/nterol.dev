import Link from 'next/link';

import { TranslationURL } from '@/utils/types';

type TranslationsBarProps = {
  translations: TranslationURL[] | undefined;
};

export function TranslationsBar({ translations }: TranslationsBarProps) {
  return (
    <section className="flex justify-end items-center gap-2 py-1 w-full max-w-[841.2px]">
      <span>🌐</span>
      {translations
        ? translations.map((t) => (
            <Link className="text-xs font-bold" key={t.locale} locale={t.locale as string} href={`/article/${t.value}`}>
              {t.locale?.toUpperCase()}
            </Link>
          ))
        : null}
    </section>
  );
}
