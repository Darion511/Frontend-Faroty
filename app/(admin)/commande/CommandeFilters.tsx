import { Search, Calendar, Clock, CalendarDays } from "lucide-react";
import { FilterType } from "../utils/orderFilters";
type Props = {
  search: string;
  setSearch: (value: string) => void;
  filter: FilterType;
  setFilter: (value: FilterType) => void;
};

export default function SearchAndFilters({
  search,
  setSearch,
  filter,
  setFilter,
}: Props) {
  // const filterOptions: {
  //   value: FilterType;
  //   label: string;
  //   icon: typeof Clock;
  // }[] = [
  //   { value: "jour", label: "Aujourd'hui", icon: Clock },
  //   { value: "semaine", label: "Cette semaine", icon: Calendar },
  //   { value: "mois", label: "Ce mois", icon: CalendarDays },
  // ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Barre de recherche */}
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher par produit ou client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filtres de période */}
        {/* <div className="flex gap-3">
          {filterOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-5 py-3.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                filter === value
                  ? "bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
