import { MDXRemote } from 'next-mdx-remote';

import { PresentationSection } from '@/components/molecules/presentation-section';
import { UncertainMDX } from '@/utils/type';

type FirstScreenProps = {
  bio: UncertainMDX;
};

export function BlogPresentation({ bio }: FirstScreenProps) {
  return (
    <section className="flex flex-col justify-center py-16 lg:py-24">
      <div className="prose md:max-w-[50vw] lg:max-w-[45vw]">
        <PresentationSection />
        {bio ? (
          <div className="font-bold lg:text-xl text-black">
            <MDXRemote {...bio} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
