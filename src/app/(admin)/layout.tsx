import type { ReactNode } from 'react';
import { AdminShell } from '@/modules/admin/components/AdminShell';

export default function AdminLayout({ children }: { children: ReactNode }) {
	return <AdminShell>{children}</AdminShell>;
}
