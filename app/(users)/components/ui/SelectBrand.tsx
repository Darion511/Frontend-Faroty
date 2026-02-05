"use client";

import { useEffect, useState } from "react";

type Props = {
  brands: string[];
  onChange: (value: string) => void;
};

export default function SelectBrand({ brands, onChange }: Props) {
  const [value, setValue] = useState("");

  // 🔹 Charger la marque depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem("brand");
    if (saved) {
      onChange(saved);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setValue(selected);
    localStorage.setItem("brand", selected);
    onChange(selected);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="border text-[#8352a5] border-gray-300 rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
    >
      <option value="">Toutes les marques</option>
      {brands.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  );
}
