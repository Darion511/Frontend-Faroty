"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import CategoriesCard from "../../categoriesCard";

import { useEffect, useState } from "react";
import { Category } from "@/app/types/product";
import { getAllCategories } from "@/app/services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllCategories();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
        setError("Impossible de charger les catégories");
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Déterminer s'il faut afficher le carrousel ou la grille statique
  const hasMultipleCategories = categories.length > 2;

  // État de chargement
  if (isLoading) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#8352a5] text-3xl sm:text-4xl lg:text-5xl font-nexa font-bold mb-3">
              Nos Catégories
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-nexa font-light">
              Découvrez nos différentes collections
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8352a5]"></div>
          </div>
        </div>
      </section>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#8352a5] text-3xl sm:text-4xl lg:text-5xl font-nexa font-bold mb-3">
              Nos Catégories
            </h2>
          </div>
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#8352a5] text-white rounded-lg hover:bg-[#6b3d8f] transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Aucune catégorie
  if (categories.length === 0) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#8352a5] text-3xl sm:text-4xl lg:text-5xl font-nexa font-bold mb-3">
              Nos Catégories
            </h2>
          </div>
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-semibold">
              Aucune catégorie disponible pour le moment
            </p>
          </div>
        </div>
      </section>
    );
  }

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
                className="pb-2"
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.id}>
                    <CategoriesCard category={category} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            // AFFICHAGE STATIQUE POUR 1-2 CATÉGORIES
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
              {categories.map((category) => (
                <div key={category.id} className="w-full sm:w-auto max-w-sm">
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
