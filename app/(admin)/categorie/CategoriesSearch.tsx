import { Search, Filter } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function CategoriesSearch({ search, setSearch }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8352a5] focus:border-transparent transition-all"
          />
        </div>
        <button className="px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center gap-2 whitespace-nowrap">
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </div>
    </div>
  );
}
