"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Store,
  ChevronRight,
} from "lucide-react";
import InputA from "../components/ui/InputA";
import SelectQuartier from "../components/ui/SelectQuartier";
import DeliveryOption from "../components/ui/Option";
import { getTotal } from "../components/lib/cart";

type DeliveryType = "home" | "store";

export interface FormState {
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  ville: string;
  quartier: string;
}

export default function AdresseLivraison() {
  const router = useRouter();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [form, setForm] = useState<FormState>({
    nom: "",
    prenom: "",
    phone: "",
    email: "",
    ville: "",
    quartier: "",
  });

  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (!form.quartier) {
      setError("Veuillez sélectionner un quartier");
      toast.error("Veuillez sélectionner un quartier");
      return;
    }

    if (!deliveryType) {
      toast.error("Veuillez choisir un mode de livraison");
      return;
    }

    setError("");

    // Sauvegarder toutes les informations nécessaires
    const orderData = {
      ...form,
      deliveryType,
      deliveryFee,
      subtotal,
      total: subtotal + deliveryFee,
      orderNumber: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      orderDate: new Date().toLocaleString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      deliveryAddress: `${form.quartier}, ${form.ville}`,
    };
    localStorage.setItem("orderData", JSON.stringify(orderData));
    router.push("/message");
    localStorage.setItem("orderData", JSON.stringify(orderData));
    localStorage.setItem("adresseLivraison", JSON.stringify(orderData));

    toast.success("Adresse enregistrée avec succès");
    setShowConfirmation(true);
  };

  // Charger le total depuis le localStorage
  useEffect(() => {
    const loadTotal = async () => {
      const total = await getTotal();
      setSubtotal(total);
    };

    loadTotal();
  }, []);

  // Adapter les frais selon le mode de livraison
  useEffect(() => {
    if (deliveryType === "home") {
      setDeliveryFee(1000);
    } else if (deliveryType === "store") {
      setDeliveryFee(0);
    }
  }, [deliveryType]);

  const total = subtotal + deliveryFee;
  const isFormComplete =
    !!form.nom &&
    !!form.prenom &&
    !!form.phone &&
    !!form.ville &&
    !!form.quartier &&
    !!deliveryType;

  useEffect(() => {
    if (!showConfirmation) return;

    console.log("REDIRECTION EN COURS");

    const timer = setTimeout(() => {
      router.push("/message");
    }, 1000);

    return () => clearTimeout(timer);
  }, [showConfirmation, router]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la page */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8352a5] to-[#c084fc] bg-clip-text text-transparent mb-2">
            Finaliser votre commande
          </h1>
          <p className="text-gray-600">
            Renseignez vos informations de livraison
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE GAUCHE - FORMULAIRE */}
          <div className="lg:col-span-2 space-y-6">
            {/* ÉTAPE 1 - Informations personnelles */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#c084fc] text-white flex items-center justify-center rounded-full font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Informations personnelles
                  </h2>
                  <p className="text-sm text-gray-500">
                    Vos coordonnées pour la livraison
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="absolute left-3 top-9 w-4 h-4 text-[#8352a5]" />
                  <InputA
                    label="Nom"
                    value={form.nom}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, nom: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-9 w-4 h-4 text-purple-500" />
                  <InputA
                    label="Prénom"
                    value={form.prenom}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, prenom: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-9 w-4 h-4 text-purple-500" />
                  <InputA
                    label="Numéro de téléphone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-9 w-4 h-4 text-[#8352a5]" />
                  <InputA
                    label="Email (optionnel)"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-9 w-4 h-4 text-[#8352a5]" />
                  <InputA
                    label="Ville"
                    value={form.ville}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, ville: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>

                <SelectQuartier
                  value={form.quartier}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, quartier: value }))
                  }
                  error={error}
                />
              </div>
            </div>

            {/* ÉTAPE 2 - Mode de livraison */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#c084fc] text-white flex items-center justify-center rounded-full font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Mode de livraison
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choisissez comment recevoir votre commande
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <DeliveryOption
                  title="Livraison à domicile"
                  desc="Recevez votre commande chez vous"
                  price="+ 1 000 FCFA"
                  selected={deliveryType === "home"}
                  onSelect={() => setDeliveryType("home")}
                  icon={<Home className="w-5 h-5" />}
                />

                <DeliveryOption
                  title="Retrait en magasin"
                  desc="Venez récupérer votre commande"
                  price="Gratuit"
                  selected={deliveryType === "store"}
                  onSelect={() => setDeliveryType("store")}
                  icon={<Store className="w-5 h-5" />}
                />
              </div>
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="button"
                disabled={!isFormComplete}
                className={`px-8 py-4 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${
                  isFormComplete
                    ? "bg-gradient-to-r from-[#8352a5] to-[#c084fc] hover:from-[#7a4aa0] hover:to-[#b17bf2] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continuer vers le paiement
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* COLONNE DROITE - RÉCAPITULATIF */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#8352a5]/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#8352a5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#8352a5]">
                  Récapitulatif
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold text-gray-900">
                    {subtotal.toLocaleString()} FCFA
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span className="font-semibold text-gray-900">
                    {deliveryFee.toLocaleString()} FCFA
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#8352a5]">
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Informations de sécurité */}
              <div className="bg-[#8352a5]/10 rounded-xl p-4 border border-[#8352a5]/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#8352a5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#8352a5] mb-1">
                      Paiement sécurisé
                    </p>
                    <p className="text-xs text-[#8352a5]/70">
                      Vos informations sont protégées et cryptées
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center space-y-6 transform animate-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Commande enregistrée
              </h3>
              <p className="text-sm text-gray-600">
                Votre commande a été enregistrée avec succès. Vous allez être
                redirigé vers la page de confirmation.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              Redirection en cours...
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
