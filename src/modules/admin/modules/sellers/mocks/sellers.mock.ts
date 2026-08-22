import { createMockRows } from '../../mocks.utils';
export type SellerRow = { id: string; tienda: string; legal: string; productos: string; estado: string };
export const SELLERS_ROWS = createMockRows<SellerRow>('s', Array.from({ length: 12 }, (_, i) => [`Tienda ${i + 1}`, `Comercial ${i + 1} SAC`, String(8 + i), 'Activo']), ['tienda', 'legal', 'productos', 'estado']);
