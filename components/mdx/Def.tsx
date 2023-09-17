// import { useSetAtom } from "jotai";
// import { CurrentNote } from "./store";

export function Def({
  noteID,
  children,
}: {
  noteID: string;
  children: React.ReactNode;
}) {
  // const setCurrentNote = useSetAtom(CurrentNote);
  const handleSetNote = () => {
    // setCurrentNote((n) => (n === noteID ? null : noteID));
  };
  return (
    <span
      // className="underline decoration-wavy"
      onClick={handleSetNote}
      id={noteID}
    >
      {children}
    </span>
  );
}
