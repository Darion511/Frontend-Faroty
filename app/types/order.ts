export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  deliveryMethod: string;
  deliveryAddress: string;
  deliveryPrice: string;
  createdAt: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  orderItems: OrderItem[];
  payment: Payment[];
};
export type OrderStatus = "EN_ATTENTE" | "PAYE" | "LIVRE" | "ANNULE";

export type OrderItem = {
  id: string;
  productId: string;
  orderId: Order;
  productName: string;
  price: number;
  quantity: number;
};
export type Payment = {
  id: string;
  orderId: Order;
  paymentMethod: string;
  paymentStatus: string;
  amount: number;
  createdAt: string;
  response: string;
};
