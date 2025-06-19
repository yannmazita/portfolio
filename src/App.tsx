// src/App.tsx
import { Meta } from "@/common/components/Meta";
import { HomeSection } from "@/features/home/components/HomeSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ResumeSection } from "@/features/resume/components/ResumeSection";
import { SkillsSection } from "@/features/skills/components/SkillsSection";

export const App: React.FC = () => {
  return (
    <div className="relative flex grow flex-col">
      <Meta title="Home" description="Yann Mazita's portfolio" />
      <HomeSection />
      <ProjectsSection />
      <ResumeSection />
      <SkillsSection />
    </div>
  );
};
