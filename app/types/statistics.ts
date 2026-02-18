export type statistics = {
  summary: summary;
  byPeriod: byPeriod[];
};

export type summary = {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
};

export type byPeriod = {
  periodLabel: string;
  periodStart: string;
  periodEnd: string;
  orderCount: number;
  deliveredCount: number;
  revenue: number;
};
