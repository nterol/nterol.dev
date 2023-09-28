import { a, useSpring } from '@react-spring/web';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ArticleCoreRefAtom, AsideRefAtom, DefinitionCollection, IsNoteActive } from '@/store/aside-note';
import s from '@/styles/aside.module.css';

export function Aside({ noteID, children }: { noteID: string; children: React.ReactNode }) {
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
          const {y: rootTop} = entry?.rootBounds ?? {y: 0};
          
          setPosition(top + Math.abs(rootTop));
          return;
        } else  { 
          setNote(noteID);
        }
      }, {
        rootMargin: topDelta,
      }
    );

    if (nodeRef.current === null || !isNoteActive) { 
      return;
    }
    
    observerRef.current = observer;
    observerRef.current.observe(nodeRef.current);

    return () => observerRef.current?.disconnect();
  }, [isNoteActive, nodeRef, setNote, articleCoreRef, noteID, asideRef]);

  useEffect(() => {
    if (observerRef.current  && !isNoteActive && nodeRef.current) 
      observerRef.current?.unobserve(nodeRef.current);    
  }, [isNoteActive, nodeRef])

  const spring = useSpring(
    isNoteActive ? { opacity: 1, y: defPosition ?? 200 } : { opacity: 0, y: (defPosition ?? 200) + 20 },
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

