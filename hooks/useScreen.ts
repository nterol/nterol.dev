import { useState, useEffect } from 'react';

type Screen = { name: string; minWidth: number };

export const defaultScreenMap: Screen[] = [
  { name: 'mobile', minWidth: 640 },
  { name: 'tablet portrait', minWidth: 768 },
  { name: 'desktop', minWidth: 1200 },
];

export const tailwindConfig = [
  { name: 'sm', minWidth: 640 },
  { name: 'md', minWidth: 768 },
  { name: 'lg', minWidth: 1024 },
  { name: 'xl', minWidth: 1280 },
  { name: '2xl', minWidth: 1536 },
];

const initScreen = (screenMap: Screen[]) => {
  return screenMap.findLast((mql) => matchMedia(`(min-width: ${mql.minWidth}px)`).matches)?.name ?? null;
};

function useScreen(screenMap = defaultScreenMap) {
  const defaultScreen = screenMap[0].name;

  const [screen, setScreen] = useState<string | null>(null);

  useEffect(() => {
    setScreen(initScreen(screenMap));
  }, [screenMap]);

  useEffect(() => {
    const mediaWatcherList = screenMap.map(({ name, minWidth }, i) => {
      const mediaQuery = matchMedia(`(min-width: ${minWidth}px)`);

      const onMediaChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          setScreen(name);
        } else {
          setScreen(screenMap[i - 1] ? screenMap[i - 1].name : null);
        }
      };
      mediaQuery.addEventListener('change', onMediaChange);
      return { mediaQuery, onMediaChange };
    });

    return () => {
      mediaWatcherList.forEach(({ mediaQuery, onMediaChange }) =>
        mediaQuery.removeEventListener('change', onMediaChange),
      );
    };
  }, [defaultScreen, screenMap]);

  return screen;
}

export default useScreen;
