import Image from "next/image";

import LangSelect from "../Langue/page";
import Link from "next/link";
import CartButton from "../ui/Compteur";
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-5 shadow bg-white ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images.jpg"
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />
          <span className="text-[#8352a5] font-nexa font-light text-2xl">
            IFaShop
          </span>
        </div>

        <div className="flex items-center gap-6">
          <LangSelect />

          <nav className="hidden md:flex font-nexa font-light gap-8 text-[#8352a5]font-medium">
            <Link href="/" className="hover:text-purple-800 transition">
              Accueil
            </Link>
            <Link href="/produits" className="hover:text-purple-800 transition">
              Produits
            </Link>
            <Link href="/contact" className="hover:text-purple-800 transition">
              Contact
            </Link>
          </nav>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
