"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useEffect, useState } from "react";

export default function CartButton() {
  const cartAmount = useCartStore((state) => state.cartAmount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // HTML serveur + 1er render client IDENTIQUES
    return (
      <Link href="/panier">
        <button className="relative p-2 rounded-full bg-[#8352a5]">
          <ShoppingCart size={22} className="text-white" />
        </button>
      </Link>
    );
  }
  return (
    <Link href="/panier">
      <button className="relative p-2 rounded-full bg-[#8352a5] hover:bg-purple-700 transition">
        <ShoppingCart size={22} className="text-white" />

        {cartAmount > 0 && (
          <span className="absolute -top-1 -right-1  px-1 bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center rounded-full">
            {cartAmount}
          </span>
        )}
      </button>
    </Link>
  );
}
// "use client";

// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// import { useEffect, useState } from "react";
// import { getCartAmount } from "../lib/cart";

// export default function CartButton() {
//   const [mounted, setMounted] = useState(false);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setMounted(true);
//     setCount(getCartAmount());
//   }, []);

//   if (!mounted) {
//     // HTML serveur + 1er render client IDENTIQUES
//     return (
//       <Link href="/panier">
//         <button className="relative p-2 rounded-full bg-[#8352a5]">
//           <ShoppingCart size={22} className="text-white" />
//         </button>
//       </Link>
//     );
//   }

//   return (
//     <Link href="/panier">
//       <button className="relative p-2 rounded-full bg-[#8352a5] hover:bg-purple-700 transition">
//         <ShoppingCart size={22} className="text-white" />

//         {count > 0 && (
//           <span className="absolute -top-1 -right-1  px-1 bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center rounded-full">
//             {count}
//           </span>
//         )}
//       </button>
//     </Link>
//   );
// }
