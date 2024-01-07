import Link from 'next/link';
import { useRouter } from 'next/router';

import { FrontPageQuery } from '@/graphql/cms/types';
import { longDate } from '@/utils/date';

import { GlowingText } from '../../mdx/glowing-text';

type P = {
  article: FrontPageQuery['allArticles'][number];
};

export function ArticleDescription({ article }: P) {
  const { locale = 'fr' } = useRouter();
  return (
    <article className="flex flex-col gap-1 " key={article.slug}>
      <Link href={`/article/${article.slug}`}>
        <h1 className="text-lg lg:text-2xl font-bold">
          <GlowingText startColor="black" targetColor="var(--ink-blue)">
            {article.title}
          </GlowingText>
        </h1>
      </Link>
      <p>{article.description}</p>
      <span className="flex gap-8 items-center">
        <p className="font-bold text-sm text-inkblue">{longDate(article._updatedAt ?? article._createdAt, locale)} </p>
        <span>&rarr;</span>
      </span>
    </article>
  );
}
