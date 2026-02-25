"use client";

import { getAllMessage } from "@/app/services/messageService";
import { Message } from "@/app/types/message";
import {
  MessageCircle,
  ArrowRight,
  Mail,
  User,
  Clock,
  CheckCircle2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MessagesPreview() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllMessage();

        // Prendre les 5 messages les plus récents
        const recentMessages = Array.isArray(data) ? data.slice(0, 5) : [];

        setMessages(recentMessages);
      } catch (err) {
        console.error("Erreur chargement messages:", err);
        setError("Impossible de charger les messages");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Fonction pour formater la date relative
  const getRelativeTime = (dateString?: string) => {
    if (!dateString) return "Récent";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / 60000);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInMinutes < 1) return "À l'instant";
      if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
      if (diffInHours < 24) return `Il y a ${diffInHours}h`;
      if (diffInDays < 7) return `Il y a ${diffInDays}j`;

      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      });
    } catch {
      return "Récent";
    }
  };

  // Fonction pour obtenir les initiales
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Couleurs aléatoires pour les avatars
  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Chargement des messages...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-red-600 hover:text-red-700 font-medium underline"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5 border-b border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Messages clients
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-600">
                    {messages.length} message{messages.length !== 1 ? "s" : ""}{" "}
                    récent{messages.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <button
            onClick={() => router.push("/admin/messages")}
            className="flex items-center gap-2 px-4 py-2.5 text-green-600 hover:text-white hover:bg-green-600 rounded-xl transition-all font-semibold text-sm border-2 border-green-200 hover:border-green-600"
          >
            Voir tout
            <ArrowRight className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Messages List */}
      <div className="p-6">
        {messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className="group relative flex items-start gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all cursor-pointer"
                onClick={() => router.push(`/admin/messages/${msg.id}`)}
              >
                {/* Avatar avec gradient */}
                <div
                  className={`w-12 h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg ring-4 ring-white`}
                >
                  {getInitials(msg.name)}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {msg.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <p className="text-sm text-gray-600 font-medium">
                      {msg.email}
                    </p>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                    {msg.content}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold text-lg mb-1">
              Aucun message
            </p>
            <p className="text-gray-500 text-sm">
              Les messages de vos clients apparaîtront ici
            </p>
          </div>
        )}
      </div>

      {/* Footer avec bouton */}
    </div>
  );
}
