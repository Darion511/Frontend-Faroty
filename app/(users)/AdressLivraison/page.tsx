"use client";

import { useEffect, useState } from "react";
import InputA from "../components/ui/InputA";
import SelectQuartier from "../components/ui/SelectQuartier";
import DeliveryOption from "../components/ui/Option";
import Link from "next/link";
import { getTotal } from "../components/lib/cart";
import { toast } from "sonner";

type DeliveryType = "home" | "store";

export default function AdresseLivraison() {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const [quartier, setQuartier] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!quartier) {
      setError("Veuillez sélectionner un quartier");
      return;
    }

    setError("");

    localStorage.setItem("adresseLivraison", JSON.stringify({ quartier }));

    toast.success("Adresse enregistrée avec succès");
  };
  // 🔹 Charger le total depuis le localStorage (client only)
  useEffect(() => {
    const loadTotal = async () => {
      const total = await getTotal();
      setSubtotal(total);
    };

    loadTotal();
  }, []);

  // 🔹 Adapter les frais selon le mode de livraison
  useEffect(() => {
    const fee = async () => {
      if (deliveryType === "home") {
        setDeliveryFee(2000);
      } else if (deliveryType === "store") {
        setDeliveryFee(0);
      }
    };

    fee();
  }, [deliveryType]);

  const total = subtotal + deliveryFee;

  return (
    <section className="max-w-7xl mt-10 font-nexa font-light mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* COLONNE GAUCHE */}
      <form className="lg:col-span-2 space-y-8">
        {/* ÉTAPE 1 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <span className="bg-[#8352a5] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              1
            </span>
            Adresse de livraison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputA label="Nom" />
            <InputA label="Prénom" />
            <InputA label="Numéro de téléphone" />
            <InputA label="Adresse électronique (facultatif)" />
            <InputA label="Ville" />
            <SelectQuartier
              value={quartier}
              onChange={setQuartier}
              error={error}
            />
          </div>
        </div>

        {/* ÉTAPE 2 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <span className="bg-[#8352a5] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
              2
            </span>
            Mode de livraison
          </h2>

          <div className="space-y-4">
            <DeliveryOption
              title="Livraison à domicile"
              desc="Recevez votre commande chez vous"
              price="+ 2 000 FCFA"
              selected={deliveryType === "home"}
              onSelect={() => setDeliveryType("home")}
            />

            <DeliveryOption
              title="Retrait en magasin"
              desc="Venez récupérer votre commande"
              price="+ 0 FCFA"
              selected={deliveryType === "store"}
              onSelect={() => setDeliveryType("store")}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Link href="/message">
              <button
                onClick={handleSubmit}
                type="button"
                disabled={!deliveryType}
                className={`px-6 py-2 rounded-lg transition text-white ${
                  deliveryType
                    ? "bg-[#8352a5] hover:bg-[#6b428a]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continuer vers le paiement
              </button>
            </Link>
          </div>
        </div>
      </form>

      {/* COLONNE DROITE – DÉTAIL PANIER */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4 h-fit">
        <h3 className="font-semibold text-lg text-[#8352a5]">
          Détail du Panier
        </h3>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString()} FCFA</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Frais de livraison</span>
          <span>{deliveryFee.toLocaleString()} FCFA</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-gray-900">
          <span>Total général</span>
          <span>{total.toLocaleString()} FCFA</span>
        </div>
      </div>
    </section>
  );
}
