"use client";

import { Bell, Menu, Settings, User } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-24 bg-white shadow-md flex items-center justify-between px-4 sm:px-6 w-full border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg border border-[#8352a5]/20 hover:bg-[#8352a5]/5 transition-all duration-200 active:scale-95"
          aria-label="Ouvrir le menu"
        >
          <Menu className="text-[#8352a5]" size={20} />
        </button>

        <h1 className="font-semibold text-lg text-gray-800">
          Espace Administrateur
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* NOTIFICATIONS */}
        <button className="relative p-2 rounded-lg border border-[#8352a5]/20 hover:bg-[#8352a5]/5 transition-all duration-200 active:scale-95 group">
          <Bell
            className="text-[#8352a5] group-hover:scale-110 transition-transform duration-200"
            size={20}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
            5
          </span>
        </button>

        {/* SETTINGS */}
        <button className="p-2 rounded-lg border border-[#8352a5]/20 hover:bg-[#8352a5]/5 transition-all duration-200 active:scale-95 group">
          <Settings
            className="text-[#8352a5] group-hover:rotate-90 transition-transform duration-300"
            size={20}
          />
        </button>

        {/* USER PROFILE */}
        <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-full flex items-center justify-center shadow-md ring-2 ring-[#8352a5]/20">
            <User size={18} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </header>
  );
}
// import { Bell, Search, Settings } from "lucide-react";

// export default function Topbar() {
//   return (
//     <header className="sticky top-0 z-10 bg-[#1A1F3A] border-b border-white/10 px-6 py-4 flex items-center justify-between">
//       <h1 className="text-2xl font-semibold">Dashboard</h1>

//       <div className="flex items-center gap-4">
//         {/* SEARCH */}
//         <div className="relative hidden md:block">
//           <Search className="absolute left-3 top-2.5 text-white/50" size={18} />
//           <input
//             type="text"
//             placeholder="Rechercher..."
//             className="pl-10 pr-4 py-2 rounded-xl bg-[#252B48] outline-none"
//           />
//         </div>

//         {/* ICONS */}
//         <button className="relative p-2 rounded-xl bg-[#252B48]">
//           <Bell />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
//             5
//           </span>
//         </button>

//         <button className="p-2 rounded-xl bg-[#252B48]">
//           <Settings />
//         </button>
//       </div>
//     </header>
//   );
// }
