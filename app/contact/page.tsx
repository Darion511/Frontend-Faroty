import { Phone, MapPin, Mail } from "lucide-react";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="max-w-7xl mt-10 mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-[#8352a5]/30 px-6 py-4 font-semibold text-[#8352a5]">
            Nos coordonnées
          </div>

          <div className="p-6 space-y-4 text-gray-700">
            <div className="flex items-center gap-3 font-semibold">
              <span className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                🛍️
              </span>
              MboaShop
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#8352a5]" />
              <span> (+237) 6 79 91 00 21</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#8352a5]" />
              <span>Terminus Bonamoussadi, Douala, Cameroun</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#8352a5]" />
              <span> support@faroty.com</span>
            </div>

            {/* MAP */}
            <div className="pt-4">
              <Image
                src="/Screenshot 2026-01-21 162416.png" // image de carte
                alt="Carte"
                width={500}
                height={300}
                className="rounded-lg border"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-[#8352a5]/30 px-6 py-4 font-semibold text-[#8352a5]">
            Envoyez-nous un message
          </div>

          <form className="p-6 space-y-4">
            <div>
              <label className="block text-sm mb-1">Nom</label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8352a5]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Adresse mail ou Numéro de téléphone
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8352a5]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8352a5]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8352a5] text-white py-3 rounded-lg font-semibold hover:bg-[#6f4490] transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
