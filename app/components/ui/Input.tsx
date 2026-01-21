import { Search } from "lucide-react";

export default function Input() {
  return (
    <div className="relative w-full">
      {/* ICÔNE */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-bg-[#8352a5]"
      />

      {/* INPUT */}
      <input
        type="text"
        placeholder="Rechercher des produits..."
        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-[#8352a5] focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
