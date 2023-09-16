import { GlowingText } from "@/components/mdx/glowing-text";
import { Waving } from "@/components/mdx/waving";

import s from "./presentation-section.module.css";

export const Bio = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full p-8 flex rounded-lg bg-fancy-green shadow-md">
    {children}
  </div>
);

export function PresentationSection(): JSX.Element {
  return (
    <div className={s.hero_container}>
      <h2 className="text-6xl font-extrabold">
        <GlowingText>Nicolas Terol</GlowingText>
      </h2>{" "}
      <h3 className="text-4xl font-extrabold leading-1">
        <Waving /> Développeur{" "}
        <GlowingText color="#f72585">Front-End</GlowingText>, je fais du{" "}
        <GlowingText color="#f0db4f">Javascript</GlowingText>, et surtout du{" "}
        <GlowingText color="#61dafb">React</GlowingText>
      </h3>
    </div>
  );
}
