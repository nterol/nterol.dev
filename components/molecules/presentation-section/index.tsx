import { useRouter } from 'next/router';

import { GlowingText } from '@/mdx/glowing-text';
import { Waving } from '@/mdx/waving';

export function PresentationSection(): JSX.Element {
  const { locale } = useRouter();

  return (
    <>
      <h2 className="text-5xl lg:text-8xl font-extrabold whitespace-nowrap">
        <GlowingText targetColor="#ffdf73 30%,#ec715a 60%">
          {`${locale === 'fr' ? "Hey ! c'est" : "Hi ! I'm"} Nicolas `}
        </GlowingText>
        <Waving />
      </h2>{' '}
      <h3 className="text-3xl lg:text-6xl font-extrabold leading-1 text-inkblue">
        {locale === 'fr' ? ' Je développe des interfaces avec ' : ' I build interfaces with '}
        <GlowingText targetColor="#3178C6">Typescript</GlowingText> {locale === 'fr' ? 'et ' : 'and '}
        <GlowingText targetColor="#61dafb">React</GlowingText>
      </h3>
    </>
  );
}
