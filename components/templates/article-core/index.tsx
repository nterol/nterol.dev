import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { AsideContainer, BottomContainer } from '@/components/molecules/aside';
import { TranslationsBar } from '@/components/molecules/translations-bar';
import { ArticleBody } from '@/components/organisms/Article';
import useScreen from '@/hooks/useScreen';
import { ArticlePageProps } from '@/pages/article/[slug]';
import { IsSideNote } from '@/store/aside-note';

function useShowSideBar() {
  const isSideNote = useScreen([{ name: 'side-note', minWidth: 1250 }]);
  const setIsSideNote = useSetAtom(IsSideNote);

  useEffect(() => {
    setIsSideNote(!!isSideNote);
  }, [isSideNote, setIsSideNote]);
}

export function ArticleCore(props: ArticlePageProps) {
  useShowSideBar();
  return (
    <>
      <main className="p-2 flex flex-col gap-8 relative md:items-center min-h-full">
        <TranslationsBar translations={props.translations} />
        <ArticleBody {...props} />
        <AsideContainer />
        <BottomContainer />
      </main>
    </>
  );
}
