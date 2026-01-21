import CategoriesCard from "../../categoriesCard";
export default function Categories() {
  return (
    <section className=" bg-gray-50 p-4 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[#8352a5] text-5xl font-bold text-center mb-10">
          Catégories
        </h2>
        <div className="flex  gap-8">
          <CategoriesCard />
          <CategoriesCard />
          <CategoriesCard />
        </div>
      </div>
    </section>
  );
}
