const stacks = [
  {
    label: "react",
    name: "React.js",
    text: "React is a declarative UI library",
    src: "/assets/logo/react.png",
    url: "https://reactjs.org/",
  },
  {
    label: "next.js",
    name: "Next.js",
    text: "Next is framework based on React and using SSR",
    src: "/assets/logo/react.png",
    url: "https://nextjs.org/",
  },
  {
    label: "redux",
    name: "redux.js",
    text: "Redux is a predictable state manager",
    src: "/assets/logo/redux.png",
    url: "https://redux.js.org/",
  },
  {
    label: "redux-saga",
    name: "redux-saga.js",
    text: "Redux Saga is Redux superset handling side-effects with javascript generator",
    src: "/assets/logo/redux-saga.png",
    url: "https://redux-saga.js.org/",
  },
  // docker
  // redis
  // jotai
  // recoil
  // react-spring
  // sass
  // jest
  // apollo
  // cypress
  // pupetteer

];

const getStacks = new Map();

export default (() => {
  stacks.forEach((stack) => getStacks.set(stack.label, stack));

  return getStacks;
})();
