export type Order = {
  id: number;
  produit: string;
  client: string;
  email: string;
  tel: string;
  quantite: number;
  statut: "paye" | "en attente";
  date: string; // ISO string
  image: string;
};
