"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import LangSelect from "../Langue/page";
import CartButton from "../ui/Compteur";

export default function Header() {
  const pathname = usePathname();

  // Sur la page d'accueil: navbar transparente qui change au scroll.
  // Sur les autres pages: toujours fond blanc (scrolled = true).
  const isHome = pathname === "/";
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const baseTextColor = scrolled ? "text-[#8352a5]" : "text-white";
  const underlineColor = scrolled ? "bg-[#8352a5]" : "bg-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/images.jpg"
            alt="logo"
            width={45}
            height={45}
            className="rounded-full"
          />
          <span
            className={`${baseTextColor} font-nexa font-light text-2xl transition-colors`}
          >
            IFaShop
          </span>
        </div>

        {/* DROITE */}
        <div className="flex items-center gap-4">
          {/* Langue */}
          {/* <div className="hidden sm:block">
            <LangSelect />
          </div> */}

          {/* NAV DESKTOP */}
          <nav
            className={`hidden md:flex font-nexa font-light gap-8 ${baseTextColor}`}
          >
            {[
              { href: "/", label: "Accueil" },
              { href: "/produits", label: "Produits" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center"
              >
                <span className="transition-colors group-hover:opacity-80">
                  {item.label}
                </span>
                <span
                  className={`h-0.5 w-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${underlineColor}`}
                />
              </Link>
            ))}
          </nav>

          {/* Panier (desktop) */}
          <div className="hidden md:block">
            <CartButton />
          </div>

          {/* BURGER MOBILE */}
          <button
            type="button"
            onClick={() => setBurgerOpen((prev) => !prev)}
            className="md:hidden p-1"
            aria-label="Menu"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke={scrolled ? "#8352a5" : "#FFFFFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke={scrolled ? "#8352a5" : "#FFFFFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke={scrolled ? "#8352a5" : "#FFFFFF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE OVERLAY */}
      {burgerOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <Image
                src="/images.jpg"
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-[#8352a5] font-nexa text-xl">IFaShop</span>
            </div>

            <button
              type="button"
              onClick={() => setBurgerOpen(false)}
              aria-label="Fermer le menu"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>

          <div className="px-6 py-6 space-y-6">
            <LangSelect />

            <nav className="space-y-4 text-[#8352a5]">
              <Link href="/" onClick={() => setBurgerOpen(false)}>
                <div className="py-3 border-b border-gray-100">Accueil</div>
              </Link>
              <Link href="/produits" onClick={() => setBurgerOpen(false)}>
                <div className="py-3 border-b border-gray-100">Produits</div>
              </Link>
              <Link href="/contact" onClick={() => setBurgerOpen(false)}>
                <div className="py-3 border-b border-gray-100">Contact</div>
              </Link>
            </nav>

            <div className="pt-4 border-t border-gray-100">
              <CartButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
