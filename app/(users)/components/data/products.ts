// data/products.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Cartouche HP 305",
    category: "Encres & Toners",
    brand: "HP",
    price: 12000,
    image: "/image 55.png",
  },
  {
    id: 2,
    name: "Cartouche Canon XL",
    category: "Encres & Toners",
    brand: "Canon",
    price: 15000,
    image: "/Encre.jpg",
  },
  {
    id: 3,
    name: "Imprimante Epson L3250",
    category: "Imprimantes",
    brand: "Epson",
    price: 185000,
    image: "/image 55.png",
  },
  {
    id: 4,
    name: "Imprimante Epson L3250",
    category: "Imprimantes",
    brand: "Epson",
    price: 185000,
    image: "/image 55.png",
  },
  {
    id: 5,
    name: "Cartouche Canon XL",
    category: "Encres & Toners",
    brand: "Canon",
    price: 15000,
    image: "/Encre.jpg",
  },
  {
    id: 6,
    name: "Cartouche Canon XL",
    category: "Encres & Toners",
    brand: "Canon",
    price: 15000,
    image: "/Encre.jpg",
  },
];
