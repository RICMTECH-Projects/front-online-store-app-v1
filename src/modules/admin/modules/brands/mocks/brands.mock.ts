import { createMockRows } from '../../mocks.utils';
export type BrandRow = { id: string; nombre: string; slug: string; productos: string; estado: string };
export const BRANDS_ROWS = createMockRows<BrandRow>('b', Array.from({ length: 12 }, (_, i) => [`Marca ${i + 1}`, `marca-${i + 1}`, String(4 + i), 'Activo']), ['nombre', 'slug', 'productos', 'estado']);
