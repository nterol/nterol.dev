import { atom, useAtomValue, useSetAtom } from "jotai";
import { MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const AsideRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

export function Aside({
  noteID,
  children,
}: {
  noteID: string;
  children: React.ReactNode;
}) {
  const asideRef = useAtomValue(AsideRefAtom);

  return asideRef.current
    ? createPortal(
        <span className="block p-1 rounded-md bg-blue-200">{children}</span>,
        asideRef.current
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
  }, []);

  return (
    <aside
      ref={asideRef}
      className="border border-blue-300 rounded-lg p-3 flex  flex-col gap-1"
    ></aside>
  );
}
