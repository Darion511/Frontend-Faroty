"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { categoryData } from "./data/dashboardStats";

export default function CategoryChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-[#8352a5] mb-4">
        Produits par catégorie
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categoryData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8352a5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
