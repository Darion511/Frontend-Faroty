"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CategoriesCard() {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 px-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow hover:shadow-xl transition group cursor-pointer"
      >
        {/* IMAGE */}
        <div className="relative h-52 overflow-hidden rounded-t-xl">
          <Image
            src="/image 55.png"
            alt="Encres & Toners"
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
        </div>

        {/* TEXTE */}
        <div className="p-4">
          <h3 className="text-[#8352a5]font-semibold text-lg">
            Encres & Toners
          </h3>
          <p className="text-stone-500 text-sm mt-2">
            Cartouches pour toutes marques
          </p>
        </div>
      </motion.div>
    </div>
  );
}
