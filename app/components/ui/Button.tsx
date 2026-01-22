import { ShoppingCart } from "lucide-react";
export default function Button() {
  return (
    <button className=" flex items-center justify-center w-full  bg-[#8352a5] text-white px-4 py-2 rounded-xl hover:bg-[#6b428a] transition">
      <ShoppingCart size={22} className="text-white mr-1" />
      Ajouter au Panier
    </button>
  );
}
