"use client";

import "@/app/types/chartConfig";
import { Bar } from "react-chartjs-2";
import { byPeriod } from "@/app/types/statistics";

export default function SalesChart({ data }: { data: byPeriod[] }) {
  const chartData = {
    labels: data.map((p) => p.periodLabel),
    datasets: [
      {
        label: "Commandes",
        data: data.map((p) => p.orderCount),
        backgroundColor: "#94a3b8",
      },
      {
        label: "Livrées",
        data: data.map((p) => p.deliveredCount),
        backgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-[#8352a5] mb-4">
        Commandes vs Livrées
      </h2>
      <Bar data={chartData} />
    </div>
  );
}
