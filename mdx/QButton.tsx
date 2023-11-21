// import { useSetAtom } from 'jotai';

import { type ReactNode } from 'react';

//, { useContext } from 'react';

//import { QuizzContext } from '@/components/organisms/quizz';

import s from '../styles/test.module.css';

//import { QuizzesAtom } from './../store/quizzes';

type QButtonProps = {
  id: string;
  children: ReactNode;
  letter: string;
};

export function QButton({ letter, children }: QButtonProps) {
  // const { id } = useContext(QuizzContext);
  // const setQuizzAnswer = useSetAtom(QuizzesAtom(id ?? ''));
  // const handleAnswer = () => {
  //   setQuizzAnswer((p) => {
  //     console.log(p);
  //     if (p.answer) return p;
  //     return { id, answer: letter };
  //   });
  // };

  return (
    <button className={s.q_button} onClick={() => {}}>
      <span>{letter}</span>
      <span>{children}</span>
    </button>
  );
}
