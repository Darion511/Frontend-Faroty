"use client";

import {
  ShoppingCart,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Order } from "@/app/types/order";
import Link from "next/link";

export default function OrdersPreview({
  orders,
  loading,
  error,
}: {
  orders: Order[];
  loading: boolean;
  error: string | null;
}) {
  const router = useRouter();

  // Fonction pour formater le statut
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "EN_ATTENTE":
        return {
          label: "En attente",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          icon: Clock,
        };
      case "LIVRE":
        return {
          label: "Livré",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          icon: Package,
        };
      case "ANNULE":
        return {
          label: "Annulé",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          icon: XCircle,
        };
      default:
        return {
          label: status,
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
          icon: Clock,
        };
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `Il y a ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours}h`;
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  // Calculer le total du jour
  // const getTodayTotal = () => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   return orders
  //     .filter((order) => {
  //       const orderDate = new Date(order.createdAt);
  //       orderDate.setHours(0, 0, 0, 0);
  //       return (
  //         orderDate.getTime() === today.getTime() && order.status === "PAYE"
  //       );
  //     })
  //     .reduce((sum, order) => sum + order.totalAmount, 0);
  // };

  // État de chargement
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Commandes récentes
            </h2>
            <p className="text-sm text-gray-500">
              {orders.length} dernière{orders.length > 1 ? "s" : ""} transaction
              {orders.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Link
          href="/commande"
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold text-sm"
        >
          Voir tout
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all cursor-pointer border border-gray-100 group"
              >
                {/* Status Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${statusInfo.iconBg} ${statusInfo.iconColor}`}
                >
                  <StatusIcon className="w-5 h-5" />
                </div>

                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      #{order.id.slice(0, 8)}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.textColor}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {order.firstName} {order.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.orderItems?.length || 0} article
                    {order.orderItems?.length > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Amount & Time */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {order.totalAmount.toLocaleString()} FCFA
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-semibold mb-1">
            Aucune commande récente
          </p>
          <p className="text-sm text-gray-500">
            Les nouvelles commandes apparaîtront ici
          </p>
        </div>
      )}

      {/* Summary */}
    </div>
  );
}
