import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import LangSelect from "../Langue/page";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-5 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images.jpg"
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />
          <span className="text-[#8352a5] font-bold text-2xl">FarotyShop</span>
        </div>

        <div className="flex items-center gap-6">
          <LangSelect />

          <nav className="hidden md:flex gap-8 text-[#8352a5]font-medium">
            <a className="hover:text-purple-800 transition">Accueil</a>
            <a className="hover:text-purple-800 transition">Produits</a>
            <a className="hover:text-purple-800 transition">Contact</a>
          </nav>

          <button className="relative p-2 rounded-full bg-[#8352a5] hover:bg-purple-700 transition">
            <ShoppingCart size={22} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
