"use client";

import { quartiersDouala } from "../data/quartier";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function SelectQuartier({ value, onChange, error }: Props) {
  return (
    <div className="flex  flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Quartier</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-purple-300"
          }`}
      >
        <option value="">Sélectionner un quartier</option>

        {quartiersDouala.map((quartier) => (
          <option key={quartier} value={quartier}>
            {quartier}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
