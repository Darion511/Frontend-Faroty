"use client";

import { useState } from "react";

import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";

export default function AdminShell({
  children,
  contentClassName,
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar desktop */}
      <div className="hidden md:block fixed inset-y-0 left-0 w-64 z-40">
        <Sidebar />
      </div>

      {/* Sidebar mobile (off-canvas) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Topbar */}
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Content */}
      <div className="md:ml-64">
        <main className={`pt-20 ${contentClassName ?? ""}`}>{children}</main>
      </div>
    </div>
  );
}

