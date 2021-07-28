import Waving from "@components/molecules/animations/waving";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import s from "./PresentationSection.module.css";

type Props = {
  bioSource: MDXRemoteSerializeResult;
};

export default function PresentationSection({ bioSource }: Props): JSX.Element {
  return (
    <section className={s.container}>
      <div className={s.hero_container}>
        <h2 className={s.hero}>
          <Waving />
          Salut ! Je m'appelle Nicolas, <br /> je suis un dévelopeur{" "}
          <span className={s.animated_font}>
            <span>Front-End</span>
          </span>
        </h2>
      </div>
      <MDXRemote {...bioSource} />
    </section>
  );
}
