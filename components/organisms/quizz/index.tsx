import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { createContext } from 'react';

import { QButton } from '@/mdx/QButton';

type QuizzProps = { quizz: { content: MDXRemoteSerializeResult; id: string } };

export const QuizzContext = createContext<{ id: string | null }>({ id: null });

export function Quizz({ quizz }: QuizzProps) {
  //const { frontmatter } = quizz.content;

  return (
    <article className="prose rounded-lg bg-fancy-red">
      <QuizzContext.Provider value={{ id: quizz.id }}>
        <MDXRemote components={{ QButton }} {...quizz.content} />
      </QuizzContext.Provider>
    </article>
  );
}
