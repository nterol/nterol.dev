export function Def({
  noteID,
  children,
}: {
  noteID: string;
  children: React.ReactNode;
}) {
  return <span id={noteID}>{children}</span>;
}
