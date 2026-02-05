"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { productsByCategory } from "../data/productsStats";

export default function ProductsByCategory() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-[#8352a5] mb-4">
        Produits par catégorie
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={productsByCategory}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8352a5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
