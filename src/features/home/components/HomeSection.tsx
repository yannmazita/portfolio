// src/features/home/components/HomeSection.tsx
import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { cn } from "@/common/shadcn/lib/utils";

export const HomeSection: React.FC = () => {
  const textMounted = useAnimationStore((state) => state.textMounted);

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center text-center"
    >
      <div
        className={cn(
          "animate-in fade-in slide-in-from-bottom-8 duration-1000",
          textMounted ? "opacity-100" : "opacity-0",
        )}
      >
        <h1 className="text-4xl font-extrabold tracking-widest text-white uppercase md:text-7xl lg:text-8xl">
          Connecting user
        </h1>
        <h2 className="text-portfolio-primary mt-4 text-xl font-semibold tracking-wider uppercase md:text-2xl">
          Hello, friend
        </h2>
      </div>
    </section>
  );
};
