import { AnchorTitle } from '@/components/molecules/anchor-title';
import { type FrontPageQuery } from '@/graphql/cms/types';
import { MDXContent } from '@/utils/type';

import { Quizz } from '../quizz';

type ContentGridProps = {
  articles: FrontPageQuery['allArticles'];
  quizzes: MDXContent[];
  breves: MDXContent[];
  locale: string;
};

export function ContentGrid({ quizzes }: ContentGridProps) {
  return (
    <section className="flex flex-col gap-4">
      <AnchorTitle title="articles" />
      {/* {articles ? <ArticleDescription key={articles[0].slug} article={articles[0]} locale={locale} />) : null} */}
      <Quizz quizz={quizzes[0]} />
    </section>
  );
}
