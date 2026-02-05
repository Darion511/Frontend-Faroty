"use client";

import { FaCreditCard, FaTruck, FaClipboardCheck } from "react-icons/fa";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function HeroSection() {
  return (
    <section className="bg-scroll bg-[url('/Pastel.png')] text-white">
      {/* HERO */}
      <div className="bg-[#8352a5]/60 ">
        <div className=" min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            {/* TEXTE */}
            <div className="space-y-2 mb-14">
              <h1 className="text-4xl font-nexa font-light md:text-6xl tracking-tight">
                Achetez en ligne,
              </h1>
              <h1 className="text-4xl font-nexa font-light md:text-6xl tracking-tight">
                payez comme vous voulez,
              </h1>
              <h1 className="text-4xl font-nexa font-light md:text-6xl tracking-tight">
                livrés chez vous
              </h1>
            </div>

            {/* BOUTONS */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/produits"
                className="bg-white font-nexa font-light text-[#8352a5] text-lg py-4 px-10 rounded-full shadow-lg transition hover:-translate-y-1 hover:bg-gray-100"
              >
                Voir les produits
              </Link>

              <Link
                href=""
                className="border-2 border-white text-white font-nexa font-light text-lg py-4 px-10 rounded-full transition hover:-translate-y-1 hover:bg-white hover:text-[#8352a5]"
              >
                En savoir plus
              </Link>
            </div>

            {/* LIGNE DECORATIVE */}
            <div className="mt-20">
              <div className="w-24 h-1 bg-white/40 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION INFOS */}
      <div className="bg-white font-nexa font-light text-gray-700 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={40}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {/* SLIDE 1 */}
            <SwiperSlide>
              <div className="flex items-center gap-4 justify-center hover:-translate-y-1 transition">
                <FaCreditCard size={28} className="text-[#8352a5]" />
                <div>
                  <p className="font-semibold">Paiement sécurisé</p>
                  <p className="text-sm text-gray-500">Cartes & Mobile Money</p>
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 2 */}
            <SwiperSlide>
              <div className="flex items-center gap-4 justify-center hover:-translate-y-1 transition">
                <FaClipboardCheck size={28} className="text-[#8352a5]" />
                <div>
                  <p className="font-semibold">Produits certifiés</p>
                  <p className="text-sm text-gray-500">Qualité garantie</p>
                </div>
              </div>
            </SwiperSlide>

            {/* SLIDE 3 */}
            <SwiperSlide>
              <div className="flex items-center gap-4 justify-center hover:-translate-y-1 transition">
                <FaTruck size={28} className="text-[#8352a5]" />
                <div>
                  <p className="font-semibold">Livraison rapide</p>
                  <p className="text-sm text-gray-500">24 – 48h</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
