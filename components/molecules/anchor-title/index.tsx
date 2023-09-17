import { useEffect, useState } from "react";

export function AnchorTitle({ title }: { title: string }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleLocation = () => {
      setIsActive(location.hash.includes(title));
    };
    window.addEventListener("hashchange", handleLocation);
    return () => window.removeEventListener("hashchange", handleLocation);
  }, []);

  return (
    <a id={title}>
      <h2
        data-text={title}
        data-active={isActive}
        className="font-extrabold text-xl lg:text-3xl capitalize"
      >
        {title}
      </h2>
    </a>
  );
}
