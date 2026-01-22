import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function PaymentSummary() {
  return (
    <section className="max-w-7xl mt-10 mx-auto px-6 py-16">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 justify-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Image
              src="/image 67.png"
              alt="logo"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <h1 className="text-lg font-bold text-purple-800">MboaShop</h1>
        </div>

        {/* Détails de commande */}
        <div className="shadow-md rounded-lg overflow-hidden">
          <div className="bg-purple-200 text-purple-900 font-semibold px-4 py-2">
            Détails de commande
          </div>

          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 border-t"
            >
              <div className="flex gap-3">
                <Image
                  src="/Encre.jpg" // image produit
                  alt="Produit"
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <p className="text-purple-700 font-medium leading-tight">
                    Lot de 05 cartouches encre imprimante Epson XP-235
                  </p>
                  <p className="text-xs text-gray-500">1 x 1300 FCFA</p>
                </div>
              </div>

              <span className="text-purple-700 font-semibold text-sm">
                1300 FCFA
              </span>
            </div>
          ))}
        </div>

        {/* Infos entreprise */}
        <div className="shadow-md rounded-lg">
          <div className="bg-purple-200 text-purple-900 font-semibold px-4 py-2">
            Information de l’entreprise
          </div>

          <div className="p-4 space-y-3 text-sm text-purple-700">
            <div className="flex items-center gap-2">
              <Phone size={16} /> WhatsApp
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Quartier, Ville, Pays
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> Adresse
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center shadow-md rounded-lg px-4 py-3 font-semibold">
          <span className="text-gray-700">Montant total</span>
          <span className="text-purple-800">22 000 FCFA</span>
        </div>

        {/* Bouton */}
        <button className="w-full bg-[#8352a5] hover:bg-[#6b428a] text-white py-3 rounded-lg text-lg font-semibold transition">
          Payer
        </button>
      </div>
    </section>
  );
}

/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Merci pour votre message !
        </h1>
        <p className="text-gray-600 mb-6">
          Nous avons bien reçu votre message et nous vous répondrons dans les
          plus brefs délais.
        </p>
        <button className="bg-[#8352a5] text-white px-6 py-2 rounded-lg hover:bg-[#6b428a] transition">
          Retour à laccueil
        </button> */
