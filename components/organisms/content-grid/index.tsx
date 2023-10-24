import { AnchorTitle } from '@/components/molecules/anchor-title';
import { FrontPageQuery } from '@/graphql/cms/types';

import { ArticleDescription } from '../article-description';

type ContentGridProps = {
  articles: FrontPageQuery['allArticles'];
  locale: string;
};

export function ContentGrid({ articles, locale }: ContentGridProps) {
  return (
    <section className="flex flex-col gap-4">
      <AnchorTitle title="articles" />

      {articles?.map((article) => <ArticleDescription key={article.slug} article={article} locale={locale} />)}
    </section>
  );
}
