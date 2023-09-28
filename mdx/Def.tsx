import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import s from './aside.module.css';
import { CurrentNote, DefinitionCollection } from '../store/aside-note';

export function Def({ noteID, children }: { noteID: string; children: React.ReactNode }) {
  const defRef = useRef<HTMLDivElement | null>(null);
  const setNoteRef = useSetAtom(DefinitionCollection(noteID));
  const [isActive, setCurrentNote] = useAtom(CurrentNote);

  const handleSetNote = () => {
    setCurrentNote((n) => (n === noteID ? null : noteID));
  };

  useEffect(() => {
    if (defRef.current === null) return;

    setNoteRef({ noteID, nodeRef: defRef });
  }, [noteID, setNoteRef]);
  return (
    <span
      data-active={isActive === noteID}
      ref={defRef}
      className={`max-w-full  ${s.definition} text-inkblue cursor-pointer`}
      onClick={handleSetNote}
      id={noteID}
    >
      {children}
    </span>
  );
}
