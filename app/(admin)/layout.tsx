// app/layout.tsx
import type { Metadata } from "next";

import "../globals.css";



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

          {/* Vous pouvez ajouter un Footer ici */}
        </div>
      </body>
    </html>
  );
}
