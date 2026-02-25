// app/layout.tsx
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "../../globals.css";

import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IFaShop - Votre boutique en ligne",
  description: "Achetez en ligne, payer comme vous voulez, livrés chez vous",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`font-nexa`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Toaster position="top-right" richColors />

          {/* Vous pouvez ajouter un Footer ici */}
        </div>
      </body>
    </html>
  );
}
