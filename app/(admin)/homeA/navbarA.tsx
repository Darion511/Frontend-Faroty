// Sidebar.tsx
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  CreditCard,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../ui/Button";

export default function Sidebar() {
  return (
    <aside className="h-screen w-2/10 bg-gradient-to-b from-[#8352a5] to-[#6b3d8f] text-white flex flex-col shadow-2xl z-30 hidden md:flex">
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
          <Image
            src="/images.jpg"
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />
        </div>
        <span className="text-xl font-bold tracking-wide">IFaShop</span>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <Link href="/dashboard">
          <MenuItem
            icon={<LayoutDashboard size={20} />}
            label="Tableau de bord"
          />
        </Link>
        <Link href="/produitA">
          <MenuItem icon={<Package size={20} />} label="Produits" />
        </Link>
        <Link href="/categorie">
          <MenuItem icon={<Layers size={20} />} label="Catégories" />
        </Link>
        <Link href="/commande">
          <MenuItem icon={<ShoppingCart size={20} />} label="Commandes" />
        </Link>
        <Link href="/paiement">
          <MenuItem icon={<CreditCard size={20} />} label="Paiements" />
        </Link>
      </nav>

      {/* LOGOUT */}
      <div className="px-4 py-6 border-t border-white/10">
        <LogoutButton />
      </div>
    </aside>
  );
}

/* ITEM REUTILISABLE */
function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/15 transition-all duration-200 hover:translate-x-1 active:scale-95 group">
      <span className="group-hover:scale-110 transition-transform duration-200">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
