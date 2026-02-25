"use client";

import { CreateMessage } from "@/app/services/messageService";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim()) {
      setError("Le nom  est requis");
      return;
    }
    if (!formData.email.trim()) {
      setError("Le email est requis");
      return;
    }
    if (!formData.content.trim()) {
      setError("Le conent  est requis");
      return;
    }

    try {
      const newMessage = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        content: formData.content.trim(),
      };
      await CreateMessage(newMessage);

      alert("Message envoyé avec succès !");
      setFormData({ name: "", email: "", content: "" });
    } catch (error: any) {
      alert(error.message || "Erreur lors de l’envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 font-nexa">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8352a5] mb-3">
          Contactez-nous
        </h2>
        <p className="text-gray-600 text-base sm:text-lg font-light">
          Nous sommes là pour vous aider
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ===== COORDONNÉES ===== */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-4 text-white">
            <h3 className="text-lg font-semibold">Nos coordonnées</h3>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 text-gray-700">
            {/* Logo/Nom */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] flex items-center justify-center text-2xl shadow-md">
                🛍️
              </span>
              <div>
                <h4 className="font-bold text-xl text-[#8352a5]">IFaShop</h4>
                <p className="text-sm text-gray-500">Votre boutique en ligne</p>
              </div>
            </div>

            {/* Infos de contact */}
            <div className="space-y-4">
              <a
                href="tel:+237679910021"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-[#8352a5] flex items-center justify-center transition-colors duration-200">
                  <Phone
                    size={18}
                    className="text-[#8352a5] group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="font-medium">(+237) 6 79 91 00 21</p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Terminus+Bonamoussadi+Douala"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-[#8352a5] flex items-center justify-center transition-colors duration-200">
                  <MapPin
                    size={18}
                    className="text-[#8352a5] group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Adresse</p>
                  <p className="font-medium">
                    Terminus Bonamoussadi, Douala, Cameroun
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@faroty.com"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 group-hover:bg-[#8352a5] flex items-center justify-center transition-colors duration-200">
                  <Mail
                    size={18}
                    className="text-[#8352a5] group-hover:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">support@faroty.com</p>
                </div>
              </a>
            </div>

            {/* MAP */}
            <div className="pt-2">
              <Image
                src="/Screenshot 2026-01-21 162416.png"
                alt="Carte localisation IFaShop"
                width={600}
                height={400}
                className="rounded-xl border-2 border-gray-200 w-full h-auto shadow-sm hover:shadow-md transition-shadow duration-200"
                priority
              />
            </div>
          </div>
        </div>

        {/* ===== FORMULAIRE ===== */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-4 text-white">
            <h3 className="text-lg font-semibold">Envoyez-nous un message</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nom */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Entrez votre nom"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8352a5] focus:border-transparent transition-all duration-200 hover:border-[#8352a5]/50"
              />
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email ou Téléphone
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemple@email.com ou +237 6XX XX XX XX"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8352a5] focus:border-transparent transition-all duration-200 hover:border-[#8352a5]/50"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Écrivez votre message ici..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8352a5] focus:border-transparent transition-all duration-200 hover:border-[#8352a5]/50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
