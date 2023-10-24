import { a, useSpring } from '@react-spring/web';
import { useAtom, useAtomValue } from 'jotai';
import { Children, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CrossIcon } from '@/components/atoms/icons';
import {
  ArticleCoreRefAtom,
  AsideRefAtom,
  BottomRefAtom,
  DefinitionCollection,
  IsNoteActive,
  IsSideNote,
} from '@/store/aside-note';
import s from '@/styles/aside.module.css';

type AsideProps = { noteID: string; children: React.ReactNode };

export function Note(props: AsideProps) {
  const isSideNote = useAtomValue(IsSideNote);
  return isSideNote ? <SideNote {...props} /> : <BottomNote {...props} />;
}

export function BottomNote({ noteID, children }: AsideProps) {
  const asideRef = useAtomValue(BottomRefAtom);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState<number | null>(null);
  const [isNoteActive, setNote] = useAtom(IsNoteActive(noteID));

  useEffect(() => {
    if (asideRef.current && noteRef.current && !h) {
      setH(noteRef.current.getBoundingClientRect().height);
    }
  }, [asideRef, h]);

  console.log({ h });

  const handleClick = () => setNote(null);

  const spring = useSpring({ opacity: isNoteActive ? 1 : 0, x: '-50%', y: isNoteActive ? -1 * (h ?? 100) - 24 : 80 });

  return asideRef.current
    ? createPortal(
        <a.article ref={noteRef} data-active={isNoteActive} className={s.bottom_note} style={spring}>
          <section className="flex flex-col">
            {Children.map(children, (child) => {
              if (typeof child === 'string') return <p>{child}</p>;
              return child;
            })}
          </section>
          <button className={s.bottom_note_button} onClick={handleClick}>
            <CrossIcon />
          </button>
        </a.article>,
        asideRef.current,
      )
    : null;
}

export function SideNote({ noteID, children }: AsideProps) {
  const asideRef = useAtomValue(AsideRefAtom);
  const articleCoreRef = useAtomValue(ArticleCoreRefAtom);
  const [isNoteActive, setNote] = useAtom(IsNoteActive(noteID));
  const [defPosition, setPosition] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { nodeRef } = useAtomValue(DefinitionCollection(noteID));

  useEffect(() => {
    if (!articleCoreRef.current) return;
    const topDelta = `${Math.abs(articleCoreRef.current?.getBoundingClientRect().y) ?? 0}px`;

    console.log(topDelta);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const { top } = entry.boundingClientRect;
          const { y: rootTop } = entry?.rootBounds ?? { y: 0 };

          setPosition(top + Math.abs(rootTop));
          return;
        } else {
          setNote(null);
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
          {Children.map(children, (child) => {
            if (typeof child === 'string') return <p>{child}</p>;
            return child;
          })}
        </a.span>,
        asideRef.current,
      )
    : null;
}
