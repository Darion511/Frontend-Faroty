"use client";

import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { Product } from "../../../types/product";
import { FiltersState } from "../../../types/filters";

interface FiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  products: Product[];
}

export default function Filters({ filters, onChange, products }: FiltersProps) {
  const categories = Array.from(
    new Set(products.map((p) => p.category?.name ?? "Inconnu")),
  );
  const brands = Array.from(new Set(products.map((p) => p.marque)));

  const toggleCategory = (category: string) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  const toggleBrand = (brand: string) => {
    onChange({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) return { minPrice: 0, maxPrice: 0 };
    const prices = products.map((p) => p.price);
    return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };
  }, [products]);

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.maxPrice < maxPrice ? 1 : 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap');

        .fl-aside {
          font-family: 'Outfit', sans-serif;
          width: 100%;
          background: #fff;
          border: 1px solid rgba(131,82,165,.12);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(131,82,165,.07);
          position: sticky;
          top: 96px;
        }

        /* header */
        .fl-head {
          padding: 18px 22px;
          background: linear-gradient(135deg, #8352a5, #6b3d8a);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fl-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .fl-head-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          letter-spacing: .01em;
        }
        .fl-active-badge {
          font-size: 10px;
          font-weight: 700;
          color: #8352a5;
          background: rgba(255,255,255,.9);
          border-radius: 20px;
          padding: 2px 8px;
          line-height: 1.6;
        }

        /* reset btn in header */
        .fl-reset-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.2);
          color: rgba(255,255,255,.8);
          cursor: pointer;
          transition: background .2s, color .2s, transform .3s;
          outline: none;
        }
        .fl-reset-icon:hover {
          background: rgba(255,255,255,.25);
          color: #fff;
          transform: rotate(-180deg);
        }

        /* body */
        .fl-body {
          padding: 6px 0 6px;
        }

        /* section */
        .fl-section {
          padding: 18px 22px;
          border-bottom: 1px solid rgba(131,82,165,.07);
        }
        .fl-section:last-of-type { border-bottom: none; }

        .fl-section-title {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(131,82,165,.55);
          margin-bottom: 14px;
        }

        /* checkbox items */
        .fl-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background .2s;
          user-select: none;
        }
        .fl-item:hover { background: rgba(131,82,165,.05); }
        .fl-item.active { background: rgba(131,82,165,.07); }

        /* custom checkbox */
        .fl-checkbox {
          flex-shrink: 0;
          width: 18px; height: 18px;
          border-radius: 5px;
          border: 1.5px solid rgba(131,82,165,.3);
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, border-color .2s;
          background: transparent;
        }
        .fl-item.active .fl-checkbox {
          background: #8352a5;
          border-color: #8352a5;
        }
        .fl-checkmark {
          width: 10px; height: 10px;
          opacity: 0;
          transition: opacity .15s;
        }
        .fl-item.active .fl-checkmark { opacity: 1; }

        .fl-item-label {
          font-size: 13px;
          font-weight: 400;
          color: rgba(26,16,32,.6);
          transition: color .2s;
          flex: 1;
        }
        .fl-item.active .fl-item-label {
          color: #1a1020;
          font-weight: 500;
        }
        .fl-item-label-wrap {
          display: flex; align-items: center; justify-content: space-between; flex: 1;
        }

        /* price */
        .fl-price-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: #8352a5;
          line-height: 1;
          margin-bottom: 4px;
        }
        .fl-price-currency {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(26,16,32,.35);
          letter-spacing: .05em;
        }
        .fl-price-range-txt {
          font-size: 11px;
          color: rgba(26,16,32,.3);
          letter-spacing: .03em;
          margin-bottom: 14px;
        }

        /* range track */
        .fl-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(
            to right,
            #8352a5 0%,
            #8352a5 var(--pct, 100%),
            rgba(131,82,165,.15) var(--pct, 100%),
            rgba(131,82,165,.15) 100%
          );
          outline: none;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .fl-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #8352a5;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(131,82,165,.4);
          cursor: pointer;
          transition: transform .2s, box-shadow .2s;
        }
        .fl-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 14px rgba(131,82,165,.5);
        }
        .fl-range::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #8352a5;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(131,82,165,.4);
          cursor: pointer;
        }
        .fl-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(26,16,32,.3);
          letter-spacing: .04em;
        }

        /* empty */
        .fl-empty {
          font-size: 12px;
          color: rgba(26,16,32,.3);
          font-style: italic;
          padding: 4px 0;
        }

        /* reset bottom */
        .fl-reset-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: calc(100% - 44px);
          margin: 4px 22px 18px;
          padding: 11px;
          border-radius: 10px;
          background: rgba(131,82,165,.06);
          border: 1px solid rgba(131,82,165,.12);
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(131,82,165,.7);
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
          outline: none;
        }
        .fl-reset-btn:hover {
          background: rgba(131,82,165,.1);
          color: #8352a5;
          border-color: rgba(131,82,165,.25);
        }
      `}</style>

      <aside className="fl-aside">
        {/* header */}
        <div className="fl-head">
          <div className="fl-head-left">
            <span className="fl-head-title">Filtres</span>
            {activeCount > 0 && (
              <span className="fl-active-badge">{activeCount}</span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              className="fl-reset-icon"
              aria-label="Réinitialiser"
              onClick={() => onChange({ categories: [], brands: [], maxPrice })}
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>

        <div className="fl-body">
          {/* CATEGORIES */}
          <div className="fl-section">
            <p className="fl-section-title">Catégories</p>
            {categories.length > 0 ? (
              categories.map((cat) => {
                const active = filters.categories.includes(cat);
                return (
                  <div
                    key={cat}
                    className={`fl-item${active ? " active" : ""}`}
                    onClick={() => toggleCategory(cat)}
                  >
                    <div className="fl-checkbox">
                      <svg
                        className="fl-checkmark"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M1.5 5L4 7.5L8.5 2.5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="fl-item-label">{cat}</span>
                  </div>
                );
              })
            ) : (
              <p className="fl-empty">Aucune catégorie</p>
            )}
          </div>

          {/* BRANDS */}
          <div className="fl-section">
            <p className="fl-section-title">Marques</p>
            {brands.length > 0 ? (
              brands.map((brand) => {
                const active = filters.brands.includes(brand);
                return (
                  <div
                    key={brand}
                    className={`fl-item${active ? " active" : ""}`}
                    onClick={() => toggleBrand(brand)}
                  >
                    <div className="fl-checkbox">
                      <svg
                        className="fl-checkmark"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M1.5 5L4 7.5L8.5 2.5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="fl-item-label">{brand}</span>
                  </div>
                );
              })
            ) : (
              <p className="fl-empty">Aucune marque</p>
            )}
          </div>

          {/* PRICE */}
          <div className="fl-section">
            <p className="fl-section-title">Prix maximum</p>
            <div className="fl-price-val">
              {filters.maxPrice.toLocaleString()}
              <span className="fl-price-currency"> FCFA</span>
            </div>
            <p className="fl-price-range-txt">
              Entre {minPrice.toLocaleString()} et {maxPrice.toLocaleString()}{" "}
              FCFA
            </p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={Math.max(1000, Math.floor((maxPrice - minPrice) / 20))}
              value={filters.maxPrice}
              onChange={(e) =>
                onChange({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="fl-range"
              style={
                {
                  "--pct": `${maxPrice > minPrice ? ((filters.maxPrice - minPrice) / (maxPrice - minPrice)) * 100 : 100}%`,
                } as React.CSSProperties
              }
            />
            <div className="fl-range-labels">
              <span>{minPrice.toLocaleString()} FCFA</span>
              <span>{maxPrice.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        {/* reset bottom */}
        <button
          className="fl-reset-btn"
          onClick={() => onChange({ categories: [], brands: [], maxPrice })}
        >
          <RotateCcw size={12} />
          Réinitialiser
        </button>
      </aside>
    </>
  );
}
