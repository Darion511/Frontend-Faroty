"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 1️⃣ Supprimer les infos utilisateur
    localStorage.removeItem("user"); // ou "token" selon ton cas

    // 2️⃣ Redirection vers la page login
    router.push("/login");
  };

  return (
    <div className="px-4 py-4 border-t border-white/20">
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg 
                   text-white hover:bg-white/20 transition-colors duration-200"
      >
        <LogOut size={20} />
        <span className="font-medium">Déconnexion</span>
      </button>
    </div>
  );
}
