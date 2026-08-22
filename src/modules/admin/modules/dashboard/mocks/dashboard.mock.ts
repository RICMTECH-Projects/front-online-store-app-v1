export type DashboardOrderRow = { order: string; customer: string; total: string; status: string };

export const DASHBOARD_ORDERS_ROWS: DashboardOrderRow[] = Array.from(
	{ length: 12 },
	(_, index) => ({ order: `ORD-${1020 + index}`, customer: `Cliente ${index + 1}`, total: `S/ ${(120 + index * 18).toFixed(2)}`, status: index % 2 ? 'En proceso' : 'Pendiente' }),
);
