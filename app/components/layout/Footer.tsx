import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-4">MyShop</h3>
          <p className="text-purple-200 text-sm">
            Achetez en ligne, payez facilement et recevez vos produits
            directement chez vous.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Liens utiles</h4>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li className="hover:text-white cursor-pointer">Accueil</li>
            <li className="hover:text-white cursor-pointer">Produits</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li>Livraison rapide</li>
            <li>Paiement sécurisé</li>
            <li>Support client</li>
            <li>Retours faciles</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-purple-200 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +237 6XX XXX XXX
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> contact@myshop.com
            </li>
          </ul>

          {/* RÉSEAUX SOCIAUX */}
          <div className="flex gap-4 mt-5">
            <span className="p-2 bg-[#8352a5] rounded-full hover:bg-white hover:text-purple-700 transition cursor-pointer">
              <FaFacebookF />
            </span>
            <span className="p-2 bg-[#8352a5] rounded-full hover:bg-white hover:text-purple-700 transition cursor-pointer">
              <FaInstagram />
            </span>
            <span className="p-2 bg-[#8352a5] rounded-full hover:bg-white hover:text-purple-700 transition cursor-pointer">
              <FaTwitter />
            </span>
          </div>
        </div>
      </div>

      {/* PARTIE BAS */}
      <div className="border-t border-purple-600">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-purple-200">
          © {new Date().getFullYear()} FarotyShop — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
