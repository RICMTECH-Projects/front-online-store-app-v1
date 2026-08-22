import { createMockRows } from '../../mocks.utils';
export type ShipmentRow = { id: string; pedido: string; transportista: string; tracking: string; estado: string };
export const SHIPMENTS_ROWS = createMockRows<ShipmentRow>('e', Array.from({ length: 12 }, (_, i) => [`ORD-${2000 + i}`, i % 2 ? 'Olva' : 'Shalom', `TRK-${3000 + i}`, 'En transito']), ['pedido', 'transportista', 'tracking', 'estado']);
