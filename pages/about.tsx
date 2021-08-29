import Head from "next/head";
import PageLayout from "@components/templates/page-layout";

import classes from "../styles/About.module.css";
import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";

export default function About() {
  const [index, setIndex] = useState(0);
  const stacks = [
    [
      "React",
      "Scss",
      "Redux",
      "Jest",
      "Cypress",
      "Pupetteer",
      "AWS",
      "Node",
      "Dynamo",
    ],
    [
      "Next.JS",
      "CSS-custom",
      "Redux Saga",
      "Jest",
      "React-Testing Library",
      "Jenkins",
      "AWS",
      "Redis",
      "Lambda",
    ],
  ];
  const companies = ["Doctrine", "24s", "Once"];

  const all = stacks[index].map((tech) =>
    useTransition(tech, {
      from: { opacity: 0, transform: `translate3d(-30px, -30px, 0)`, x: 30 },
      enter: { opacity: 1, transform: `translate3d(0px, 0px, 0)`, x: 30 },
      leave: { transform: `translate3d(30px, 30px, -10px)`, x: 30, opacity: 0 },
    })
  );

  return (
    <PageLayout
      header={
        <Head>
          <title>About</title>
          <meta name="description" content="nterol personal website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
    >
      <section className={classes.container}>
        <h1>{companies[index]}</h1>
        <div className={classes.grid}>
          {all.map((transitions) => (
            <div className={classes.cell}>
              {transitions((style, tech) => (
                <animated.div
                  style={style}
                  key={tech}
                  className={classes.tech_element}
                >
                  {tech}
                </animated.div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={() => setIndex((i) => ++i % stacks.length)}>
          &rarr;
        </button>
      </section>
    </PageLayout>
  );
}
