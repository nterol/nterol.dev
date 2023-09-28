import { useSetAtom } from 'jotai';
import { MDXRemote } from 'next-mdx-remote';
import { MutableRefObject, useEffect, useRef } from 'react';

import { Aside } from '@/mdx/Aside';
import { CustomCompo } from '@/mdx/CustomCompo';
import { Def } from '@/mdx/Def';
import { ArticleCoreRefAtom } from '@/store/aside-note';

import { ArticleWithMDX } from './types';

type ArticleCoreProps = {
  article: ArticleWithMDX;
};

type Ref =  MutableRefObject<HTMLDivElement | null>;

function useSetRef({ref, setter}: {ref: Ref, setter: (r: Ref) => void}) {

  useEffect(() => {
    if (!ref.current) return;

    setter(ref);
  }, [ref, setter])

}

export function ArticleCore({ article }: ArticleCoreProps) {
  const articleRef = useRef(null);
  const setArticleRef = useSetAtom(ArticleCoreRefAtom);

  useSetRef({ref: articleRef, setter: setArticleRef});
  
  return (
    <article ref={articleRef} className="prose lg:prose-xl">
      <h1>{article.title}</h1>
      <MDXRemote {...article.content} components={{ CustomCompo, Aside, Def }} />
    </article>
  );
}
