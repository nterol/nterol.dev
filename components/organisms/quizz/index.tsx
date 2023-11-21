import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { createContext } from 'react';

import { QButton, AnswerSection } from '@/mdx/QButton';

type QuizzProps = { quizz: { content: MDXRemoteSerializeResult; id: string } };

export const QuizzContext = createContext<{ id: string | null }>({ id: null });

export function Quizz({ quizz }: QuizzProps) {
  //const { frontmatter } = quizz.content;

  return (
    <article className="prose prose-sm rounded-lg bg-fancy-red p-2 max-w-xs aspect-square">
      <QuizzContext.Provider value={{ id: quizz.id }}>
        <MDXRemote components={{ QButton, AnswerSection }} {...quizz.content} />
      </QuizzContext.Provider>
    </article>
  );
}
