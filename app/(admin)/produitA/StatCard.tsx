import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
  borderColor,
}: Props) {
  return (
    <div
      className={`h-32 overflow-auto  bg-white rounded-2xl shadow-lg p-6 border ${borderColor} hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${iconColor}`}>{value}</p>
        </div>
        <div
          className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center`}
        >
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
