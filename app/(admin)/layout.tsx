// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarotyShop - Votre boutique en ligne",
  description: "Achetez en ligne, payer comme vous voulez, livrés chez vous",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>

          {/* Vous pouvez ajouter un Footer ici */}
        </div>
      </body>
    </html>
  );
}
