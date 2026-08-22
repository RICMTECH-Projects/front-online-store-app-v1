import { createMockRows } from '../../mocks.utils';
export type CategoryRow = { id: string; nombre: string; padre: string; productos: string; estado: string };
export const CATEGORIES_ROWS = createMockRows<CategoryRow>('c', Array.from({ length: 12 }, (_, i) => [`Categoria ${i + 1}`, i % 2 ? 'Ropa' : '-', String(i + 2), 'Activo']), ['nombre', 'padre', 'productos', 'estado']);
