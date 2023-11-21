import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const QuizzesAtom = atomFamily(() =>
  atom((id: string) => ({
    id,
    answer: null as null | string,
  })),
);
