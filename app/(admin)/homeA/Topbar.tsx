"use client";

import { Bell, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <h1 className="font-semibold text-gray-700">Espace Administrateur</h1>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* Profil */}
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={28} />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
