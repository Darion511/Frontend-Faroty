"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapPin, Phone, Mail, User, ChevronRight } from "lucide-react";
import InputA from "../components/ui/InputA";
import SelectQuartier from "../components/ui/SelectQuartier";
import DeliveryOption from "../components/ui/Option";
import { getTotal, getCart } from "../components/lib/cart";
import { createOrder } from "@/app/services/orderService";
import { Order, OrderItem } from "@/app/types/order";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger le total depuis le localStorage
  useEffect(() => {
    const loadTotal = async () => {
      try {
        const total = await getTotal();
        setSubtotal(total);
      } catch (error) {
        console.error("Erreur lors du chargement du total:", error);
        toast.error("Erreur lors du chargement du panier");
      }
    };

    loadTotal();
  }, []);

  // Adapter les frais selon le mode de livraison
  useEffect(() => {
    if (deliveryType === "home") {
      setDeliveryFee(1000);
    } else if (deliveryType === "store") {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(0);
    }
  }, [deliveryType]);

  const handleSubmit = async () => {
    // Validation des champs
    if (!form.nom.trim()) {
      setError("Le nom est requis");
      toast.error("Le nom est requis");
      return;
    }

    if (!form.prenom.trim()) {
      setError("Le prénom est requis");
      toast.error("Le prénom est requis");
      return;
    }

    if (!form.phone.trim()) {
      setError("Le numéro de téléphone est requis");
      toast.error("Le numéro de téléphone est requis");
      return;
    }
    if (!form.email.trim()) {
      setError("L'email est requis");
      toast.error("L'email est requis");
      return;
    }

    // Validation du numéro de téléphone (format camerounais)
    const phoneRegex = /^[6][0-9]{8}$/;
    if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
      setError("Numéro de téléphone invalide (ex: 6XXXXXXXX)");
      toast.error("Numéro de téléphone invalide");
      return;
    }

    if (!form.ville.trim()) {
      setError("La ville est requise");
      toast.error("La ville est requise");
      return;
    }

    if (!form.quartier) {
      setError("Veuillez sélectionner un quartier");
      toast.error("Veuillez sélectionner un quartier");
      return;
    }

    if (!deliveryType) {
      setError("Veuillez choisir un mode de livraison");
      toast.error("Veuillez choisir un mode de livraison");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Récupérer les articles du panier
      const cartItems = await getCart();

      if (!cartItems || cartItems.length === 0) {
        toast.error("Votre panier est vide");
        setIsSubmitting(false);
        router.push("/cart");
        return;
      }

      // Générer un ID temporaire pour l'utilisateur (à remplacer par l'authentification réelle)
      const userId = localStorage.getItem("userId") || `user-${Date.now()}`;
      if (!localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }

      // Préparer les OrderItems
      const orderItems: OrderItem[] = cartItems.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        productId: item.product.id || `prod-${index}`,
        orderId: {} as Order, // Sera rempli par le backend
        productName: item.product.name || "Produit sans nom",
        price: item.product.price || 0,
        quantity: item.quantity || 1,
      }));

      // Calculer le montant total
      const totalAmount = subtotal + deliveryFee;

      // Créer l'objet Order selon le type défini
      const order: Partial<Order> = {
        id: "", // Sera généré par le backend
        userId: userId,
        totalAmount: totalAmount,
        status: "EN_ATTENTE",
        deliveryMethod: deliveryType === "home" ? "DOMICILE" : " MAGASIN",
        deliveryAddress: `${form.quartier}, ${form.ville}`,
        deliveryPrice: deliveryFee.toString(),
        createdAt: new Date().toISOString(),
        phone: form.phone,
        firstName: form.prenom,
        lastName: form.nom,
        email: form.email,
        orderItems: orderItems,
      };

      console.log("Envoi de la commande:", order);

      // Envoyer la commande au backend
      const createdOrder = await createOrder(order);

      console.log("Commande créée:", createdOrder);

      // Sauvegarder les informations dans localStorage pour la page de confirmation
      const orderData = {
        id: createdOrder.id,
        orderNumber: createdOrder.id,
        firstName: form.nom,
        lastName: form.prenom,
        phone: form.phone,
        email: form.email,
        ville: form.ville,
        quartier: form.quartier,
        deliveryType,
        deliveryMethod: order.deliveryMethod,
        deliveryAddress: order.deliveryAddress,
        deliveryPrice: deliveryFee,
        subtotal,
        totalAmount: totalAmount,
        status: "EN_ATTENTE",
        createdAt: createdOrder.createdAt,
        orderDateFormatted: new Date(createdOrder.createdAt).toLocaleString(
          "fr-FR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        ),
        items: cartItems,
        orderItems: createdOrder.orderItems,
      };

      localStorage.setItem("orderData", JSON.stringify(orderData));
      localStorage.setItem("currentOrderId", createdOrder.id);

      // Vider le panier après la création de la commande
      // localStorage.removeItem("cart");

      toast.success("Commande créée avec succès");
      setShowConfirmation(true);

      // Redirection après 2 secondes
      setTimeout(() => {
        router.push(`/message?orderId=${encodeURIComponent(createdOrder.id)}`);
      }, 2000);
    } catch (error: any) {
      console.error("Erreur lors de la création de la commande:", error);

      // Messages d'erreur plus détaillés
      if (error.message?.includes("fetch")) {
        toast.error(
          "Impossible de contacter le serveur. Vérifiez votre connexion.",
        );
      } else if (error.message?.includes("400")) {
        toast.error("Données invalides. Vérifiez vos informations.");
      } else if (error.message?.includes("500")) {
        toast.error("Erreur serveur. Réessayez plus tard.");
      } else {
        toast.error(
          error.message || "Erreur lors de la création de la commande",
        );
      }

      setIsSubmitting(false);
    }
  };

  const total = subtotal + deliveryFee;

  const isFormComplete =
    !!form.nom.trim() &&
    !!form.prenom.trim() &&
    !!form.phone.trim() &&
    !!form.email.trim() &&
    !!form.ville.trim() &&
    !!form.quartier &&
    !!deliveryType;

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
                  <User className="absolute left-3 top-9 w-4 h-4 text-[#8352a5] pointer-events-none z-10" />
                  <InputA
                    label="Nom"
                    value={form.nom}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, nom: e.target.value }))
                    }
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-9 w-4 h-4 text-purple-500 pointer-events-none z-10" />
                  <InputA
                    label="Prénom"
                    value={form.prenom}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, prenom: e.target.value }))
                    }
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-9 w-4 h-4 text-purple-500 pointer-events-none z-10" />
                  <InputA
                    label="Numéro de téléphone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    // placeholder="6XXXXXXXX"
                    // required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-9 w-4 h-4 text-[#8352a5] pointer-events-none z-10" />
                  <InputA
                    label="Email (optionnel)"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-9 w-4 h-4 text-[#8352a5] pointer-events-none z-10" />
                  <InputA
                    label="Ville"
                    value={form.ville}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, ville: e.target.value }))
                    }
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

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
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
                />

                <DeliveryOption
                  title="Retrait en magasin"
                  desc="Venez récupérer votre commande"
                  price="Gratuit"
                  selected={deliveryType === "store"}
                  onSelect={() => setDeliveryType("store")}
                />
              </div>
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="button"
                disabled={!isFormComplete || isSubmitting}
                className={`px-8 py-4 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${
                  isFormComplete && !isSubmitting
                    ? "bg-gradient-to-r from-[#8352a5] to-[#c084fc] hover:from-[#7a4aa0] hover:to-[#b17bf2] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
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
                    Création de la commande...
                  </>
                ) : (
                  <>
                    Continuer vers le paiement
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
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
                    {deliveryFee > 0 ? (
                      `${deliveryFee.toLocaleString()} FCFA`
                    ) : (
                      <span className="text-green-600 font-bold">Gratuit</span>
                    )}
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

              {/* Mode de livraison sélectionné */}
              {deliveryType && (
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {deliveryType === "home" ? (
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
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      ) : (
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-900 mb-1">
                        {deliveryType === "home"
                          ? "Livraison à domicile"
                          : "Retrait en magasin"}
                      </p>
                      <p className="text-xs text-purple-700">
                        {deliveryType === "home"
                          ? "Livraison sous 2-3 jours ouvrés"
                          : "Disponible dès demain"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center space-y-6 animate-in fade-in zoom-in duration-300">
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
                Commande créée !
              </h3>
              <p className="text-sm text-gray-600">
                Votre commande a bien été enregistrée. Veuillez vérifier votre
                boîte mail
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
