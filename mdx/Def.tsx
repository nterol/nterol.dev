import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { CurrentNote, DefinitionCollection } from '@/store/aside-note';
import s from '@/styles/aside.module.css';

type DefProps = { noteID: string; children: React.ReactNode };

let instance = 0;

export function Def({ noteID, children }: DefProps) {
  const defRef = useRef<HTMLDivElement | null>(null);

  const [noteRef, setNoteRef] = useAtom(DefinitionCollection(noteID));

  const [isActive, setCurrentNote] = useAtom(CurrentNote);

  const handleSetNote = () => {
    setCurrentNote((n) => (n === noteID ? null : noteID));
  };

  useEffect(() => {
    if (defRef.current === null) return;

    setNoteRef({ noteID, nodeRef: defRef, position: (instance += 1) });
  }, [noteID, setNoteRef]);
  return (
    <span
      data-active={isActive === noteID}
      ref={defRef}
      className={s.definition}
      onClick={handleSetNote}
      id={noteID.replaceAll(' ', '-')}
    >
      {children}
      <sup>{noteRef.position}</sup>
    </span>
  );
}
