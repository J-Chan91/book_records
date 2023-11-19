type Props = {
  percent: number;
};

export default function ProgressBar({ percent }: Props) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs">{percent}%</p>

      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          style={{ width: `${percent}%` }}
          className="text-white text-[9px] text-center bg-blue-600 h-3 rounded-full"
        ></div>
      </div>
    </div>
  );
}
