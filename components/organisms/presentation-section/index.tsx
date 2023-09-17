import { GlowingText } from "@/components/mdx/glowing-text";
import { Waving } from "@/components/mdx/waving";

export const Bio = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full p-8 flex rounded-lg bg-fancy-green shadow-md">
    {children}
  </div>
);

export function PresentationSection(): JSX.Element {
  return (
    <>
      <h2 className="text-5xl lg:text-8xl font-extrabold ">
        <GlowingText targetColor="#ffdf73 30%,#e295b9 60%">
          Nicolas Terol
        </GlowingText>
      </h2>{" "}
      <h3 className="text-3xl lg:text-6xl font-extrabold leading-1 text-inkblue">
        <Waving /> Je développe des interfaces avec{" "}
        {/* <GlowingText color="#f72585">Front-End</GlowingText>, je fais du{" "} */}
        <GlowingText targetColor="#3178C6">Typescript</GlowingText>, et{" "}
        <GlowingText targetColor="#61dafb">React</GlowingText>
      </h3>
    </>
  );
}
