import ProductCard from "../components/product/ProductCard";
import Filter from "../components/ui/Filter";
import Input from "../components/ui/Input";

export default function Produits() {
  return (
    <section className="mt-18">
      <div className="mr-20">
        <div className="flex  gap-8">
          <Filter />

          <div className="flex-1 mt-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl font-bold text-[#8352a5]">Produits</h2>

              <div className=" w-full md:w-80">
                <Input />
              </div>
            </div>
            <div className="h-150 overflow-y-scroll">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
