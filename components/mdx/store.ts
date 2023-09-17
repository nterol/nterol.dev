import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { MutableRefObject } from "react";

export const AsideRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export const CurrentNote = atom<string | null>(null);
export const IsAsideActive = selectAtom(CurrentNote, (current) => !!current);
