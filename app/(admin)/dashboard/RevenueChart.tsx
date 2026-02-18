"use client";

import "@/app/types/chartConfig";
import { Line } from "react-chartjs-2";
import { byPeriod } from "@/app/types/statistics";

interface Props {
  data: byPeriod[];
}

export default function RevenueChart({ data }: Props) {
  const chartData = {
    labels: data.map((p) => p.periodLabel),
    datasets: [
      {
        label: "Revenus (FCFA)",
        data: data.map((p) => p.revenue),
        borderColor: "#8352a5",
        backgroundColor: "rgba(131,82,165,0.25)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y.toLocaleString()} FCFA`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-[#8352a5] mb-4">
        Revenus par période
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
