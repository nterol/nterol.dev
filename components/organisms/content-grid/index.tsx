import { AnchorTitle } from '@/components/molecules/anchor-title';
import { ArticleDescription } from '@/components/molecules/article-description';
import { type FrontPageQuery } from '@/graphql/cms/types';
import { MDXContent } from '@/utils/type';

import { Quizz } from '../quizz';

type ContentGridProps = {
  articles: FrontPageQuery['allArticles'];
  quizzes: MDXContent[];
  breves: MDXContent[];
  locale: string;
};

export function ContentGrid({ articles, quizzes }: ContentGridProps) {
  return (
    <section className="flex flex-col gap-4">
      <AnchorTitle title="articles" />
      {articles ? <ArticleDescription key={articles[0].slug} article={articles[0]} /> : null}
      <Quizz quizz={quizzes[0]} />
    </section>
  );
}
