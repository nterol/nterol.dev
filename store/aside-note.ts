import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { MutableRefObject } from 'react';

export const ArticleCoreRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export const AsideRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export const BottomRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export const CurrentNote = atom<string | null>(null);

export const DefinitionCollection = atomFamily((noteID: string) =>
  atom({
    noteID,
    position: 0,
    positionY: null as number | null,
    nodeRef: { current: null } as MutableRefObject<HTMLDivElement | null>,
  }),
);

export const IsNoteActive = atomFamily((note) =>
  atom(
    (get) => {
      const noteID = get(CurrentNote);
      return note === noteID;
    },
    (get, set, noteID: string | null) => {
      const current = get(CurrentNote);
      set(CurrentNote, current === noteID ? null : noteID);
    },
  ),
);

export const IsSideNote = atom(true);
