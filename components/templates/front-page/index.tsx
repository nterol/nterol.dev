import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { BlogPresentation } from '@/components/organisms/blog-description';
import { ContactSection } from '@/components/organisms/contact-section';
import { ContentGrid } from '@/components/organisms/content-grid';
import s from '@/components/templates/page-layout/page-layout.module.css';
import type { FrontPageQuery } from '@/graphql/cms/types';
import type { MDXContent } from '@/utils/type';

type FrontPageProps = {
  bio: MDXRemoteSerializeResult | null;
  locale: string;
  articles: FrontPageQuery['allArticles'];
  quizzes: MDXContent[];
  breves: MDXContent[];
};

export function FrontPageLayout({ bio, articles, breves, quizzes, locale }: FrontPageProps) {
  return (
    <main className={`${s.main} md:p-2 flex flex-col gap-8`}>
      {bio && <BlogPresentation bio={bio} />}
      <ContentGrid articles={articles} breves={breves} quizzes={quizzes} locale={locale} />
      <ContactSection />
    </main>
  );
}
