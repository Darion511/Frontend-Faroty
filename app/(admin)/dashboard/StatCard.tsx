// import { LucideIcon } from "lucide-react";

// type Props = {
//   title: string;
//   value: string;
//   icon: LucideIcon;
//   iconColor?: string;
//   bgColor?: string;
//   borderColor?: string;
//   trend?: {
//     value: string;
//     isPositive: boolean;
//   };
// };

// export default function StatCard({
//   title,
//   value,
//   icon: Icon,
//   iconColor = "text-purple-600",
//   bgColor = "bg-purple-100",
//   borderColor = "border-purple-100",
//   trend,
// }: Props) {
//   return (
//     <div
//       className={`bg-white rounded-2xl shadow-lg p-6 border ${borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div
//           className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center`}
//         >
//           <Icon className={`w-7 h-7 ${iconColor}`} />
//         </div>
//         {trend && (
//           <div
//             className={`flex items-center gap-1 text-sm font-semibold ${
//               trend.isPositive ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {trend.isPositive ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 10l7-7m0 0l7 7m-7-7v18"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                 />
//               )}
//             </svg>
//             {trend.value}
//           </div>
//         )}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//         <p className={`text-3xl font-bold ${iconColor}`}>{value}</p>
//       </div>
//     </div>
//   );
// }
