import { BlogPresentation } from '@/components/organisms/blog-description';
import { ContactSection } from '@/components/organisms/contact-section';
import { ContentGrid } from '@/components/organisms/content-grid';
import s from '@/components/templates/page-layout/page-layout.module.css';
import type { FrontPageQuery } from '@/graphql/cms/types';
import type { UncertainMDX } from '@/utils/type';

type FrontPageProps = {
  bio: UncertainMDX;
  articles: FrontPageQuery['allArticles'];
  locale: string;
};

export function FrontPageLayout({ bio, articles, locale }: FrontPageProps) {
  return (
    <main className={`${s.main} md:p-2 flex flex-col gap-8`}>
      <BlogPresentation bio={bio} />
      <ContentGrid articles={articles} locale={locale} />
      <ContactSection />
    </main>
  );
}
