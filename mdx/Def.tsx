import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { ArticleCoreRefAtom, DefinitionCollection, IsNoteActive, IsSideNote } from '@/store/aside-note';
import s from '@/styles/aside.module.css';

type DefProps = { noteID: string; children: React.ReactNode };

let instance = 0;

type Args = {
  ref: MutableRefObject<HTMLDivElement | null>;
  noteID: string;
};
function useObserver({ ref, noteID }: Args) {
  const articleCoreRef = useAtomValue(ArticleCoreRefAtom);
  const [isActive, setActiveNote] = useAtom(IsNoteActive(noteID));
  const isSideNote = useAtomValue(IsSideNote);

  const setNoteRef = useSetAtom(DefinitionCollection(noteID));
  useEffect(() => {
    if (!ref.current || !articleCoreRef.current) return;
    const topDelta = `${Math.abs(articleCoreRef.current?.getBoundingClientRect().y) ?? 0}px`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isActive) {
          setActiveNote(null);
        }

        if (entry.isIntersecting && isActive && isSideNote) {
          const { top } = entry.boundingClientRect;
          const { y: rootTop } = entry?.rootBounds ?? { y: 0 };

          setNoteRef((prev) => ({ ...prev, positionY: top + Math.abs(rootTop) }));
        }
      },
      { rootMargin: topDelta },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [articleCoreRef, isActive, isSideNote, ref, setActiveNote, setNoteRef]);
}

export function Def({ noteID, children }: DefProps) {
  const defRef = useRef<HTMLDivElement | null>(null);

  const [noteRef, setNoteRef] = useAtom(DefinitionCollection(noteID));

  const [isActive, setActiveNote] = useAtom(IsNoteActive(noteID));

  useObserver({ ref: defRef, noteID });

  useEffect(() => {
    setNoteRef({ noteID, position: (instance += 1), nodeRef: defRef, positionY: null });
  }, [noteID, setNoteRef]);

  const handleClick = useCallback(() => {
    setActiveNote(noteID);
  }, [noteID, setActiveNote]);

  return (
    <span
      data-active={isActive}
      ref={defRef}
      className={s.definition}
      onClick={handleClick}
      id={noteID.replaceAll(' ', '-')}
    >
      {children}
      <sup>{noteRef.position}</sup>
    </span>
  );
}
