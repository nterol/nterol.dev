import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { AsideRefAtom } from '@/store/aside-note';
import s from '@/styles/aside.module.css';

export function AsideContainer() {
  const asideRef = useRef<HTMLDivElement | null>(null);
  const setAsideRef = useSetAtom(AsideRefAtom);

  useEffect(() => {
    if (asideRef.current !== null) {
      setAsideRef(asideRef);
    }
  }, [setAsideRef]);

  return (
    <aside
      id="note-container"
      ref={asideRef}
      className={`${s.aside_container} border sm:border-red-300 md:border-blue:300 lg:border-green-200`}
    ></aside>
  );
}
