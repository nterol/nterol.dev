import GlowingText from "@components/atoms/glowing-text";
import Waving from "@components/molecules/animations/waving";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import s from "./presentation-section.module.css";

type Props = {
  bioSource: MDXRemoteSerializeResult;
};

const Bio = ({ children }: { children: React.ReactNode }) => (
  <div className={s.bio_container}>
    <p>{children}</p>
  </div>
);

export default function PresentationSection({ bioSource }: Props): JSX.Element {
  return (
    <section className={s.container}>
      <div className={s.hero_container}>
        <h2 className={s.hero}>
          <Waving /> Salut ! Je suis <GlowingText>Nicolas Terol</GlowingText>
        </h2>{" "}
        <h3>
          Développeur <GlowingText color="#f72585">Front-End</GlowingText>,
          spécialisé <GlowingText color="#f0db4f">Javascript</GlowingText>,{" "}
          <GlowingText color="#61dafb">React</GlowingText>
        </h3>
      </div>
      <MDXRemote {...bioSource} components={{ Bio: Bio }} />
    </section>
  );
}
