import s from "./pattern.module.css";

export function PatternBackground() {
  return (
    <div
      className={`${s.pattern} absolute h-[80vw] w-[80vw] md:h-[60vw] md:w-[60vw] rounded-bl-full top-0 right-0 bg-sand-background`}
    />
  );
}
