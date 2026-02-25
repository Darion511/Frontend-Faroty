export type Product = {
  id: string;
  identifiant: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  marque: string;
  imageUrl: string;
  pending: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
};
export type ProductRequest = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  marque: string;
  imageUrl: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
};
