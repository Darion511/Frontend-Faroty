"use client";

import { FaCreditCard, FaTruck, FaClipboardCheck } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroSection() {
  const features = [
    {
      icon: <FaCreditCard size={28} className="text-[#8352a5]" />,
      title: "Paiement sécurisé",
      description: "Cartes & Mobile Money",
    },
    {
      icon: <FaClipboardCheck size={28} className="text-[#8352a5]" />,
      title: "Produits certifiés",
      description: "Qualité garantie",
    },
    {
      icon: <FaTruck size={28} className="text-[#8352a5]" />,
      title: "Livraison rapide",
      description: "24 – 48h",
    },
  ];

  return (
    <section className="relative bg-scroll bg-[url('/Pastel.png')] bg-cover bg-center text-white">
      {/* HERO */}
      <div className="relative bg-gradient-to-b from-[#8352a5]/70 via-[#8352a5]/60 to-[#8352a5]/50">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl w-full text-center">
            {/* BADGE */}

            {/* TEXTE PRINCIPAL */}
            <div className="space-y-3 mb-12 mt-25 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nexa font-light tracking-tight leading-tight">
                Achetez en ligne,
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nexa font-light tracking-tight leading-tight">
                payez comme vous voulez,
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nexa font-light tracking-tight leading-tight">
                livrés chez vous
              </h1>
            </div>

            {/* SOUS-TITRE */}
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Découvrez nos produits de qualité avec paiement flexible et
              livraison rapide partout au Cameroun
            </p>

            {/* BOUTONS */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
              <Link
                href="/produits"
                className="group bg-white font-nexa font-medium text-[#8352a5] text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-50 w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                Voir les produits
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>

              <Link
                href="/contact"
                className="group border-2 border-white text-white font-nexa font-medium text-base sm:text-lg py-3.5 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#8352a5] backdrop-blur-sm w-full sm:w-auto"
              >
                Nous contacter
              </Link>
            </div>

            {/* LIGNE DECORATIVE */}
            <div className="mt-20 animate-pulse">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto rounded-full" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll" />
          </div>
        </div>
      </div>

      {/* SECTION FEATURES */}
      <div className="bg-white font-nexa text-gray-700 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Grid fixe */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 justify-center p-6 rounded-2xl hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#8352a5] group-hover:scale-110 transition-all duration-300">
                  <div className="group-hover:[&>svg]:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </p>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
              className="!pb-4"
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center gap-4 justify-center p-6 rounded-2xl bg-purple-50 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
