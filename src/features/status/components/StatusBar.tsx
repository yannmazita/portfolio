// src/features/status/components/StatusBar.tsx
import { Fragment } from "react";

const SCROLLING_MESSAGES: React.ReactNode[] = [
  "LATEST PROJECT : APEXGUESSER",
  "Wanna test your racing track knowledge?",
  <span>
    Check out{" "}
    <a
      href="https://apexguessr.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold underline underline-offset-2 hover:opacity-80"
    >
      apexguessr.com
    </a>
  </span>,
  "Built with React, Python, PostgreSQL (and many other things)",
];

const MessageSeparator = () => <span className="mx-8 opacity-50">--</span>;

export const StatusBar: React.FC = () => {
  return (
    <div className="bg-portfolio-primary clip-bl group text-md mb-0.5 flex h-8 w-full items-center overflow-hidden font-mono text-white">
      <div className="animate-marquee group-hover:paused flex whitespace-nowrap">
        {/* Render the list twice for a seamless loop */}
        {SCROLLING_MESSAGES.map((message, index) => (
          <Fragment key={`first-${index}`}>
            <span className="px-4">{message}</span>
            <MessageSeparator />
          </Fragment>
        ))}
        {SCROLLING_MESSAGES.map((message, index) => (
          <Fragment key={`second-${index}`}>
            <span className="px-4">{message}</span>
            <MessageSeparator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
