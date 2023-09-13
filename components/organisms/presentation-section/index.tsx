import GlowingText from "@/components/atoms/glowing-text";
import Waving from "@/components/molecules/animations/waving";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import s from "./presentation-section.module.css";

type Props = {
  bioSource: MDXRemoteSerializeResult;
};

const Bio = ({ children }: { children: React.ReactNode }) => (
  <div className={s.bio_container}>{children}</div>
);

export default function PresentationSection({ bioSource }: Props): JSX.Element {
  return (
    <section className={s.container}>
      <div className={s.hero_container}>
        {/* <div className={s.hero_container}> */}
        <h2 className="text-6xl font-extrabold">
          <GlowingText>Nicolas Terol</GlowingText>
        </h2>{" "}
        <h3 className="text-4xl font-extrabold leading-1">
          <Waving /> Développeur{" "}
          <GlowingText color="#f72585">Front-End</GlowingText>, je fais du{" "}
          <GlowingText color="#f0db4f">Javascript</GlowingText>, et surtout du{" "}
          <GlowingText color="#61dafb">React</GlowingText>
        </h3>
        {/* </div> */}
      </div>
      <MDXRemote {...bioSource} components={{ Bio: Bio }} />
    </section>
  );
}
