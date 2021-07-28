
type Props = {
    children: React.ReactNode;
}

export default function CardArticle({children}: Props) {
  return <article>{children}</article>;
}