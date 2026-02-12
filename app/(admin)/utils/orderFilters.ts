import { Order } from "../types/Order";

export type FilterType = "jour" | "semaine" | "mois";

/**
 * Filtre les commandes par période (jour, semaine, mois)
 */
export function filterOrdersByDate(
  orders: Order[],
  filter: FilterType,
): Order[] {
  const now = new Date();

  return orders.filter((cmd) => {
    const cmdDate = new Date(cmd.date);

    if (filter === "jour") {
      return (
        cmdDate.getDate() === now.getDate() &&
        cmdDate.getMonth() === now.getMonth() &&
        cmdDate.getFullYear() === now.getFullYear()
      );
    }

    if (filter === "semaine") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return cmdDate >= startOfWeek && cmdDate <= endOfWeek;
    }

    if (filter === "mois") {
      return (
        cmdDate.getMonth() === now.getMonth() &&
        cmdDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });
}

/**
 * Recherche dans les commandes par produit ou client
 */
export function searchOrders(orders: Order[], searchTerm: string): Order[] {
  if (!searchTerm.trim()) return orders;

  const term = searchTerm.toLowerCase();
  return orders.filter(
    (cmd) =>
      cmd.produit.toLowerCase().includes(term) ||
      cmd.client.toLowerCase().includes(term),
  );
}
