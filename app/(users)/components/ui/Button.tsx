"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { addToCart, getCartAmount } from "../lib/cart";
import { useCartStore } from "../../store/useCartStore";
import { Product } from "@/app/types/product";

export default function Button({ product }: { product: Product }) {
  const setCartAmount = useCartStore((state) => state.setCartAmount);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (added) return;
    addToCart(product);
    setCartAmount(getCartAmount());
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600&display=swap');

        .atc-btn {
          font-family: 'Outfit', sans-serif;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 20px;
          border-radius: 10px;
          border: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: transform .2s, box-shadow .2s;
          outline: none;
          background: linear-gradient(135deg, #8352a5, #6b3d8a);
          color: #fff;
          box-shadow: 0 4px 16px rgba(131,82,165,.28);
        }

        /* shimmer layer */
        .atc-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,.15) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          background-position: -100% 0;
          transition: background-position .0s;
        }
        .atc-btn:hover::before {
          background-position: 200% 0;
          transition: background-position .5s ease;
        }

        .atc-btn:hover:not(.done) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(131,82,165,.4);
        }
        .atc-btn:active:not(.done) {
          transform: translateY(0);
          box-shadow: 0 3px 12px rgba(131,82,165,.25);
        }

        /* done state */
        .atc-btn.done {
          background: linear-gradient(135deg, #34d399, #059669);
          box-shadow: 0 4px 16px rgba(52,211,153,.3);
          cursor: default;
        }

        .atc-label {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: opacity .2s, transform .2s;
        }

        .atc-icon {
          flex-shrink: 0;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .atc-btn:hover:not(.done) .atc-icon {
          transform: scale(1.15) rotate(-8deg);
        }
        .atc-btn.done .atc-icon {
          transform: scale(1.1);
        }
      `}</style>

      <button
        onClick={handleAddToCart}
        className={`atc-btn${added ? " done" : ""}`}
        aria-label={added ? "Ajouté au panier" : "Ajouter au panier"}
      >
        <span className="atc-label">
          <span className="atc-icon">
            {added ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
              <ShoppingCart size={16} strokeWidth={2} />
            )}
          </span>
          {added ? "Ajouté !" : "Ajouter au panier"}
        </span>
      </button>
    </>
  );
}
