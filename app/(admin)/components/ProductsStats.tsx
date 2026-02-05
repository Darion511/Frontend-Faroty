import ProductsByBrand from "../Charts/ProductsByBrand";
import ProductsByCategory from "../Charts/ProductsByCategory";

export default function ProductsStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ProductsByCategory />
      <ProductsByBrand />
    </div>
  );
}
