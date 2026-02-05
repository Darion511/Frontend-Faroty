"use client";

import { useEffect, useState } from "react";

type Props = {
  categories: string[];
  onChange: (value: string) => void;
};

export default function SelectCa({ categories, onChange }: Props) {
  const [value, setValue] = useState("");

  // Charger depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem("category");
    if (saved) {
      onChange(saved);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setValue(selected);
    localStorage.setItem("category", selected);
    onChange(selected);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="border text-[#8352a5] border-gray-300 rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
    >
      <option value="">Toutes les catégories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
