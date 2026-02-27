"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

// ── Particle ──────────────────────────────────────────────────────────────────
function Particle({ index }) {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    const palette = [
      "#8352a5",
      "#b07fd4",
      "#d4aaee",
      "#fcd34d",
      "#fb923c",
      "#f472b6",
      "#c084fc",
      "#a78bfa",
    ];
    const size = 5 + Math.random() * 7;
    const isRound = Math.random() > 0.5;
    setStyle({
      position: "absolute",
      left: `${Math.random() * 100}%`,
      top: "-20px",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: isRound ? "50%" : `${Math.random() * 3}px`,
      backgroundColor: palette[index % palette.length],
      opacity: 0,
      animationName: "confettiFall",
      animationTimingFunction: "linear",
      animationFillMode: "forwards",
      animationDelay: `${Math.random() * 2.5}s`,
      animationDuration: `${2.5 + Math.random() * 3}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    });
  }, [index]);

  if (!style) return null;
  return <span style={style} />;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PaymentSuccessPage() {
  const [phase, setPhase] = useState(0); // 0 hidden → 1 card → 2 check → 3 content

  const particles = useMemo(() => Array.from({ length: 70 }, (_, i) => i), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => setPhase(3), 900);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg0: #0c0812;
          --bg1: #130d1e;
          --bg2: #1a1128;
          --glass: rgba(255,255,255,.04);
          --border: rgba(131,82,165,.18);
          --em: #b07fd4;
          --em-glow: rgba(131,82,165,.4);
          --text: #f5f0ff;
          --muted: rgba(245,240,255,.4);
          --faint: rgba(245,240,255,.15);
        }

        /* ── keyframes ── */
        @keyframes confettiFall {
          0%   { transform: translateY(0)   rotate(0deg);   opacity: 1; }
          80%  { opacity: .8; }
          100% { transform: translateY(102vh) rotate(600deg); opacity: 0; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-160deg); opacity: 0; }
          65%  { transform: scale(1.18) rotate(8deg); }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0;   }
        }
        @keyframes ring {
          0%  { transform: scale(.8);  opacity: .5; }
          70% { transform: scale(1.5); opacity: 0; }
          100%{ opacity: 0; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── shell ── */
        .ps-shell {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          background:
            radial-gradient(ellipse 70% 60% at 20% 10%, rgba(131,82,165,.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(176,127,212,.08) 0%, transparent 60%),
            linear-gradient(160deg, var(--bg0) 0%, var(--bg1) 50%, var(--bg2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
        }

        /* grid lines */
        .ps-grid {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* confetti layer */
        .ps-confetti {
          pointer-events: none;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        /* ── card ── */
        .ps-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 48px 40px 40px;
          text-align: center;
          backdrop-filter: blur(24px);
          box-shadow:
            0 60px 100px rgba(0,0,0,.5),
            0 0 0 1px rgba(255,255,255,.04) inset,
            0 1px 0 rgba(255,255,255,.1) inset;
          opacity: 0;
        }
        .ps-card.visible {
          animation: cardIn .65s cubic-bezier(.22,1,.36,1) forwards;
        }

        /* top accent line */
        .ps-card::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 120px; height: 2px;
          border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, var(--em), transparent);
        }

        /* ── check icon ── */
        .ps-icon-wrap {
          position: relative;
          width: 88px; height: 88px;
          margin: 0 auto 32px;
        }
        .ps-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid var(--em);
          opacity: 0;
        }
        .ps-ring.pulse { animation: ring 2.2s ease-out infinite; }
        .ps-ring:nth-child(2) { animation-delay: .6s !important; }

        .ps-circle {
          width: 88px; height: 88px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b07fd4 0%, #8352a5 100%);
          box-shadow: 0 0 0 0 var(--em-glow), 0 12px 32px rgba(131,82,165,.35);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: box-shadow .3s;
        }
        .ps-circle.pop {
          animation: checkPop .55s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        .ps-circle:hover {
          box-shadow: 0 0 0 12px rgba(131,82,165,.15), 0 12px 40px rgba(131,82,165,.45);
        }

        .ps-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        .ps-check.draw {
          animation: drawCheck .45s ease .35s forwards;
        }

        /* ── typography ── */
        .ps-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: var(--em);
          margin-bottom: 14px;
          opacity: 0;
        }
        .ps-tag.in { animation: fadeSlide .5s ease .1s forwards; }
        .ps-tag::before, .ps-tag::after {
          content: '';
          display: block;
          width: 20px; height: 1px;
          background: currentColor;
          opacity: .5;
        }

        .ps-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 6vw, 38px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.15;
          margin-bottom: 12px;
          opacity: 0;
        }
        .ps-title.in { animation: fadeSlide .55s ease .2s forwards; }

        .ps-sub {
          font-size: 14px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 36px;
          opacity: 0;
        }
        .ps-sub.in { animation: fadeSlide .55s ease .3s forwards; }

        /* ── divider ── */
        .ps-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin-bottom: 28px;
          opacity: 0;
        }
        .ps-divider.in { animation: fadeSlide .4s ease .35s forwards; }

        /* ── order pill ── */
        .ps-order {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(131,82,165,.08);
          border: 1px solid rgba(131,82,165,.2);
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 28px;
          opacity: 0;
        }
        .ps-order.in { animation: fadeSlide .5s ease .4s forwards; }
        .ps-order-label { font-size: 11px; color: var(--muted); letter-spacing: .08em; }
        .ps-order-val {
          font-size: 13px;
          font-weight: 600;
          color: var(--em);
          letter-spacing: .1em;
          background: linear-gradient(90deg, #8352a5, #d4aaee, #8352a5);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        /* ── buttons ── */
        .ps-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
        }
        .ps-actions.in { animation: fadeSlide .5s ease .5s forwards; }

        .ps-btn {
          display: block;
          width: 100%;
          padding: 15px 20px;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, background .2s;
          border: none;
        }
        .ps-btn-primary {
          background: linear-gradient(135deg, #b07fd4, #8352a5);
          color: #fff;
          box-shadow: 0 4px 20px rgba(131,82,165,.3);
        }
        .ps-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(131,82,165,.5);
        }
        .ps-btn-ghost {
          background: transparent;
          color: var(--faint);
          border: 1px solid var(--border);
        }
        .ps-btn-ghost:hover {
          color: var(--text);
          border-color: rgba(255,255,255,.2);
          transform: translateY(-1px);
        }

        /* ── footer ── */
        .ps-footer {
          margin-top: 20px;
          font-size: 11px;
          color: rgba(240,244,255,.2);
          text-align: center;
          opacity: 0;
        }
        .ps-footer.in { animation: fadeSlide .5s ease .65s forwards; }
        .ps-footer a {
          color: rgba(240,244,255,.35);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color .2s;
        }
        .ps-footer a:hover { color: var(--em); }
      `}</style>

      <div className="ps-shell">
        {/* grid */}
        <div className="ps-grid" />

        {/* confetti */}
        <div className="ps-confetti">
          {particles.map((i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        {/* card */}
        <div className={`ps-card ${phase >= 1 ? "visible" : ""}`}>
          {/* pulse rings */}
          <div className="ps-icon-wrap">
            <div className={`ps-ring ${phase >= 2 ? "pulse" : ""}`} />
            <div className={`ps-ring ${phase >= 2 ? "pulse" : ""}`} />
            <div className={`ps-circle ${phase >= 2 ? "pop" : ""}`}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <path
                  className={`ps-check ${phase >= 2 ? "draw" : ""}`}
                  d="M8 20 L17 29 L32 12"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* text */}
          <p className={`ps-tag ${phase >= 3 ? "in" : ""}`}>
            Paiement confirmé
          </p>

          <h1 className={`ps-title ${phase >= 3 ? "in" : ""}`}>
            Merci pour
            <br />
            votre commande
          </h1>

          <p className={`ps-sub ${phase >= 3 ? "in" : ""}`}>
            Votre paiement a été accepté.
            <br />
            Un e-mail de confirmation vous a été envoyé.
          </p>
          {/* cta */}
          <div className={`ps-actions ${phase >= 3 ? "in" : ""}`}>
            <Link href="/" className="ps-btn ps-btn-ghost">
              Retour à laccueil
            </Link>
          </div>
        </div>

        {/* footer */}
        <p
          className={`ps-footer ${phase >= 3 ? "in" : ""}`}
          style={{ position: "absolute", bottom: 24, left: 0, right: 0 }}
        >
          Besoin d'aide ?&nbsp;
          <a href="mailto:support@faroty.com">Contactez le support</a>
        </p>
      </div>
    </>
  );
}
