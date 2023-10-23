import { a, useSpring } from '@react-spring/web';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CrossIcon } from '@/components/atoms/icons';
import { ArticleCoreRefAtom, AsideRefAtom, DefinitionCollection, IsNoteActive, IsSideNote } from '@/store/aside-note';
import s from '@/styles/aside.module.css';

type AsideProps = { noteID: string; children: React.ReactNode };

export function Aside(props: AsideProps) {
  const isSideNote = useAtomValue(IsSideNote);
  return isSideNote ? <SideAside {...props} /> : <BottomAside {...props} />;
}

export function BottomAside({ noteID, children }: AsideProps) {
  const asideRef = useAtomValue(AsideRefAtom);
  const isNoteActive = useAtomValue(IsNoteActive(noteID));

  const handleClick = () => {};
  return asideRef.current
    ? createPortal(
        <article data-active={isNoteActive} className={s.bottom_note}>
          <button className={s.bottom_note_button} onClick={handleClick}>
            <CrossIcon />
          </button>
          {children}
        </article>,
        asideRef.current,
      )
    : null;
}

export function SideAside({ noteID, children }: AsideProps) {
  const asideRef = useAtomValue(AsideRefAtom);
  const articleCoreRef = useAtomValue(ArticleCoreRefAtom);
  const [isNoteActive, setNote] = useAtom(IsNoteActive(noteID));
  const [defPosition, setPosition] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { nodeRef } = useAtomValue(DefinitionCollection(noteID));

  useEffect(() => {
    if (!articleCoreRef.current) return;
    const topDelta = `${Math.abs(articleCoreRef.current?.getBoundingClientRect().y) ?? 0}px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const { top } = entry.boundingClientRect;
          const { y: rootTop } = entry?.rootBounds ?? { y: 0 };

          setPosition(top + Math.abs(rootTop));
          return;
        } else {
          setNote(noteID);
        }
      },
      {
        rootMargin: topDelta,
      },
    );

    if (nodeRef.current === null || !isNoteActive) {
      return;
    }

    observerRef.current = observer;
    observerRef.current.observe(nodeRef.current);

    return () => observerRef.current?.disconnect();
  }, [isNoteActive, nodeRef, setNote, articleCoreRef, noteID, asideRef]);

  useEffect(() => {
    if (observerRef.current && !isNoteActive && nodeRef.current) observerRef.current?.unobserve(nodeRef.current);
  }, [isNoteActive, nodeRef]);

  const spring = useSpring(
    isNoteActive ? { opacity: 1, y: defPosition ?? 200 } : { opacity: 0, y: (defPosition ?? 200) + 20 },
  );

  return asideRef.current
    ? createPortal(
        <a.span style={spring} className={s.side_note}>
          {children}
        </a.span>,
        asideRef.current,
      )
    : null;
}
