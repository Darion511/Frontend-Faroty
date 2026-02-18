export type Product = {
  id: string;
  identifiant: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  marque: string;
  imageUrl: string;
  categoryId: Category;
  productImages: ProductImages;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
};

export type ProductImages = [
  {
    id: string;
    imageUrl: string;
    isPrimary: boolean;
    productId: string;
  },
];
