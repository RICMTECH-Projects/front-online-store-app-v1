import { createMockRows } from '../../mocks.utils';
export type FulfillmentRow = { id: string; pedido: string; vendedor: string; cliente: string; estado: string };
export const FULFILLMENTS_ROWS = createMockRows<FulfillmentRow>('f', Array.from({ length: 12 }, (_, i) => [`ORD-${1000 + i}`, `Tienda ${i + 1}`, `Cliente ${i + 1}`, i % 2 ? 'En proceso' : 'Pendiente']), ['pedido', 'vendedor', 'cliente', 'estado']);
