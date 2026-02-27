"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/app/types/product";

export default function CategoriesCard({ category }: { category: Category }) {
  return (
    <>
      <style>{`
        .cc-card {
          display: block;
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(131,82,165,.1);
          box-shadow: 0 4px 24px rgba(131,82,165,.07);
          transition: box-shadow .35s, transform .35s, border-color .35s;
          cursor: pointer;
          text-decoration: none;
        }
        .cc-card:hover {
          box-shadow: 0 16px 48px rgba(131,82,165,.18);
          transform: translateY(-4px);
          border-color: rgba(131,82,165,.25);
        }

        /* image */
        .cc-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: rgba(131,82,165,.05);
        }
        .cc-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .55s cubic-bezier(.25,.46,.45,.94), filter .35s;
          filter: brightness(.97) saturate(1.05);
        }
        .cc-card:hover .cc-img-wrap img {
          transform: scale(1.07);
          filter: brightness(1.02) saturate(1.1);
        }

        /* overlay on image */
        .cc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(26,16,32,.55) 100%
          );
          opacity: 0;
          transition: opacity .35s;
        }
        .cc-card:hover .cc-img-overlay { opacity: 1; }

        /* top accent bar */
        .cc-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #8352a5, #b07fd4);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s ease;
          z-index: 2;
        }
        .cc-card:hover .cc-accent { transform: scaleX(1); }

        /* body */
        .cc-body {
          padding: 18px 20px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid rgba(131,82,165,.07);
        }

        .cc-name {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1a1020;
          line-height: 1.3;
          transition: color .25s;
        }
        .cc-card:hover .cc-name { color: #8352a5; }

        .cc-arrow {
          flex-shrink: 0;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(131,82,165,.08);
          border: 1px solid rgba(131,82,165,.15);
          display: flex; align-items: center; justify-content: center;
          transition: background .25s, transform .25s;
          color: #8352a5;
        }
        .cc-card:hover .cc-arrow {
          background: #8352a5;
          color: #fff;
          transform: translateX(2px);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: "4px" }}
      >
        <Link
          href={`/produits?category=${encodeURIComponent(category.name)}`}
          className="cc-card"
        >
          {/* accent bar */}
          <div className="cc-accent" />

          {/* image */}
          <div className="cc-img-wrap">
            <img src={category.imageUrl} alt={category.name} />
            <div className="cc-img-overlay" />
          </div>

          {/* body */}
          <div className="cc-body">
            <span className="cc-name">{category.name}</span>
            <span className="cc-arrow">
              <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
