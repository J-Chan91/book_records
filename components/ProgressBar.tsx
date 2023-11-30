import { cn } from "@/lib/util";

type Props = {
  percent: number;
};

export default function ProgressBar({ percent }: Props) {
  return (
    <div className="flex items-center gap-2 w-full">
      <p className="text-xs">{percent}%</p>

      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          style={{ width: `${percent}%` }}
          className={cn(
            "text-white text-[9px] text-center h-3 bg-red-600 rounded-full",
            percent > 60 && "bg-blue-600",
            percent === 100 && "bg-green-600"
          )}
        ></div>
      </div>
    </div>
  );
}
