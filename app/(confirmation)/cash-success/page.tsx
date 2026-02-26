"use client";

import Link from "next/link";
import { CheckCircle, Truck, Clock } from "lucide-react";

export default function CashPaymentSuccessPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: #f0faf5;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Decorative blobs */
        .page::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -120px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, #a7f3d0 0%, transparent 70%);
          opacity: 0.5;
          animation: drift 8s ease-in-out infinite alternate;
        }
        .page::after {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, #6ee7b7 0%, transparent 70%);
          opacity: 0.35;
          animation: drift 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* Card */
        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 28px;
          padding: 2.5rem 2rem 2rem;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 20px 60px rgba(16,185,129,0.12),
            0 0 0 1px rgba(16,185,129,0.08);
          text-align: center;
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Icon ring */
        .icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.75rem;
        }
        .icon-ring {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 0 12px rgba(167,243,208,0.25);
          animation: pop 0.6s 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes pop {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .icon-ring svg {
          color: #059669;
          width: 44px;
          height: 44px;
        }

        /* Headline */
        .headline {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #064e3b;
          line-height: 1.15;
          margin-bottom: 0.5rem;
          animation: fadeIn 0.5s 0.45s both;
        }
        .subline {
          font-size: 0.975rem;
          color: #6b7280;
          font-weight: 300;
          margin-bottom: 1.75rem;
          animation: fadeIn 0.5s 0.55s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Info box */
        .info-box {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          border: 1px solid #bbf7d0;
          border-radius: 16px;
          padding: 1.1rem 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: fadeIn 0.5s 0.65s both;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #065f46;
          font-weight: 400;
        }
        .info-row svg {
          flex-shrink: 0;
          color: #10b981;
          width: 18px;
          height: 18px;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #d1fae5, transparent);
          margin: 0 1rem;
        }

        /* Actions */
        .actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: fadeIn 0.5s 0.75s both;
        }
        .btn-primary {
          display: block;
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.975rem;
          font-weight: 500;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 4px 18px rgba(16,185,129,0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(16,185,129,0.45);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          display: block;
          width: 100%;
          padding: 0.875rem;
          border: 1.5px solid #e5e7eb;
          color: #374151;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.975rem;
          font-weight: 400;
          text-decoration: none;
          transition: background 0.18s ease, border-color 0.18s ease;
          background: transparent;
        }
        .btn-ghost:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        /* Footer */
        .footer-note {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 1.5rem;
          letter-spacing: 0.01em;
          animation: fadeIn 0.5s 0.85s both;
        }

        /* Subtle top accent line */
        .card-accent {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 3px;
          border-radius: 0 0 8px 8px;
          background: linear-gradient(90deg, #6ee7b7, #10b981, #6ee7b7);
        }
      `}</style>

      <div className="page">
        <div className="card">
          <div className="card-accent" />

          {/* Icon */}
          <div className="icon-wrap">
            <div className="icon-ring">
              <CheckCircle />
            </div>
          </div>

          {/* Headline */}
          <h1 className="headline">Commande validée !</h1>
          <p className="subline">
            Vous paierez à la réception de votre commande.
          </p>

          {/* Info */}
          <div className="info-box">
            <div className="info-row">
              <Truck />
              <span>Votre commande est en cours de préparation</span>
            </div>
            <div className="divider" />
            <div className="info-row">
              <Clock />
              <span>Paiement à effectuer lors de la livraison</span>
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <Link href="/" className="btn-ghost">
              Retour à l'accueil
            </Link>
          </div>

          <p className="footer-note">Merci pour votre confiance 🙏</p>
        </div>
      </div>
    </>
  );
}
