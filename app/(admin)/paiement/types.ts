export type StatutPaiement = "En attente" | "Validé" | "Échoué" | "Remboursé";
export type MethodePaiement =
  | "Mobile Money"
  | "Orange Money"
  | "Carte bancaire"
  | "Espèces"
  | "paypal";

export type Paiement = {
  id: number;
  numeroTransaction: string;
  commande: {
    id: number;
    numero: string;
  };
  client: {
    nom: string;
    email: string;
    telephone: string;
  };
  montant: number;
  methode: MethodePaiement;
  statut: StatutPaiement;
  date: Date;
  reference?: string;
  notes?: string;
};

export type StatsPaiement = {
  totalPaiements: number;
  montantTotal: number;
  enAttente: number;
  valides: number;
  echoues: number;
  rembourses: number;
};
