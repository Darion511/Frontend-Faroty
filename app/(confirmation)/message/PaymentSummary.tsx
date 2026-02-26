"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Mail,
  CheckCircle,
  Package,
  Calendar,
  MapPinIcon,
  User,
  CreditCard,
} from "lucide-react";

import { Order, OrderItem, PaymentCash } from "@/app/types/order";
import { Payment } from "@/app/types/order";

import {
  createCashPayment,
  createPayment,
} from "@/app/services/paymentService";
import { getOrderById } from "@/app/services/orderService";

export default function PaymentSummary({
  orderId,
}: {
  orderId: string | null;
}) {
  const [orderData, setOrder] = useState<Order | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [paymentData, setPaymentData] = useState<Payment | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentError, setPaymentError] = useState("");

  const handlePaymentLigne = async () => {
    if (!orderData) return;

    setIsPaying(true);
    setPaymentError("");

    try {
      const orderPayload: string = orderData.id;

      const payment = await createPayment(orderPayload);

      setPaymentData(payment);
      // 🔥 REDIRECTION VERS LE LIEN DE PAIEMENT
      if (payment.paymentLink) {
        window.location.href = payment.paymentLink;
      } else {
        throw new Error("Lien de paiement introuvable");
      }
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Erreur lors du paiement",
      );
    } finally {
      setIsPaying(false);
    }
  };
  const handleCashPayment = async () => {
    if (!orderData) return;

    setIsPaying(true);
    setPaymentError("");

    try {
      const payment: PaymentCash = {
        orderId: orderData.id,
        paymentMethod: "CASH",
      };

      const paymentResponse = await createCashPayment(payment);

      setPaymentData(paymentResponse);

      // ✅ Paiement cash = pas de redirection externe
      // 👉 Redirection vers page succès / confirmation
      window.location.href = `/cash-success`;
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Erreur lors du paiement cash",
      );
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    const loadOrderData = async () => {
      if (!orderId) return;

      try {
        setLoading(true);

        // Charger le produit
        const orderData = await getOrderById(orderId);
        if (orderData && !Array.isArray(orderData)) {
          setOrder(orderData);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [orderId]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8352a5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des informations...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* ===== HEADER AVEC GRADIENT ===== */}
        <div className="bg-gradient-to-r from-[#8352a5] to-purple-800 rounded-t-2xl p-8 text-center shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
              <Image
                src="/image 67.png"
                alt="IFaShop"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">IFaShop</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/90">
            <CheckCircle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Confirmation de commande</h2>
          </div>
          <p className="text-white/80 text-sm mt-2">Merci pour votre achat</p>
        </div>

        {/* ===== CONTENU PRINCIPAL ===== */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8 space-y-6">
          {/* Message de bienvenue */}
          <div>
            <p className="text-gray-800 text-base mb-2">
              Bonjour{" "}
              <span className="font-semibold">
                {orderData.lastName} {orderData.firstName}
              </span>
              ,
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Votre commande a bien été enregistrée. Voici le récapitulatif et
              le lien pour effectuer le paiement.
            </p>
          </div>

          {/* ===== INFORMATIONS COMMANDE ===== */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 space-y-4 border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Numéro de commande */}
              <div>
                <p className="text-xs font-medium text-[#8352a5] uppercase tracking-wide mb-1">
                  N° commande
                </p>
                <p className="text-2xl font-bold text-[#8352a5]">
                  {orderData.id}
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs font-medium text-[#8352a5] uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Date
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  {orderData.createdAt}
                </p>
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="pt-4 border-t border-[#8352a5]/20">
              <p className="text-xs font-medium text-[#8352a5] uppercase tracking-wide mb-1 flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" />
                Adresse de livraison
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {orderData.deliveryAddress}
              </p>
            </div>

            {/* Mode de livraison */}
            <div className="pt-4 border-t border-[#8352a5]/20">
              <p className="text-xs font-medium text-[#8352a5] uppercase tracking-wide mb-1">
                Mode de livraison
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {orderData.deliveryMethod === "home"
                  ? "Livraison à domicile"
                  : "Retrait en magasin"}
              </p>
            </div>
          </div>

          {/* ===== ARTICLES COMMANDÉS ===== */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-5 py-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#8352a5]" />
              <h3 className="text-[#8352a5] font-bold">Articles commandés</h3>
            </div>

            {/* Table des produits */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Qté
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Prix unit.
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orderData.orderItems.map((item: OrderItem, index) => (
                    <tr
                      key={index}
                      className="hover:bg-purple-50/30 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {/* <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div> */}
                          <span className="font-medium text-gray-800 text-sm">
                            {item.productName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-gray-700 font-medium">
                        {item.quantity}
                      </td>
                      <td className="px-5 py-4 text-right text-sm text-gray-700">
                        {item.price.toLocaleString()} FCFA
                      </td>
                      <td className="px-5 py-4 text-right text-sm font-semibold text-[#8352a5]">
                        {(item.quantity * item.price).toLocaleString()} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total et sous-totaux */}
            <div className="bg-gray-50 px-5 py-4 space-y-2 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sous-total</span>
                <span className="font-medium">
                  {(
                    orderData.totalAmount - Number(orderData.deliveryPrice)
                  ).toLocaleString()}{" "}
                  FCFA
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span className="font-medium">
                  {orderData.deliveryPrice} FCFA
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#8352a5] pt-3 border-t border-gray-300">
                <span>Total</span>
                <span>{orderData.totalAmount.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          {/* ===== INFORMATIONS CLIENT ===== */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-5 py-3 flex items-center gap-2">
              <User className="w-5 h-5 text-[#8352a5]" />
              <h3 className="text-[#8352a5] font-bold">Vos informations</h3>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#8352a5]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Nom complet
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {orderData.lastName} {orderData.firstName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Téléphone</p>
                  <p className="text-gray-800 font-semibold">
                    {orderData.phone}
                  </p>
                </div>
              </div>

              {orderData.email && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-gray-800 font-semibold">
                      {orderData.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Ville</p>
                  <p className="text-gray-800 font-semibold">
                    {orderData.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== BOUTON PAIEMENT ===== */}
          <div className="pt-4 space-y-4">
            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                {paymentError}
              </div>
            )}
            <button
              onClick={handlePaymentLigne}
              disabled={isPaying}
              className="w-full bg-gradient-to-r from-[#8352a5] to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isPaying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Paiement en cours...
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Payer en ligne {orderData.totalAmount.toLocaleString()} FCFA
                </>
              )}
            </button>
            <button
              onClick={handleCashPayment}
              disabled={isPaying}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isPaying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Paiement en cours...
                </>
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  Payer en Cash {orderData.totalAmount.toLocaleString()} FCFA
                </>
              )}
            </button>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-green-600"
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
                  <p className="text-sm font-semibold text-green-800 mb-1">
                    Paiement 100% sécurisé
                  </p>
                  <p className="text-xs text-green-600">
                    Vos informations de paiement sont cryptées et protégées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            IFaShop — Confirmation de commande
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © 2025 IFaShop. Tous droits réservés.
          </p>
        </div>
      </div>
    </section>
  );
}
