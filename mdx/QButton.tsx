import { useSetAtom } from 'jotai';
import { useContext, type ReactNode } from 'react';

import { QuizzContext } from '@/components/organisms/quizz';
import { SetQuizzAnswer } from '@/store/quizzes';
import s from '@/styles/quizz.module.css';

type QButtonProps = {
  children: ReactNode;
  letter: string;
};

export function QButton({ letter, children }: QButtonProps) {
  const { id } = useContext(QuizzContext);

  const setQuizzAnswer = useSetAtom(SetQuizzAnswer);

  const handleAnswer = () => {
    if (id) {
      setQuizzAnswer({ id, answer: letter });
    }
  };

  return (
    <button className={s.q_button} onClick={handleAnswer}>
      <span className={s.letter_case}>{letter.toUpperCase()}</span>
      <span>{children}</span>
    </button>
  );
}

type AnswerSectionProps = {
  propositions: { letter: string; value: string }[];
};
export function AnswerSection({ propositions }: AnswerSectionProps) {
  //const { id } = useContext(QuizzContext);
  //const quizzAnswer = useAtomValue(QuizzesAtom(id ?? ''));

  return (
    <section className={s.section}>
      {propositions.map((proposition) => (
        <QButton key={proposition.letter} letter={proposition.letter}>
          {proposition.value}
        </QButton>
      ))}
    </section>
  );
}
