"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import CategoriesCard from "../../categoriesCard";

import { useEffect, useState } from "react";
import { Category } from "@/app/types/product";
import { getAllCategories } from "@/app/services/categoryService";

/* ─── shared styles injected once ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  .cat-section {
    font-family: 'font-nexa', sans-serif;
    background: #fff;
    padding: clamp(64px, 8vw, 110px) 0 clamp(56px, 7vw, 96px);
    position: relative;
    overflow: hidden;
  }
  .cat-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(ellipse 55% 45% at 95% 5%,  rgba(131,82,165,.05) 0%, transparent 60%),
      radial-gradient(ellipse 45% 55% at  5% 95%, rgba(176,127,212,.04) 0%, transparent 60%);
    pointer-events: none;
  }

  .cat-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 80px);
    position: relative;
  }

  /* ── header ── */
  .cat-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: clamp(40px, 6vw, 64px);
  }
  .cat-eyebrow {
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
  .cat-eyebrow::before, .cat-eyebrow::after {
    content: '';
    display: block;
    width: 28px; height: 1px;
    background: #8352a5;
    opacity: .4;
  }
  .cat-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 300;
    line-height: 1.1;
    color: #1a1020;
    margin-bottom: 14px;
    letter-spacing: -.01em;
  }
  .cat-title em {
    font-style: italic;
    color: #8352a5;
  }
  .cat-sub {
    font-size: 15px;
    font-weight: 300;
    color: rgba(26,16,32,.4);
  }

  /* ── nav buttons ── */
  .cat-slider-wrap { position: relative; }
  .cat-nav {
    position: absolute;
    top: 50%; z-index: 20;
    transform: translateY(-50%);
    width: 46px; height: 46px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid rgba(131,82,165,.18);
    box-shadow: 0 4px 20px rgba(131,82,165,.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background .25s, transform .25s, box-shadow .25s;
    outline: none;
  }
  .cat-nav:hover {
    background: #8352a5;
    box-shadow: 0 8px 28px rgba(131,82,165,.35);
    transform: translateY(-50%) scale(1.08);
  }
  .cat-nav:hover svg { color: #fff !important; }
  .cat-nav.prev { left: -22px; }
  .cat-nav.next { right: -22px; }
  @media (max-width: 1023px) { .cat-nav { display: none; } }

  /* bottom rule */
  .cat-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 36px;
  }
  .cat-rule {
    flex: 1; max-width: 100px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(131,82,165,.2));
  }
  .cat-rule.r { background: linear-gradient(90deg, rgba(131,82,165,.2), transparent); }
  .cat-rule-txt {
    font-size: 10px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(131,82,165,.4);
  }

  /* ── loading ── */
  .cat-loading {
    display: flex; flex-direction: column;
    align-items: center; gap: 16px;
    padding: 80px 0;
  }
  .cat-spinner {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 3px solid rgba(131,82,165,.12);
    border-top-color: #8352a5;
    animation: catSpin .8s linear infinite;
  }
  @keyframes catSpin { to { transform: rotate(360deg); } }
  .cat-loading-txt {
    font-size: 13px; letter-spacing: .06em;
    color: rgba(26,16,32,.35);
  }

  /* ── status states (error / empty) ── */
  .cat-status {
    display: flex; flex-direction: column;
    align-items: center; gap: 0;
    padding: 72px 0; text-align: center;
  }
  .cat-status-icon {
    width: 72px; height: 72px;
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
  }
  .cat-status-icon.error { background: rgba(239,68,68,.07); }
  .cat-status-icon.empty { background: rgba(131,82,165,.07); }
  .cat-status-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 400;
    color: #1a1020; margin-bottom: 8px;
  }
  .cat-status-sub {
    font-size: 14px; color: rgba(26,16,32,.4);
    margin-bottom: 24px;
  }
  .cat-retry-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 12px; font-weight: 600;
    letter-spacing: .15em; text-transform: uppercase;
    padding: 13px 28px; border-radius: 6px;
    background: #8352a5; color: #fff; border: none; cursor: pointer;
    box-shadow: 0 4px 20px rgba(131,82,165,.3);
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .cat-retry-btn:hover {
    background: #b07fd4;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(131,82,165,.45);
  }

  /* static 1-2 cats */
  .cat-static {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
  }
  .cat-static > * { flex: 1; min-width: 260px; max-width: 380px; }
`;

/* ── shared header ── */
function Header() {
  return (
    <div className="cat-header">
      <p className="cat-eyebrow">Collections</p>
      <h2 className="cat-title">
        Nos <em>Catégories</em>
      </h2>
      <p className="cat-sub">Découvrez nos différentes collections</p>
    </div>
  );
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les catégories");
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <style>{css}</style>

      <section className="cat-section">
        <div className="cat-inner">
          <Header />

          {/* ── LOADING ── */}
          {isLoading && (
            <div className="cat-loading">
              <div className="cat-spinner" />
              <p className="cat-loading-txt">Chargement des catégories…</p>
            </div>
          )}

          {/* ── ERROR ── */}
          {!isLoading && error && (
            <div className="cat-status">
              <div className="cat-status-icon error">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: "rgba(239,68,68,.7)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
              </div>
              <h3 className="cat-status-title">Une erreur est survenue</h3>
              <p className="cat-status-sub">{error}</p>
              <button className="cat-retry-btn" onClick={load}>
                Réessayer
              </button>
            </div>
          )}

          {/* ── EMPTY ── */}
          {!isLoading && !error && categories.length === 0 && (
            <div className="cat-status">
              <div className="cat-status-icon empty">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: "rgba(131,82,165,.45)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="cat-status-title">Aucune catégorie disponible</h3>
              <p className="cat-status-sub">
                Revenez bientôt pour découvrir nos collections
              </p>
            </div>
          )}

          {/* ── CONTENT ── */}
          {!isLoading &&
            !error &&
            categories.length > 0 &&
            (categories.length > 2 ? (
              /* carousel */
              <div className="cat-slider-wrap">
                <button
                  className="cat-nav prev cat-swiper-prev"
                  aria-label="Précédent"
                >
                  <ChevronLeft size={20} style={{ color: "#8352a5" }} />
                </button>
                <button
                  className="cat-nav next cat-swiper-next"
                  aria-label="Suivant"
                >
                  <ChevronRight size={20} style={{ color: "#8352a5" }} />
                </button>

                <Swiper
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={categories.length > 3}
                  navigation={{
                    prevEl: ".cat-swiper-prev",
                    nextEl: ".cat-swiper-next",
                  }}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                    1280: { slidesPerView: 3, spaceBetween: 30 },
                  }}
                  style={{ paddingBottom: "4px" }}
                >
                  {categories.map((cat) => (
                    <SwiperSlide key={cat.id}>
                      <CategoriesCard category={cat} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="cat-bottom">
                  <div className="cat-rule" />
                  <span className="cat-rule-txt">
                    {categories.length} collection
                    {categories.length !== 1 ? "s" : ""}
                  </span>
                  <div className="cat-rule r" />
                </div>
              </div>
            ) : (
              /* static 1–2 */
              <div className="cat-static">
                {categories.map((cat) => (
                  <CategoriesCard key={cat.id} category={cat} />
                ))}
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
