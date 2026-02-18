"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { Product } from "@/app/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  // ✅ Image principale
  const primaryImage =
    product.productImages?.find((img) => img.isPrimary)?.imageUrl ||
    product.productImages?.[0]?.imageUrl ||
    "/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow hover:shadow-xl transition group cursor-pointer overflow-hidden"
    >
      <Link href={`/produits/${product.id}`}>
        <div className="h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
          <Image
            src={primaryImage}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-110 transition duration-300"
          />
        </div>
      </Link>

      {/* CONTENU */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-[#8352a5]">{product.name}</h3>

        {/* Catégorie au lieu de brand */}
        <p className="text-sm text-gray-500">{product.marque}</p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString()} FCFA
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
