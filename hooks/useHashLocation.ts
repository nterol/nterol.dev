import { useEffect, useState } from 'react';

export function useHashLocation({ hash }: { hash: string }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => setIsActive(location.hash.includes(hash)), [hash]);
  useEffect(() => {
    const handleLocation = () => {
      setIsActive(location.hash.includes(hash));
    };
    window.addEventListener('hashchange', handleLocation);
    return () => window.removeEventListener('hashchange', handleLocation);
  }, [hash]);

  return isActive;
}
