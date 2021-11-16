import { useEffect, useRef } from "react";
import c from "./mark.module.css";

type MarkProps = {
  id: string;
  children: React.ReactNode;
};

function Mark({ id, children }: MarkProps): JSX.Element {
  const markRef = useRef(null);

  useEffect(() => {
    if (markRef.current) {
      const observer = new IntersectionObserver((entries) => {
        const [element] = entries;

        if (element.isIntersecting) {
        }
      });
    }
  }, []);
  return (
    <span ref={markRef} className={c.mark_container}>
      {children}
      <sup id={`fnref:${id}`}>
        <a href={`#fn:${id}`}>{id}</a>
      </sup>
    </span>
  );
}
