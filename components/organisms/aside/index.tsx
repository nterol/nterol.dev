import { a, useSpring } from '@react-spring/web';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { AsideRefAtom, CurrentNote, IsSideNote } from '@/store/aside-note';
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
  const setBottomRef = useSetAtom(AsideRefAtom);

  const currentNote = useAtomValue(CurrentNote);

  const isSideNote = useAtomValue(IsSideNote);

  console.log({ bottomRef: bottomRef });

  useEffect(() => {
    if (bottomRef.current !== null) {
      console.log('New ref');
      setBottomRef(bottomRef);
    }
  }, [setBottomRef]);

  const [spring, api] = useSpring(() => ({ from: { height: 0 } }));

  useEffect(() => {
    api.start(currentNote ? { height: 400 } : { height: 0 });
  }, [api, currentNote]);

  if (isSideNote) return null;

  return <a.aside ref={bottomRef} style={spring} id="note-container" className={s.bottom_container}></a.aside>;
}
