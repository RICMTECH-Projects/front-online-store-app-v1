import { createMockRows } from '../../mocks.utils';
export type UserRow = { id: string; nombre: string; correo: string; rol: string; estado: string };
export const USERS_ROWS = createMockRows<UserRow>('u', Array.from({ length: 12 }, (_, i) => [`Usuario ${i + 1}`, `usuario${i + 1}@urbnvoid.pe`, i % 2 ? 'Administrador' : 'Operador', 'Activo']), ['nombre', 'correo', 'rol', 'estado']);
