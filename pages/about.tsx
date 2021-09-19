import Head from "next/head";
import PageLayout from "@components/templates/page-layout";

import classes from "../styles/About.module.css";
import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { getExperiences } from "@utils/mdx/experiences";

export const getStaticProps = async ({ locale }) => {
  const experiences = getExperiences(locale);

  console.log(experiences[0].data.stack);

  return { props: { experiences } };
};

export default function About({ experiences }) {
  console.log(experiences);
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
      trail: 1000 / tech.length,
      from: {
        opacity: 0,
        transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 100, 1)`,
      },
      enter: {
        opacity: 1,
        transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`,
      },
      leave: {
        transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -100, 1)`,
        opacity: 0,
      },
      onStart: () => ({
        transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 100, 1)`,
      }),
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
              <div className={classes.tech_element}>
                {transitions((style, tech, ...rest) => (
                  <animated.div
                    // onMouseEnter={}
                    style={style}
                    key={tech}
                    className={classes.tech}
                  >
                    {tech}
                  </animated.div>
                ))}
              </div>
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
