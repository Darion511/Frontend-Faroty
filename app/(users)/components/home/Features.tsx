"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../product/ProductCard";
import ButtonRe from "../ui/ButtonRe";
import SelectCa from "../ui/SelectCa";
import SelectBrand from "../ui/SelectBrand";

import { getAllProducts } from "@/app/services/productService";
import { Product } from "@/app/types/product";

export default function Features() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => console.error("Erreur produits:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.category?.name ?? "Inconnu")),
      ).filter(Boolean),
    [products],
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.marque))).filter(Boolean),
    [products],
  );
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (category ? p.category?.name === category : true) &&
          (brand ? p.marque === brand : true),
      ),
    [products, category, brand],
  );

  const handleReset = () => {
    setCategory("");
    setBrand("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Outfit:wght@300;400;500;600&display=swap');

        .ft-section {
          font-family: 'nexa', sans-serif;
          background: #fdf9f6;
          padding: clamp(64px, 8vw, 110px) 0 clamp(56px, 7vw, 96px);
          position: relative;
          overflow: hidden;
        }

        /* subtle bg grain */
        .ft-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse 60% 40% at 90% 10%, rgba(131,82,165,.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 10% 90%, rgba(176,127,212,.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .ft-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 80px);
          position: relative;
        }

        /* ── HEADER ── */
        .ft-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(40px, 6vw, 64px);
        }

        .ft-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .3em;
          text-transform: uppercase;
          color: #8352a5;
          margin-bottom: 16px;
        }
        .ft-eyebrow::before, .ft-eyebrow::after {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: #8352a5;
          opacity: .5;
        }

        .ft-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          line-height: 1.1;
          color: #1a1020;
          margin-bottom: 14px;
          letter-spacing: -.01em;
        }
        .ft-title em {
          font-style: italic;
          color: #8352a5;
        }

        .ft-sub {
          font-size: 15px;
          font-weight: 300;
          color: rgba(26,16,32,.45);
          max-width: 400px;
        }

        /* ── FILTERS ── */
        .ft-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: clamp(28px, 4vw, 48px);
          padding: 16px 20px;
          background: #fff;
          border: 1px solid rgba(131,82,165,.12);
          border-radius: 14px;
          box-shadow: 0 2px 16px rgba(131,82,165,.06);
        }

        .ft-filters-left {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }

        .ft-filter-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(26,16,32,.3);
          margin-right: 4px;
        }

        /* override selects to match theme */
        .ft-filters select {
          appearance: none;
          background: rgba(131,82,165,.06);
          border: 1px solid rgba(131,82,165,.15);
          border-radius: 8px;
          padding: 9px 36px 9px 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1a1020;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238352a5' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
        }
        .ft-filters select:focus {
          border-color: #8352a5;
          box-shadow: 0 0 0 3px rgba(131,82,165,.12);
        }

        .ft-count-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .08em;
          color: #8352a5;
          background: rgba(131,82,165,.08);
          border: 1px solid rgba(131,82,165,.15);
          border-radius: 20px;
          padding: 5px 14px;
          white-space: nowrap;
        }

        /* ── SLIDER WRAPPER ── */
        .ft-slider-wrap {
          position: relative;
        }

        .ft-nav-btn {
          position: absolute;
          top: 50%; z-index: 20;
          transform: translateY(-50%);
          width: 46px; height: 46px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid rgba(131,82,165,.18);
          box-shadow: 0 4px 20px rgba(131,82,165,.12);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background .25s, transform .25s, box-shadow .25s;
          outline: none;
        }
        .ft-nav-btn:hover {
          background: #8352a5;
          box-shadow: 0 8px 28px rgba(131,82,165,.35);
          transform: translateY(-50%) scale(1.08);
        }
        .ft-nav-btn:hover svg { color: #fff !important; }
        .ft-nav-btn.prev { left: -22px; }
        .ft-nav-btn.next { right: -22px; }

        @media (max-width: 1023px) {
          .ft-nav-btn { display: none; }
        }

        /* ── LOADING ── */
        .ft-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 80px 0;
        }
        .ft-spinner {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 3px solid rgba(131,82,165,.15);
          border-top-color: #8352a5;
          animation: ftSpin .8s linear infinite;
        }
        @keyframes ftSpin { to { transform: rotate(360deg); } }
        .ft-loading-txt {
          font-size: 13px;
          color: rgba(26,16,32,.35);
          letter-spacing: .06em;
        }

        /* ── EMPTY STATE ── */
        .ft-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding: 72px 0;
          text-align: center;
        }
        .ft-empty-icon {
          width: 80px; height: 80px;
          border-radius: 24px;
          background: rgba(131,82,165,.07);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .ft-empty-icon svg { color: rgba(131,82,165,.4); }
        .ft-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 400;
          color: #1a1020;
          margin-bottom: 8px;
        }
        .ft-empty-sub {
          font-size: 14px;
          color: rgba(26,16,32,.4);
          margin-bottom: 24px;
        }

        /* bottom rule */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 36px;
        }
        .ft-bottom-rule {
          flex: 1;
          max-width: 120px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(131,82,165,.2));
        }
        .ft-bottom-rule.right {
          background: linear-gradient(90deg, rgba(131,82,165,.2), transparent);
        }
        .ft-bottom-txt {
          font-size: 11px;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: rgba(131,82,165,.45);
        }
      `}</style>

      <section className="ft-section">
        <div className="ft-inner">
          {/* ── HEADER ── */}
          <div className="ft-header">
            <p className="ft-eyebrow">Catalogue</p>
            <h2 className="ft-title">
              Nos <em>Produits</em>
            </h2>
            <p className="ft-sub">
              Découvrez nos meilleures offres et nouveautés
            </p>
          </div>

          {/* ── FILTERS ── */}
          <div className="ft-filters">
            <div className="ft-filters-left">
              <span className="ft-filter-label">Filtrer :</span>
              <SelectCa categories={categories} onChange={setCategory} />
              <SelectBrand brands={brands} onChange={setBrand} />
            </div>
            {!isLoading && (
              <span className="ft-count-badge">
                {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* ── CONTENT ── */}
          {isLoading ? (
            <div className="ft-loading">
              <div className="ft-spinner" />
              <p className="ft-loading-txt">Chargement des produits…</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="ft-empty">
              <div className="ft-empty-icon">
                <svg
                  width="36"
                  height="36"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="ft-empty-title">Aucun produit trouvé</h3>
              <p className="ft-empty-sub">
                Essayez de modifier vos filtres ou réinitialisez-les
              </p>
              <ButtonRe onReset={handleReset} />
            </div>
          ) : (
            <div className="ft-slider-wrap">
              <button
                className="ft-nav-btn prev swiper-prev"
                aria-label="Précédent"
              >
                <ChevronLeft size={20} style={{ color: "#8352a5" }} />
              </button>
              <button
                className="ft-nav-btn next swiper-next"
                aria-label="Suivant"
              >
                <ChevronRight size={20} style={{ color: "#8352a5" }} />
              </button>

              <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{ prevEl: ".swiper-prev", nextEl: ".swiper-next" }}
                loop={filteredProducts.length > 4}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                  1280: { slidesPerView: 3, spaceBetween: 24 },
                }}
                style={{ paddingBottom: "4px" }}
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="ft-bottom">
                <div className="ft-bottom-rule" />
                <span className="ft-bottom-txt">
                  {filteredProducts.length} disponible
                  {filteredProducts.length !== 1 ? "s" : ""}
                </span>
                <div className="ft-bottom-rule right" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
