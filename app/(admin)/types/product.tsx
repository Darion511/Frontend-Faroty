// export type Product = {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   stock: number;
//   status: "Disponible" | "Indisponible";
// };
export type ProductImage = {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  productId: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  identifiant: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: Category;
  productImages: ProductImage[];
  createdAt: string;
  updatedAt: string;
  stock: number;
  status: "Disponible" | "Indisponible";
};
