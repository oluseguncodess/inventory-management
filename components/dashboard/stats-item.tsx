import { Istats } from "@/utils/constants";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function StatsItem({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  progress,
  progressStats,
}: Istats) {
  return (
    <div className="px-5 py-7 rounded-xl border border-gray-600/50 flex flex-col gap-5 bg-[#1c2430] w-full md:w-60">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 text-sm">{title}</span>
        <div
          className={`size-9 p-2 flex justify-center items-center rounded-md text-md`}
          style={{backgroundColor: bgColor}}
        >
          <Icon style={{color: iconColor}}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{description}</span>
        <div className={`px-1 text-center rounded-[3px] flex gap-2 items-center ${progress === 'uptrend' ? 'bg-green-950 text-green-400': 'bg-[#322c2d] text-[#f97319]'}`}>
          <span className={`text-[0.75rem]`}>{progressStats}</span>
          {progress === 'uptrend' ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
        </div>
      </div>
    </div>
  );
}
