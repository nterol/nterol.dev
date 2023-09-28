import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { MutableRefObject } from 'react';

export const ArticleCoreRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export const AsideRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export const CurrentNote = atom<string | null>(null);

export const DefinitionCollection = atomFamily((noteID: string) =>
  atom({
    noteID,
    nodeRef: { current: null } as MutableRefObject<HTMLDivElement | null>,
  }),
);

export const IsNoteActive = atomFamily((note) =>
  atom(
    (get) => {
      const noteID = get(CurrentNote);
      return note === noteID;
    },
    (get, set, noteID: string) => {
      const current = get(CurrentNote);
      if (current === noteID) {
        console.log('SET TO NULL');
        set(CurrentNote, null);
      }
      set(CurrentNote, noteID);
    },
  ),
);
