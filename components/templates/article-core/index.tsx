import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { ArticleBody } from '@/components/organisms/Article';
import { ArticleWithMDX } from '@/components/organisms/Article/types';
import { AsideContainer, BottomContainer } from '@/components/organisms/aside';
import useScreen from '@/hooks/useScreen';
import { IsSideNote } from '@/store/aside-note';

function useShowSideBar() {
  const isSideNote = useScreen([{ name: 'side-note', minWidth: 1250 }]);
  const setIsSideNote = useSetAtom(IsSideNote);

  useEffect(() => {
    setIsSideNote(!!isSideNote);
  }, [isSideNote, setIsSideNote]);
}

type ArticleCoreProps = {
  article: ArticleWithMDX;
};
export function ArticleCore({ article }: ArticleCoreProps) {
  useShowSideBar();
  return (
    <>
      <main className="p-2 flex flex-col gap-8 relative md:items-center">
        <ArticleBody article={article} />
        <AsideContainer />
        <BottomContainer />
      </main>
    </>
  );
}
