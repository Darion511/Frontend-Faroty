"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { motion } from "framer-motion";

export default function ProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow hover:shadow-xl transition group cursor-pointer overflow-hidden"
    >
      {/* IMAGE */}
      <div className=" h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Image
          src="/Encre.jpg"
          alt="Cartouche HP 305"
          width={140}
          height={140}
          className="object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* CONTENU */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-[#8352a5]">Cartouche HP 305</h3>

        <p className="text-sm text-gray-500">Marque : HP</p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-gray-900">12 000 FCFA</p>
        </div>
      </div>

      {/* BOUTON */}
      <div className="p-4 pt-0">
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Button />
        </motion.div>
      </div>
    </motion.div>
  );
}
