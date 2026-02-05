"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { Product } from "../data/products";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow hover:shadow-xl transition group cursor-pointer overflow-hidden"
    >
      <Link href={`/produits/${product.id}`}>
        <div className=" h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={140}
            height={140}
            className="object-cover w-full group-hover:scale-110 transition duration-300"
          />
        </div>
      </Link>

      {/* CONTENU */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-[#8352a5]">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-gray-900">
            {product.price} FCFA
          </p>
        </div>
      </div>

      {/* BOUTON */}
      <div className="p-4 pt-0">
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Button product={product} />
        </motion.div>
      </div>
    </motion.div>
  );
}
