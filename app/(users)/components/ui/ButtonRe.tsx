"use client";

import { RotateCcw } from "lucide-react";

type ButtonReProps = {
  onReset: () => void;
};

export default function ButtonRe({ onReset }: ButtonReProps) {
  const handleReset = () => {
    localStorage.removeItem("filters");
    onReset();
  };

  return (
    <button
      onClick={handleReset}
      className="flex items-center justify-center gap-2 bg-white border-2 border-[#8352a5]/30 text-[#8352a5] px-5 py-2.5 rounded-xl hover:bg-[#8352a5] hover:text-white hover:border-[#8352a5] active:scale-95 transition-all duration-200 font-semibold shadow-sm hover:shadow-md group"
      aria-label="Réinitialiser les filtres"
    >
      <RotateCcw
        size={18}
        className="group-hover:rotate-180 transition-transform duration-500"
      />
      <span>Réinitialiser</span>
    </button>
  );
}
