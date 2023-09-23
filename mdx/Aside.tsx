import { a, useSpring } from '@react-spring/web';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import s from './aside.module.css';
import { AsideRefAtom, DefinitionCollection, IsNoteActive } from './store';

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
          console.log('new entry');
          setPosition(y);
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

    if (nodeRef.current === null || !isNoteActive) return;

    observerRef.current.observe(nodeRef.current);

    return () => observerRef.current?.disconnect();
  }, [isNoteActive, nodeRef, noteID, setNote]);

  const spring = useSpring(
    isNoteActive ? { opacity: 1, y: defPosition ?? 0 } : { opacity: 0, y: (defPosition ?? 0) - 10 },
  );

  return asideRef.current
    ? createPortal(
        <a.span style={spring} className="absolute top-0 block p-1 rounded-md bg-blue-200">
          {children}
        </a.span>,
        asideRef.current,
      )
    : null;
}

export function AsideContainer() {
  const asideRef = useRef<HTMLDivElement | null>(null);
  const setAsideRef = useSetAtom(AsideRefAtom);

  useEffect(() => {
    if (asideRef.current !== null) {
      setAsideRef(asideRef);
    }
  }, [setAsideRef]);

  return <aside id="note-container" ref={asideRef} className={`${s.aside_container}`}></aside>;
}
