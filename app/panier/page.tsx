import CartItem from "./CartItem";
import ResumePanier from "./ResumePanier";

export default function PanierPage() {
  return (
    <section className="max-w-7xl mt-10 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ===== LISTE DES PRODUITS ===== */}
      <div className="lg:col-span-2   space-y-5">
        {/* HEADER */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="accent-[#8352a5]" />
            Tout sélectionner
          </label>

          <button className="bg-[#8352a5] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
            Supprimer
          </button>
        </div>

        {/* PRODUITS */}
        <div className="space-y-4  h-150 overflow-scroll">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>

      {/* ===== RÉSUMÉ PANIER ===== */}
      <ResumePanier />
    </section>
  );
}
