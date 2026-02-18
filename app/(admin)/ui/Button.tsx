"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "../../services/authService";

type Props = {
  className?: string;
  showText?: boolean;
};

export default function LogoutButton({ showText = true }: Props) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="px-4 py-4 border-t border-white/20">
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg 
       text-white hover:bg-white/20 transition-colors duration-200"
      >
        <LogOut className="w-5 h-5" />
        {showText && (
          <span>{isLoggingOut ? "Déconnexion..." : "Déconnexion"}</span>
        )}
      </button>
    </div>
  );
}
// "use client";

// import { LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { logout } from "@/app/service/authService";

// export default function LogoutButton() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout();
//     router.push("/login");
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
//     >
//       <LogOut size={16} />
//       Déconnexion
//     </button>
//   );
// }
