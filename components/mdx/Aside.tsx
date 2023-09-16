import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import s from "./aside.module.css";
import { AsideRefAtom, IsAsideActive } from "./store";

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
  const isActive = useAtomValue(IsAsideActive);

  // const variants = { open: { width: "100%" }, closed: { width: 0 } };

  useEffect(() => {
    if (asideRef.current !== null) {
      setAsideRef(asideRef);
    }
  }, []);

  return (
    <motion.aside
      // variants={variants}
      // animate={isActive ? "open" : "closed"}
      ref={asideRef}
      className={`absolute border border-blue-300 rounded-lg p-3 flex  flex-col gap-1 ${s.aside_container} right-full`}
    ></motion.aside>
  );
}
