// src/common/components/ErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Meta } from "./Meta";

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage =
      (error.statusText || error.data?.message) ?? "An error occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unexpected error occurred";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/95 p-4">
      <Meta
        title={errorStatus ? `Error ${errorStatus}` : "Error"}
        description="An error occurred"
        noIndex={true}
      />

      <div className="clip-bl max-w-2xl border border-white/20 bg-black/30 p-8 font-mono text-white">
        <h1 className="text-portfolio-primary mb-4 text-4xl font-bold">
          {errorStatus ? `ERROR ${errorStatus}` : "ERROR"}
        </h1>

        <p className="mb-6 text-lg text-white/90">{errorMessage}</p>

        <div className="space-y-2 text-sm text-white/70">
          <p>{">"} System encountered an unexpected condition</p>
          <p>{">"} Attempting to recover...</p>
        </div>

        <Link
          to="/"
          className="clip-bl bg-portfolio-primary hover:bg-portfolio-secondary mt-8 inline-block px-6 py-3 font-bold transition-colors"
        >
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
};
