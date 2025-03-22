import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <Particles
      className="absolute inset-0 z-10"
      quantity={100}
      ease={100}
      color="#000000"
      refresh
      staticity={10}
    />
  );
}
