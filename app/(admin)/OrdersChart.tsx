"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ordersData } from "./data/dashboardStats";

export default function OrdersChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-[#8352a5] mb-4">
        Commandes cette semaine
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={ordersData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="commandes"
            stroke="#8352a5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
