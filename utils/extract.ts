import type { GetArticlePathsQuery, SiteLocale } from '@/graphql/cms/types';

export function getArticlesPath(articles: GetArticlePathsQuery['allArticles']) {
  return articles
    .flatMap(({ _allSlugLocales }) => _allSlugLocales)
    .map((a) =>
      a
        ? {
            params: {
              slug: a?.value ?? '',
            },
            locale: a?.locale ?? 'fr',
          }
        : undefined,
    )
    .filter((e): e is { params: { slug: string }; locale: SiteLocale } => !!e);
}
