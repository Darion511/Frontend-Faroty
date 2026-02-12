"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../product/ProductCard";
import ButtonRe from "../ui/ButtonRe";
import SelectCa from "../ui/SelectCa";
import SelectBrand from "../ui/SelectBrand";

import { Product } from "../../types/product";
import { getAllProducts } from "../lib/productService";

export default function Features() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(setProducts)
      .catch((err) => console.error("Erreur produits:", err))
      .finally(() => setIsLoading(false));
  }, []);

  /* ================= OPTIONS ================= */
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
    [products],
  );

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).filter(Boolean),
    [products],
  );

  /* ================= FILTER ================= */
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (category ? p.category === category : true) &&
        (brand ? p.brand === brand : true),
    );
  }, [products, category, brand]);

  /* ================= RESET FILTERS ================= */
  const handleReset = () => {
    setCategory("");
    setBrand("");
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 font-nexa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8352a5] mb-3">
            Nos Produits
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light">
            Découvrez nos meilleures offres et nouveautés
          </p>
        </div>

        {/* ===== FILTERS ===== */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <SelectCa categories={categories} onChange={setCategory} />
            <SelectBrand brands={brands} onChange={setBrand} />
          </div>

          <ButtonRe onReset={handleReset} />
        </div>

        {/* ===== CONTENT ===== */}
        {isLoading ? (
          // LOADING STATE
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#8352a5] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Chargement des produits...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          // EMPTY STATE
          <div className="text-center py-20 ">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier vos filtres ou réinitialisez-les
            </p>
            <ButtonRe onReset={handleReset} />
          </div>
        ) : (
          // SLIDER
          <div className="relative">
            {/* NAVIGATION BUTTONS */}
            <button
              className="swiper-prev hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-[#8352a5] hover:scale-110 transition-all duration-300 group"
              aria-label="Produit précédent"
            >
              <ChevronLeft
                className="text-[#8352a5] group-hover:text-white transition-colors"
                size={24}
              />
            </button>

            <button
              className="swiper-next hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-[#8352a5] hover:scale-110 transition-all duration-300 group"
              aria-label="Produit suivant"
            >
              <ChevronRight
                className="text-[#8352a5] group-hover:text-white transition-colors"
                size={24}
              />
            </button>

            {/* SWIPER */}
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              loop={filteredProducts.length > 4}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="
              
              pb-4"
            >
              {filteredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* PRODUCTS COUNT */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} produit
                {filteredProducts.length > 1 ? "s" : ""} disponible
                {filteredProducts.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
