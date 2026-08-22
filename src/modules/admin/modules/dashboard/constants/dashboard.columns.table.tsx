import type { ColumnDef } from '@tanstack/react-table';
import { AdminRowActions } from '@/modules/admin/components/table/AdminRowActions';
import { AdminTableStatusBadge } from '@/modules/admin/components/table/AdminTableStatusBadge';
import type { DashboardOrderRow } from '../mocks/dashboard.mock';

export const COLUMNS_DASHBOARD_ORDERS: ColumnDef<DashboardOrderRow>[] = [
	{ accessorKey: 'order', header: 'Pedido' },
	{ accessorKey: 'customer', header: 'Cliente' },
	{ accessorKey: 'total', header: 'Total' },
	{ accessorKey: 'status', header: 'Estado', cell: ({ row }) => <AdminTableStatusBadge>{row.original.status}</AdminTableStatusBadge> },
	{ id: 'actions', header: '', cell: () => <AdminRowActions /> },
];
