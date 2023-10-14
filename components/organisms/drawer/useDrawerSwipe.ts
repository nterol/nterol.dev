import { SpringRef } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

type Args = {
  springApi: SpringRef<{y: number}>;
};

export function useDrawerSwipe({ springApi }: Args) {
  const binders = useDrag((e) => {});

  return { binders };
}
