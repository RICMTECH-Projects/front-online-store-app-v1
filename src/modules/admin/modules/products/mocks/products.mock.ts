import { createMockRows } from '../../mocks.utils';
export type ProductRow = { id: string; nombre: string; sku: string; marca: string; precio: string; estado: string };
export const PRODUCTS_ROWS = createMockRows<ProductRow>('p', Array.from({ length: 12 }, (_, i) => [`Prenda urbana ${i + 1}`, `URB-${100 + i}`, i % 2 ? 'VOID' : 'URBN', `S/ ${(89 + i * 10).toFixed(2)}`, i % 3 ? 'Activo' : 'Borrador']), ['nombre', 'sku', 'marca', 'precio', 'estado']);
