"use client";

import "@/app/types/chartConfig";
import { Pie } from "react-chartjs-2";
import { summary } from "@/app/types/statistics";

interface Props {
  summary: summary;
}

export default function OrdersStatusChart({ summary }: Props) {
  const data = {
    labels: ["Livrées", "En attente", "Annulées"],
    datasets: [
      {
        data: [
          summary.deliveredOrders,
          summary.pendingOrders,
          summary.cancelledOrders,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-[#8352a5] mb-4">
        Statut des commandes
      </h2>
      <Pie data={data} />
    </div>
  );
}
