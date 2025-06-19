// src/common/components/Layout/Footer.tsx
import { Link } from "react-router-dom";
import { Separator } from "@/common/shadcn/ui/separator";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-background/80 text-foreground/70 mt-auto border-t py-6 text-sm backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <p>&copy; {currentYear} Yann Mazita. All rights reserved.</p>
        <nav className="flex items-center gap-x-4">
          <Link
            to="/privacy-policy"
            className="hover:text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link
            to="/terms-of-service"
            className="hover:text-primary hover:underline"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};
