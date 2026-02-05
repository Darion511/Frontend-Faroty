"use client";

export default function ProductsFilters() {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#8352a5]"
      />

      <select className="border rounded-lg px-4 py-2">
        <option>Catégorie</option>
        <option>Accessoires</option>
        <option>Consommables</option>
      </select>

      <select className="border rounded-lg px-4 py-2">
        <option>Marque</option>
        <option>HP</option>
        <option>Epson</option>
      </select>

      <button className="bg-[#8352a5] text-white px-4 py-2 rounded-lg">
        Ajouter un produit
      </button>
    </div>
  );
}
