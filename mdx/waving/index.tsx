import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';

import s from './Waving.module.css';

export const Waving = () => {
  const [waving, set] = useState(false);

  const { x } = useSpring({
    config: { duration: 2100 },
    from: { x: 0 },
    x: 1,
    reset: waving,
  });

  const output = [0, 14, -8, 14, -4, 10, 0, 0];

  return (
    <animated.span
      role="img"
      aria-label="Salut !"
      className={s.wave}
      onMouseEnter={() => set(!waving)}
      onClick={() => set(!waving)}
      style={{
        rotate: x.to({
          range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
          output,
        }),
      }}
    >
      👋
    </animated.span>
  );
};
