import { a, useSpring, config } from '@react-spring/web';
import { useState } from 'react';

import s from '@/styles/drawer.module.css';

import { useDrawerSwipe } from './useDrawerSwipe';

type DrawerProps = {
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
};

export function Drawer({ tag = 'aside', children }: DrawerProps) {
  const Tag = a[tag];
  const [positionSpring, springApi] = useSpring(() => ({
    y: 0,
    // config: { ...config.gentle, clamp: true },
  }));

  const { binders } = useDrawerSwipe({ springApi });

  const [defaultC, setState] = useState(16);

  const anim = useSpring({d: `M 8 16 C 16 ${defaultC}, 48 ${defaultC}, 56 16`});


  

  return (
    <Tag
      style={positionSpring}
      {...binders()}
      className="fixed z-10 overflow-hidden bg-inkblue text-white w-full rounded-t-xl bottom-0"
    >
      <header className="flex flex-col items-center py-2 px-4">
        
        <svg
          onClick={() => setState(prev => prev === 16 ? 32 : prev === 32 ? 0 : 16)}
          className={s.swipe_lead}
          viewBox="0 0 64 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <a.path
            strokeLinecap="round"
            d={anim.d}
            stroke="white"
            fill="transparent"
          />
        </svg>
      </header>
      <main
        data-scroll={true}
        className={`no-scrollbar px-2 pb-3 flex h-full flex-col overflow-hidden data-[scroll=true]:overflow-auto ${s.main_container}`}
      ></main>
    </Tag>
  );
}
