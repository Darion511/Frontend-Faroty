"use client";

export default function Filters() {
  return (
    <aside className="w-64 bg-white border  shadow-sm">
      {/* HEADER */}
      <div className="bg-[#8352a5] text-white px-4 py-3  font-semibold">
        Filtres
      </div>

      <div className="p-4  space-y-6">
        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Catégories</h3>

          <div className="space-y-2 text-sm text-[#8352a5]">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Accessoires
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Consommables
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Pièces détachées
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Fournitures
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Autres produits
            </label>
          </div>
        </div>

        {/* MARQUES */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Marques</h3>

          <div className="space-y-2 text-sm text-[#8352a5]">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Marque A
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Marque B
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Marque C
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Marque D
            </label>
          </div>
        </div>

        {/* PRIX */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Prix</h3>

          <p className="text-sm text-[#8352a5] mb-2">2 000 — 50 000 FCFA</p>

          <input
            type="range"
            min={2000}
            max={50000}
            className="w-full accent-[#8352a5]"
          />
        </div>
      </div>
    </aside>
  );
}
