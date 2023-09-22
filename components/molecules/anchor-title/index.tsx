import { useHashLocation } from '@/hooks/useHashLocation';

export function AnchorTitle({ title }: { title: string }) {
  const isActive = useHashLocation({ hash: title });
  return (
    <a id={title}>
      <h2 data-text={title} data-active={isActive} className="font-extrabold text-xl lg:text-3xl capitalize mb-4">
        {title}
      </h2>
    </a>
  );
}
