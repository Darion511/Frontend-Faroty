"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { Category } from "@/app/types/product";

export default function CategoriesCard({ category }: { category: Category }) {
  const primaryImage = category.imageUrl;
  return (
    <div className="p-4 space-y-2">
      <Link href={`/produits?category=${encodeURIComponent(category.name)}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow hover:shadow-xl transition group cursor-pointer"
        >
          {/* IMAGE */}
          <div className="relative h-52 overflow-hidden rounded-t-xl">
            <img
              src={primaryImage}
              alt="Encres & Toners"
              className="object-cover group-hover:scale-110 transition duration-300"
            />
          </div>

          {/* TEXTE */}
          <div className="p-4">
            <h3 className="text-[#8352a5] font-semibold text-lg">
              {category.name}
            </h3>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
