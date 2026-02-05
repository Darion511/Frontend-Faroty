"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { productsByBrand } from "../data/productsStats";

const COLORS = ["#8352a5", "#b085d6", "#d7c1ec", "#ede4f7"];

export default function ProductsByBrand() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-[#8352a5] mb-4">Produits par marque</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={productsByBrand}
            dataKey="total"
            nameKey="name"
            outerRadius={90}
            label
          >
            {productsByBrand.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
