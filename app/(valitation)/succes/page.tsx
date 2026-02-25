"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Particle from "./particles";

export default function PaymentSuccessPage() {
  const [visible, setVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);

  const particles = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setCheckVisible(true), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {/* Styles globaux spécifiques à la page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fall {
          from { transform: translateY(-20px) rotate(0); opacity: 1; }
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }

        @keyframes drawCheck {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes pulseRing {
          0% { transform: scale(0.85); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { opacity: 0; }
        }

        .animate-fall { animation: fall linear forwards; }
        .animate-fadeUp { animation: fadeUp .7s ease forwards; }
        .animate-pulseRing { animation: pulseRing 2s ease-out infinite; }

        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="relative min-h-screen overflow-hidden font-body bg-gradient-to-br from-[#0a0a1a] via-[#0d1b2a] to-[#0a1628]">
        {/* Particules */}
        <div className="pointer-events-none absolute inset-0">
          {particles.map((i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div
            className={`w-full max-w-md transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl shadow-[0_40px_80px_rgba(0,0,0,.4)]">
              {/* Icône */}
              <div className="relative mx-auto mb-8 h-24 w-24">
                <div className="animate-pulseRing absolute inset-0 rounded-full border-2 border-emerald-300/40" />
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-400 shadow-[0_0_40px_rgba(99,225,172,.5)]
                  ${checkVisible ? "animate-[scaleIn_.6s_forwards]" : "opacity-0"}`}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path
                      d="M8 20 L17 29 L32 12"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="100"
                      style={{
                        animation: checkVisible
                          ? "drawCheck .5s ease .4s both"
                          : "none",
                      }}
                    />
                  </svg>
                </div>
              </div>

              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
                Paiement réussi
              </p>

              <h1 className="font-display mb-4 text-4xl font-black text-white">
                Merci pour votre commande
              </h1>

              <p className="mb-8 text-white/50">
                Votre paiement a été confirmé. Un email de confirmation vous a
                été envoyé.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/orders"
                  className="rounded-xl bg-emerald-500 py-4 text-sm font-medium uppercase tracking-widest text-white hover:scale-[1.02]"
                >
                  Voir mes commandes
                </Link>

                <Link
                  href="/"
                  className="rounded-xl border border-white/10 py-4 text-sm uppercase tracking-widest text-white/50 hover:text-white"
                >
                  Retour à l’accueil
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-white/30">
              Besoin d’aide ?{" "}
              <a
                href="mailto:support@example.com"
                className="underline hover:text-white"
              >
                Contactez le support
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
