// src/features/home/components/Home.tsx
import { useRef } from "react";
import { Meta } from "@/common/components/Meta";

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex grow flex-col items-center justify-center text-center"
    >
      <Meta title="Home" description="Yann Mazita's portfolio" />
    </div>
  );
};
