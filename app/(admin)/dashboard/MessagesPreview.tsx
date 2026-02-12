import { MessageCircle, ArrowRight, Clock } from "lucide-react";

export default function MessagesPreview() {
  const messages = [
    {
      id: 1,
      name: "Marie Kouam",
      message: "Bonjour, est-ce que le T-shirt est disponible en taille L ?",
      time: "Il y a 15 min",
      unread: true,
      avatar: "MK",
    },
    {
      id: 2,
      name: "Thomas Nana",
      message: "Merci pour la livraison rapide !",
      time: "Il y a 1h",
      unread: true,
      avatar: "TN",
    },
    {
      id: 3,
      name: "Sophie Bella",
      message: "Je voudrais commander 3 casquettes, c'est possible ?",
      time: "Il y a 3h",
      unread: false,
      avatar: "SB",
    },
    {
      id: 4,
      name: "Eric Fotso",
      message: "Quand est-ce que vous aurez de nouveaux modèles ?",
      time: "Il y a 5h",
      unread: false,
      avatar: "EF",
    },
  ];

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center relative">
            <MessageCircle className="w-5 h-5 text-green-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Messages clients
            </h2>
            <p className="text-sm text-gray-500">
              {unreadCount} nouveau{unreadCount > 1 ? "x" : ""} message
              {unreadCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-semibold text-sm">
          Voir tout
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer border ${
              msg.unread
                ? "bg-green-50 border-green-200 hover:bg-green-100"
                : "bg-white border-gray-100 hover:bg-gray-50"
            }`}
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {msg.avatar}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3
                  className={`font-semibold ${
                    msg.unread ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {msg.name}
                </h3>
                {msg.unread && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </div>
              <p
                className={`text-sm truncate ${
                  msg.unread ? "text-gray-700 font-medium" : "text-gray-500"
                }`}
              >
                {msg.message}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Répondre aux messages non lus
        </button>
      </div>
    </div>
  );
}
