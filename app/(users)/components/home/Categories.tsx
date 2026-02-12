"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import CategoriesCard from "../../categoriesCard";
import { products } from "../data/products";

export default function Categories() {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const hasMultipleCategories = categories.length > 2;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* TITRE */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[#8352a5] text-3xl sm:text-4xl lg:text-5xl font-nexa font-bold mb-3">
            Nos Catégories
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-nexa font-light">
            Découvrez nos différentes collections
          </p>
        </div>

        {/* CONTENU */}
        <div className="relative">
          {hasMultipleCategories ? (
            <>
              {/* BOUTONS DE NAVIGATION */}
              <button
                className="swiper-button-prev-custom hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-[#8352a5] hover:text-white transition-all duration-300 group"
                aria-label="Catégorie précédente"
              >
                <ChevronLeft
                  className="text-[#8352a5] group-hover:text-white transition-colors"
                  size={24}
                />
              </button>

              <button
                className="swiper-button-next-custom hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-[#8352a5] hover:text-white transition-all duration-300 group"
                aria-label="Catégorie suivante"
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
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={categories.length > 3}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                spaceBetween={24}
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
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="!pb-2"
              >
                {categories.map((category, index) => (
                  <SwiperSlide key={`${category}-${index}`}>
                    <CategoriesCard category={category} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            // AFFICHAGE STATIC POUR 1-2 CATÉGORIES
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
              {categories.map((category, index) => (
                <div key={`${category}-${index}`} className="w-full sm:w-auto">
                  <CategoriesCard category={category} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
