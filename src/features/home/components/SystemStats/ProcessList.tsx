import { PROCESS_LIST } from "@/features/home/utils/stats-data";
import { TypedText } from "./TypedText";

/**
 * @interface ProcessListProps
 * @field startTyping - When true, the typing animation will begin.
 */
interface ProcessListProps {
  startTyping: boolean;
}

export const ProcessList: React.FC<ProcessListProps> = ({ startTyping }) => {
  return (
    <div className="font-mono text-xs text-white/90">
      {/* Header */}
      <div className="flex bg-white/10 px-2 py-1 font-bold">
        <span className="w-12">PID</span>
        <span className="hidden w-16 sm:inline-block">USER</span>
        <span className="w-12 text-right">CPU%</span>
        <span className="hidden w-12 text-right sm:inline-block">MEM%</span>
        <span className="flex-1 pl-4">COMMAND</span>
      </div>

      {/* Rows */}
      <div className="space-y-0.5 pt-1">
        {PROCESS_LIST.map((proc) => (
          <div key={proc.pid} className="flex px-2 hover:bg-white/5">
            <span className="w-12 text-white">{proc.pid}</span>
            <span className="text-portfolio-secondary hidden w-16 sm:inline-block">
              {proc.user}
            </span>
            <span className="w-12 text-right text-white/80">
              {proc.cpu.toFixed(1)}
            </span>
            <span className="hidden w-12 text-right text-white/80 sm:inline-block">
              {proc.mem.toFixed(1)}
            </span>
            <span className="flex-1 truncate pl-4 text-white/70">
              <TypedText text={proc.command} start={startTyping} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
