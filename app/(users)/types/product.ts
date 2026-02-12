// export type Product = {
//   id: number;
//   name: string;
//   category: string;
//   brand: string;
//   price: number;
//   stock: number;
//   image?: string;
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
  image: string;
  createdAt: string;
  updatedAt: string;
};
