import { ADMIN_NAVIGATION } from '@/modules/admin/constants/admin-navigation.constants';
import { AdminSidebarNavGroup } from './AdminSidebarNavGroup';
import { AdminSidebarNavItem } from './AdminSidebarNavItem';

export const AdminSidebarNavigation = ({ pathname }: { pathname: string }) => <nav aria-label='Navegacion administrativa' className='flex flex-col gap-1 p-3'>{ADMIN_NAVIGATION.map((entry) => 'href' in entry ? <AdminSidebarNavItem key={entry.href} href={entry.href} icon={entry.icon} isActive={pathname === entry.href} label={entry.label} /> : <AdminSidebarNavGroup key={entry.label} icon={entry.icon} isOpen={entry.items.some((item) => pathname === item.href)} items={entry.items} label={entry.label} pathname={pathname} />)}</nav>;
