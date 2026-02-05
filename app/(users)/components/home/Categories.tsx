"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CategoriesCard from "../../categoriesCard";
import { products } from "../data/products";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Categories() {
  return (
    <section className="  bg-gray-50 p-4 py-20">
      <div className="max-w-7xl font-nexa font-light mx-auto px-6">
        <h2 className="text-[#8352a5] text-5xl font-nexa  font-bold text-center mb-10">
          Catégories
        </h2>
        <div className="overflow">
          <div className="relative">
            {/* BOUTON GAUCHE */}
            <button className="swiper-button-prev-custom absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100">
              <ChevronLeft className="text-[#8352a5]" />
            </button>

            {/* BOUTON DROIT */}
            <button className="swiper-button-next-custom absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100">
              <ChevronRight className="text-[#8352a5]" />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <CategoriesCard products={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
