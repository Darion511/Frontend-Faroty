import Image from "next/image";
import { Trash2 } from "lucide-react";
export default function CartItem() {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
      {/* IMAGE */}
      <Image
        src="/Encre.jpg"
        alt="Produit"
        width={70}
        height={70}
        className="rounded-lg"
      />

      {/* INFOS */}
      <div className="flex-1">
        <p className="text-sm font-medium text-[#8352a5]">
          Lot de 05 cartouches encre imprimante Epson XP-235
        </p>
        <p className="text-xs text-gray-400">Couleur</p>
        <p className="font-semibold text-sm mt-1">1300 FCFA</p>
      </div>

      {/* QUANTITÉ */}
      <div className="flex items-center gap-2">
        <button className="w-7 h-7 border rounded">-</button>
        <span className="text-sm">1</span>
        <button className="w-7 h-7 border rounded">+</button>
      </div>

      {/* SUPPRIMER */}
      <Trash2 size={18} className="text-red-500 cursor-pointer" />
    </div>
  );
}
