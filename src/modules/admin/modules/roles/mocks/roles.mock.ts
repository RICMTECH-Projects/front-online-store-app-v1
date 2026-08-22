import { createMockRows } from '../../mocks.utils';
export type RoleRow = { id: string; codigo: string; nombre: string; usuarios: string; estado: string };
export const ROLES_ROWS = createMockRows<RoleRow>('r', Array.from({ length: 12 }, (_, i) => [`ROL_${i + 1}`, `Rol ${i + 1}`, String(i + 1), 'Activo']), ['codigo', 'nombre', 'usuarios', 'estado']);
