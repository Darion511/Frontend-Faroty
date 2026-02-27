"use client";

import CartItem from "./CartItem";
import ResumePanier from "./ResumePanier";
import { getCart } from "../components/lib/cart";
import { CartItem as Item } from "../../types/cart";
import { useState } from "react";
import SelectAll from "./SelectAll";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function PanierPage() {
  const [cart, setCart] = useState<Item[]>(getCart());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@300;400;500;600&display=swap');

        .pn-shell {
          font-family: 'Outfit', sans-serif;
          
          min-height: 100vh;
         
        }
        .pn-shell::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 40% at 90% 8%,  rgba(131,82,165,.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at  8% 92%, rgba(176,127,212,.04) 0%, transparent 60%);
        }

        .pn-inner {
          position: relative;
          max-width: 1160px;
          margin: 0 auto;
          padding: clamp(96px, 12vh, 140px) clamp(20px, 4vw, 48px) 80px;
        }

        /* ── page header ── */
        .pn-page-head {
          margin-bottom: clamp(32px, 5vw, 52px);
        }
        .pn-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 600; letter-spacing: .28em;
          text-transform: uppercase; color: #8352a5; margin-bottom: 10px;
        }
        .pn-eyebrow::before {
          content: ''; display: block;
          width: 24px; height: 1px; background: #8352a5; opacity: .45;
        }
        .pn-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 52px); font-weight: 300;
          line-height: 1.1; color: #1a1020; letter-spacing: -.01em;
        }
        .pn-page-title em { font-style: italic; color: #8352a5; }
        .pn-page-count {
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 400;
          color: rgba(26,16,32,.35);
          margin-top: 6px;
        }

        /* ── grid ── */
        .pn-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .pn-grid { grid-template-columns: 1fr; }
        }

        /* ── left panel ── */
        .pn-left {
          display: flex; flex-direction: column; gap: 14px;
        }

        /* select-all bar */
        .pn-select-wrap {
          background: #fff;
          border: 1px solid rgba(131,82,165,.1);
          border-radius: 14px;
          padding: 12px 18px;
          box-shadow: 0 2px 12px rgba(131,82,165,.05);
        }

        /* items scroll zone */
        .pn-items {
          display: flex; flex-direction: column; gap: 12px;
          max-height: 65vh;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: rgba(131,82,165,.2) transparent;
        }
        .pn-items::-webkit-scrollbar { width: 4px; }
        .pn-items::-webkit-scrollbar-track { background: transparent; }
        .pn-items::-webkit-scrollbar-thumb {
          background: rgba(131,82,165,.2);
          border-radius: 4px;
        }

        /* ── EMPTY STATE ── */
        .pn-empty {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 60vh; text-align: center;
          gap: 0;
        }
        .pn-empty-icon {
          width: 88px; height: 88px; border-radius: 24px;
          background: rgba(131,82,165,.07);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px; color: rgba(131,82,165,.45);
        }
        .pn-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 400;
          color: #1a1020; margin-bottom: 10px;
        }
        .pn-empty-sub {
          font-size: 14px; font-weight: 300;
          color: rgba(26,16,32,.4); max-width: 320px;
          line-height: 1.7; margin-bottom: 32px;
        }
        .pn-empty-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: .15em;
          text-transform: uppercase; text-decoration: none;
          padding: 15px 32px; border-radius: 10px;
          background: linear-gradient(135deg, #8352a5, #6b3d8a);
          color: #fff; box-shadow: 0 4px 20px rgba(131,82,165,.3);
          transition: transform .2s, box-shadow .2s;
          position: relative; overflow: hidden;
        }
        .pn-empty-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%);
          background-size: 200% 100%; background-position: -100% 0;
        }
        .pn-empty-btn:hover::before { background-position: 200% 0; transition: background-position .5s ease; }
        .pn-empty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(131,82,165,.45);
        }
        .pn-empty-btn .pn-arrow { transition: transform .25s; }
        .pn-empty-btn:hover .pn-arrow { transform: translateX(4px); }

        /* decorative dots for empty state */
        .pn-empty-dots {
          display: flex; gap: 6px; margin-top: 40px;
        }
        .pn-empty-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(131,82,165,.2);
        }
        .pn-empty-dot:nth-child(2) { background: rgba(131,82,165,.4); transform: scale(1.3); }
      `}</style>

      <div className="pn-shell">
        <div className="pn-inner">
          {/* empty state */}
          {cart.length === 0 ? (
            <div className="pn-empty">
              <div className="pn-empty-icon">
                <ShoppingBag size={40} strokeWidth={1.5} />
              </div>
              <h2 className="pn-empty-title">Votre panier est vide</h2>
              <p className="pn-empty-sub">
                Ajoutez des produits pour commencer vos achats et profiter de
                notre livraison rapide au Cameroun.
              </p>
              <Link href="/produits" className="pn-empty-btn">
                Découvrir nos produits
                <ArrowRight size={16} className="pn-arrow" />
              </Link>
              <div className="pn-empty-dots">
                <div className="pn-empty-dot" />
                <div className="pn-empty-dot" />
                <div className="pn-empty-dot" />
              </div>
            </div>
          ) : (
            <>
              {/* page header */}
              <div className="pn-page-head">
                <p className="pn-eyebrow">Votre sélection</p>
                <h1 className="pn-page-title">
                  Mon <em>Panier</em>
                </h1>
                <p className="pn-page-count">
                  {cart.length} article{cart.length > 1 ? "s" : ""} dans votre
                  panier
                </p>
              </div>

              {/* grid */}
              <div className="pn-grid">
                {/* left: items */}
                <div className="pn-left">
                  <div className="pn-select-wrap">
                    <SelectAll onClear={() => setCart([])} />
                  </div>
                  <div className="pn-items">
                    {cart.map((item) => (
                      <CartItem
                        key={item.product.id}
                        item={item}
                        setCart={setCart}
                      />
                    ))}
                  </div>
                </div>

                {/* right: summary */}
                <ResumePanier lien="/AdressLivraison" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
