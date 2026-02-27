"use client";

import { CreateMessage } from "@/app/services/messageService";
import { Phone, MapPin, Mail, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Le nom est requis.");
      return;
    }
    if (!formData.email.trim()) {
      setError("L'email est requis.");
      return;
    }
    if (!formData.content.trim()) {
      setError("Le message est requis.");
      return;
    }

    setIsSubmitting(true);
    try {
      await CreateMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        content: formData.content.trim(),
      });
      setSent(true);
      setFormData({ name: "", email: "", content: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      href: "tel:+237679910021",
      Icon: Phone,
      label: "Téléphone",
      value: "(+237) 6 79 91 00 21",
    },
    {
      href: "https://maps.google.com/?q=Terminus+Bonamoussadi+Douala",
      Icon: MapPin,
      label: "Adresse",
      value: "Terminus Bonamoussadi, Douala",
    },
    {
      href: "mailto:support@faroty.com",
      Icon: Mail,
      label: "Email",
      value: "support@faroty.com",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@300;400;500;600&display=swap');

        .ct-section {
          font-family: 'Outfit', sans-serif;
          max-width: 1160px;
          margin: 0 auto;
          padding: clamp(64px, 8vw, 110px) clamp(20px, 5vw, 64px) clamp(64px, 8vw, 96px);
          
        }
        .ct-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 40% at 95% 5%,  rgba(131,82,165,.05) 0%, transparent 60%),
            radial-gradient(ellipse 45% 55% at  5% 95%, rgba(176,127,212,.04) 0%, transparent 60%);
        }

        /* ── header ── */
        .ct-header {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          margin-bottom: clamp(40px, 6vw, 64px);
          position: relative;
        }
        .ct-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 600; letter-spacing: .3em;
          text-transform: uppercase; color: #8352a5; margin-bottom: 16px;
        }
        .ct-eyebrow::before, .ct-eyebrow::after {
          content: ''; display: block;
          width: 28px; height: 1px; background: #8352a5; opacity: .4;
        }
        .ct-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px); font-weight: 300;
          line-height: 1.1; color: #1a1020; margin-bottom: 14px;
          letter-spacing: -.01em;
        }
        .ct-title em { font-style: italic; color: #8352a5; }
        .ct-sub { font-size: 15px; font-weight: 300; color: rgba(26,16,32,.4); }

        /* ── grid ── */
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          position: relative;
        }
        @media (max-width: 1023px) { .ct-grid { grid-template-columns: 1fr; } }

        /* ── shared card ── */
        .ct-card {
          background: #fff;
          border: 1px solid rgba(131,82,165,.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(131,82,165,.07);
          display: flex; flex-direction: column;
        }

        .ct-card-head {
          padding: 20px 26px;
          background: linear-gradient(135deg, #8352a5 0%, #6b3d8a 100%);
          display: flex; align-items: center; gap: 12px;
        }
        .ct-card-head-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ct-card-head-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 400; color: #fff;
          letter-spacing: .01em;
        }

        .ct-card-body { padding: 28px 26px; flex: 1; display: flex; flex-direction: column; gap: 24px; }

        /* brand row */
        .ct-brand {
          display: flex; align-items: center; gap: 14px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(131,82,165,.07);
        }
        .ct-brand-logo {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg, #8352a5, #6b3d8a);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(131,82,165,.3);
        }
        .ct-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #8352a5; line-height: 1;
        }
        .ct-brand-sub { font-size: 12px; color: rgba(26,16,32,.35); margin-top: 2px; }

        /* contact items */
        .ct-contacts { display: flex; flex-direction: column; gap: 6px; }
        .ct-contact-item {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 14px; border-radius: 12px;
          text-decoration: none;
          transition: background .2s;
          cursor: pointer;
        }
        .ct-contact-item:hover { background: rgba(131,82,165,.05); }
        .ct-contact-item:hover .ct-contact-icon {
          background: #8352a5; color: #fff;
        }
        .ct-contact-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(131,82,165,.08);
          display: flex; align-items: center; justify-content: center;
          color: #8352a5; flex-shrink: 0;
          transition: background .2s, color .2s;
        }
        .ct-contact-label { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: rgba(26,16,32,.3); margin-bottom: 2px; }
        .ct-contact-value { font-size: 13px; font-weight: 500; color: #1a1020; }

        /* map */
        .ct-map-wrap {
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(131,82,165,.1);
          box-shadow: 0 4px 20px rgba(131,82,165,.07);
          flex-shrink: 0;
        }
        .ct-map-wrap img { display: block; width: 100%; height: auto; }

        /* ── FORM ── */
        .ct-form { display: flex; flex-direction: column; gap: 18px; }

        .ct-field { display: flex; flex-direction: column; gap: 7px; }
        .ct-label {
          font-size: 10px; font-weight: 600; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(26,16,32,.4);
        }
        .ct-input, .ct-textarea {
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 400; color: #1a1020;
          background: rgba(131,82,165,.03);
          border: 1.5px solid rgba(131,82,165,.12);
          border-radius: 10px;
          padding: 13px 16px;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
          width: 100%;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: rgba(26,16,32,.25); }
        .ct-input:focus, .ct-textarea:focus {
          border-color: #8352a5;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(131,82,165,.1);
        }
        .ct-textarea { resize: none; min-height: 130px; line-height: 1.65; }

        /* error */
        .ct-error {
          font-size: 12px; color: #dc2626;
          background: rgba(220,38,38,.06);
          border: 1px solid rgba(220,38,38,.15);
          border-radius: 8px; padding: 10px 14px;
        }

        /* success */
        .ct-success {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 500; color: #059669;
          background: rgba(52,211,153,.08);
          border: 1px solid rgba(52,211,153,.2);
          border-radius: 10px; padding: 12px 16px;
        }

        /* submit */
        .ct-submit {
          font-family: 'Outfit', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 15px 24px;
          border-radius: 10px; border: none; cursor: pointer;
          font-size: 12px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          background: linear-gradient(135deg, #8352a5, #6b3d8a);
          color: #fff;
          box-shadow: 0 4px 20px rgba(131,82,165,.3);
          transition: transform .2s, box-shadow .2s, opacity .2s;
          position: relative; overflow: hidden;
        }
        .ct-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.12) 50%, transparent 60%);
          background-size: 200% 100%; background-position: -100% 0;
        }
        .ct-submit:hover:not(:disabled)::before { background-position: 200% 0; transition: background-position .5s ease; }
        .ct-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(131,82,165,.45); }
        .ct-submit:active:not(:disabled) { transform: translateY(0); }
        .ct-submit:disabled { opacity: .65; cursor: not-allowed; }

        .ct-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          animation: ctSpin .7s linear infinite;
        }
        @keyframes ctSpin { to { transform: rotate(360deg); } }
      `}</style>

      <section className="ct-section">
        {/* header */}
        <div className="ct-header">
          <p className="ct-eyebrow">Support</p>
          <h2 className="ct-title">
            Contactez-<em>nous</em>
          </h2>
          <p className="ct-sub">Nous sommes là pour vous aider</p>
        </div>

        <div className="ct-grid">
          {/* ── COORDONNÉES ── */}
          <div className="ct-card">
            <div className="ct-card-head">
              <div className="ct-card-head-icon">
                <MapPin size={18} color="white" />
              </div>
              <span className="ct-card-head-title">Nos coordonnées</span>
            </div>

            <div className="ct-card-body">
              {/* brand */}
              <div className="ct-brand">
                <div className="ct-brand-logo">🛍️</div>
                <div>
                  <p className="ct-brand-name">IFaShop</p>
                  <p className="ct-brand-sub">
                    Votre boutique en ligne au Cameroun
                  </p>
                </div>
              </div>

              {/* contacts */}
              <div className="ct-contacts">
                {contacts.map(({ href, Icon, label, value }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="ct-contact-item"
                  >
                    <div className="ct-contact-icon">
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="ct-contact-label">{label}</p>
                      <p className="ct-contact-value">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* map */}
              <div className="ct-map-wrap">
                <Image
                  src="/Screenshot 2026-01-21 162416.png"
                  alt="Localisation IFaShop"
                  width={600}
                  height={320}
                  className="ct-map-img"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── FORMULAIRE ── */}
          <div className="ct-card">
            <div className="ct-card-head">
              <div className="ct-card-head-icon">
                <Send size={18} color="white" />
              </div>
              <span className="ct-card-head-title">Envoyez un message</span>
            </div>

            <div className="ct-card-body">
              <form onSubmit={handleSubmit} className="ct-form">
                <div className="ct-field">
                  <label className="ct-label">Nom complet</label>
                  <input
                    className="ct-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className="ct-field">
                  <label className="ct-label">Email ou Téléphone</label>
                  <input
                    className="ct-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    required
                  />
                </div>

                <div className="ct-field">
                  <label className="ct-label">Message</label>
                  <textarea
                    className="ct-textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Écrivez votre message ici…"
                    required
                  />
                </div>

                {error && <p className="ct-error">{error}</p>}

                {sent && (
                  <div className="ct-success">
                    <CheckCircle size={18} />
                    Message envoyé avec succès !
                  </div>
                )}

                <button
                  type="submit"
                  className="ct-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="ct-spinner" /> Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
