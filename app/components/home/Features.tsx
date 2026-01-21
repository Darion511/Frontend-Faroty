import ProductCard from "../product/ProductCard";

import ButtonRe from "../ui/ButtonRe";
import SelectCa from "../ui/SelectCa";

export default function Features() {
  return (
    <section className="py-20   bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITRE */}
        <div className="flex justify-center items-center mb-12">
          <h2 className="text-4xl font-bold text-[#8352a5]">Nos Produits</h2>
        </div>

        <div className="  flex justify-between mb-6">
          <div className=" flex gap-20">
            <SelectCa />
            <SelectCa />
          </div>
          <div>
            <ButtonRe />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}
