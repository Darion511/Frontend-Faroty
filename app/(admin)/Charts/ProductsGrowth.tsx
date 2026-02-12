"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { productsByMonth } from "../data/productsData";

export default function ProductsGrowth() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-[#8352a5] mb-4">
        Évolution des produits
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={productsByMonth}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8352a5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
