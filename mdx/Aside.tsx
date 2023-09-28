import { a, useSpring } from '@react-spring/web';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { AsideRefAtom, DefinitionCollection, IsNoteActive } from '../store/aside-note';

import s from './aside.module.css';

export function Aside({ noteID, children }: { noteID: string; children: React.ReactNode }) {
  const asideRef = useAtomValue(AsideRefAtom);
  const [isNoteActive, setNote] = useAtom(IsNoteActive(noteID));
  const [defPosition, setPosition] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { nodeRef } = useAtomValue(DefinitionCollection(noteID));

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const { y } = entry.boundingClientRect;
          console.log('new position', y);
          setPosition(y);
          return;
        } else if (isNoteActive) {
          setNote(noteID);
        }
      },
      {
        root: document,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );

    if (nodeRef.current === null || !isNoteActive) {
      console.log("Disconnect");
      observerRef.current.disconnect();
      return;
    }
    console.log({ [noteID]: isNoteActive }, 'set observer');
    observerRef.current.observe(nodeRef.current);

    return () => observerRef.current?.disconnect();
  }, [isNoteActive, nodeRef, noteID, setNote]);

  const spring = useSpring(
    isNoteActive ? { opacity: 1, y: defPosition ?? 0 } : { opacity: 0, y: (defPosition ?? 0) - 10 },
  );

  return asideRef.current
    ? createPortal(
        <a.span style={spring} className={s.note_container}>
          {children}
        </a.span>,
        asideRef.current,
      )
    : null;
}

