import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { AsideRefAtom, BottomRefAtom, IsSideNote } from '@/store/aside-note';
import s from '@/styles/aside.module.css';

export function AsideContainer() {
  const asideRef = useRef<HTMLDivElement | null>(null);
  const setAsideRef = useSetAtom(AsideRefAtom);

  const isSideNote = useAtomValue(IsSideNote);

  useEffect(() => {
    if (asideRef.current !== null) {
      setAsideRef(asideRef);
    }
  }, [setAsideRef]);

  if (!isSideNote) return null;

  return <aside id="note-container" ref={asideRef} className={`${s.aside_container} `}></aside>;
}

export function BottomContainer() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const setBottomRef = useSetAtom(BottomRefAtom);

  const isSideNote = useAtomValue(IsSideNote);

  useEffect(() => {
    if (bottomRef.current !== null) {
      setBottomRef(bottomRef);
    }
  }, [setBottomRef]);

  return <aside data-active={!!isSideNote} ref={bottomRef} id="note-container" className={s.bottom_container}></aside>;
}
