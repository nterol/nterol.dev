import { a, useSpring, config } from '@react-spring/web';

import { useDrawerSwipe } from './useDrawerSwipe';

type DrawerProps = {
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
};

export function Drawer({ tag = 'aside', children }: DrawerProps) {
  const Tag = a[tag];
  const [positionSpring, springApi] = useSpring(() => ({
    y: 80,
    config: { ...config.gentle, clamp: true },
  }));

  const { binders } = useDrawerSwipe({ springApi });

  return (
    <Tag style={positionSpring} {...binders()} className="flex flex-col fixed z-10 overflow-hidden bg-inkblue text-white w-full rounded-xl min-h-[100px] bottom-0">
      <header className='flex flex-col justify-center p-4'><hr className='' /></header>
      <main>{children}</main>
    </Tag>
  );
}
