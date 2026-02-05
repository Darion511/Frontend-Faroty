"use client";

import { useMemo, useState } from "react";
import ProductCard from "../product/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

import ButtonRe from "../ui/ButtonRe";
import SelectCa from "../ui/SelectCa";
import SelectBrand from "../ui/SelectBrand";
import { products } from "../data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Features() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  // 🔹 Catégories uniques
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [],
  );

  // 🔹 Marques uniques
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))),
    [],
  );

  // 🔹 Filtrage combiné
  const filteredProducts = products.filter((p) => {
    return (
      (category ? p.category === category : true) &&
      (brand ? p.brand === brand : true)
    );
  });

  return (
    <section className="py-20 font-nexa font-light bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== TITRE ===== */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8352a5]">Nos Produits</h2>
        </div>

        {/* ===== FILTRES ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <SelectCa categories={categories} onChange={setCategory} />
            <SelectBrand brands={brands} onChange={setBrand} />
          </div>

          <ButtonRe
            onReset={() => {
              setCategory("");
              setBrand("");
            }}
          />
        </div>

        {/* ===== SLIDER ===== */}
        <div className="relative">
          <button className="swiper-button-prev-custom absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2">
            <ChevronLeft className="text-[#8352a5]" />
          </button>

          <button className="swiper-button-next-custom absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2">
            <ChevronRight className="text-[#8352a5]" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
