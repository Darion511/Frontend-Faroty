import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  CreditCard,
  Truck,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../ui/Button";
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#8352a5] text-white flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/20">
        <div className="w-10 h-10 bg-white text-[#8352a5] rounded-full flex items-center justify-center font-bold">
          <Image
            src="/images.jpg"
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />
        </div>
        <span className="text-xl font-bold">IFaShop</span>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/dashboard">
          <MenuItem
            icon={<LayoutDashboard size={20} />}
            label="Tableau de bord"
          />
        </Link>
        <Link href="/produitA">
          <MenuItem icon={<Package size={20} />} label="Produits" />
        </Link>
        <MenuItem icon={<Layers size={20} />} label="Catégories" />
        <MenuItem icon={<ShoppingCart size={20} />} label="Commandes" />
        <MenuItem icon={<CreditCard size={20} />} label="Paiements" />
        <MenuItem icon={<Truck size={20} />} label="Livraisons" />
        <MenuItem icon={<Settings size={20} />} label="Paramètres" />
      </nav>

      {/* LOGOUT */}
      <div className="px-4 py-4 border-t border-white/20">
        <LogoutButton />
      </div>
    </aside>
  );
}

/* ITEM REUTILISABLE */
function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-white/20 transition">
      {icon}
      <span>{label}</span>
    </button>
  );
}
