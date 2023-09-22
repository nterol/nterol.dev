import { GlowingText } from '@/components/mdx/glowing-text';
import { Waving } from '@/components/mdx/waving';

export function PresentationSection(): JSX.Element {
  return (
    <>
      <h2 className="text-5xl lg:text-8xl font-extrabold whitespace-nowrap">
        <GlowingText targetColor="#ffdf73 30%,#ec715a 60%">Nicolas Terol</GlowingText>
      </h2>{' '}
      <h3 className="text-3xl lg:text-6xl font-extrabold leading-1 text-inkblue">
        <Waving /> Je développe des interfaces avec <GlowingText targetColor="#3178C6">Typescript</GlowingText>, et{' '}
        <GlowingText targetColor="#61dafb">React</GlowingText>
      </h3>
    </>
  );
}
