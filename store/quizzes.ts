import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const QuizzesAtom = atomFamily((id: string) =>
  atom<{ id: string; answer: string | null }>({ id, answer: null }),
);

export const SetQuizzAnswer = atom(
  () => {},
  (get, set, params: { id: string; answer: string }) => {
    const prev = get(QuizzesAtom(params.id));
    if (prev.answer) return;
    set(QuizzesAtom(params.id), { id: prev.id, answer: params.answer });
  },
);
