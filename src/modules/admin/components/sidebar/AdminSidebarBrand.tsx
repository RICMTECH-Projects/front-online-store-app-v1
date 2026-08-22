import Link from 'next/link';
import { ADMIN_BRAND } from '@/modules/admin/constants/admin-layout.constants';

export const AdminSidebarBrand = () => <Link href='/' className='flex h-16 items-center border-b border-zinc-200 px-6 font-anton text-2xl tracking-widest text-zinc-950'>{ADMIN_BRAND}</Link>;
