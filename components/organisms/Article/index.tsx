import { useSetAtom } from 'jotai';
import { MDXRemote } from 'next-mdx-remote';
import { MutableRefObject, useEffect, useRef } from 'react';

import { Def } from '@/mdx/Def';
import { Note } from '@/mdx/Note';
import type { ArticlePageProps } from '@/pages/article/[slug]';
import { ArticleCoreRefAtom } from '@/store/aside-note';
import s from '@/styles/article.module.css';

type Ref = MutableRefObject<HTMLDivElement | null>;

function useSetRef({ ref, setter }: { ref: Ref; setter: (r: Ref) => void }) {
  useEffect(() => {
    if (!ref.current) return;

    setter(ref);
  }, [ref, setter]);
}

export function ArticleBody({ article }: Omit<ArticlePageProps, 'translations'>) {
  const articleRef = useRef(null);
  const setArticleRef = useSetAtom(ArticleCoreRefAtom);

  useSetRef({ ref: articleRef, setter: setArticleRef });

  return (
    <article ref={articleRef} className={s.article}>
      <h1>{article.title}</h1>
      <MDXRemote {...article.content} components={{ Note, Def }} />
    </article>
  );
}
