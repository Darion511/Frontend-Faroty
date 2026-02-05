"use client";

import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@faroty.com" && password === "123456") {
      router.push("/dashboard");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* PARTIE GAUCHE : FORMULAIRE */}
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#8352a5] flex items-center justify-center text-white font-bold">
              I
            </div>
            <span className="text-xl font-bold text-[#8352a5]">FarotyShop</span>
          </div>

          <h1 className="text-2xl font-bold mb-2">Heureux de vous revoir</h1>
          <p className="text-gray-500 mb-6">Veuillez entrer vos coordonnées</p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#8352a5] outline-none"
              />
            </div>
          </div>

          {/* MOT DE PASSE */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-[#8352a5] outline-none"
              />
            </div>
          </div>

          {/* OPTIONS */}

          {/* BOUTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#8352a5] text-white py-3 rounded-lg font-semibold hover:bg-[#6a4285] transition"
          >
            Connexion
          </button>
        </div>

        {/* PARTIE DROITE : IMAGE */}
        <div className="hidden md:block">
          <Image
            src="/19199348 1.png"
            alt="Login illustration"
            width={600}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
