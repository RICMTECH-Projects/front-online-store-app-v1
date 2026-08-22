import { createMockRows } from '../../mocks.utils';
export type CouponRow = { id: string; codigo: string; descuento: string; usos: string; estado: string };
export const COUPONS_ROWS = createMockRows<CouponRow>('co', Array.from({ length: 12 }, (_, i) => [`URBN${10 + i}`, `${10 + i}%`, String(i * 3), 'Activo']), ['codigo', 'descuento', 'usos', 'estado']);
