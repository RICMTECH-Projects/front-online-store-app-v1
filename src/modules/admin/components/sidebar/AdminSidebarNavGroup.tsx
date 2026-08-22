import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/modules/shared/lib/utils';
import type { LucideIcon } from 'lucide-react';

type AdminSidebarNavGroupProps = { icon: LucideIcon; isOpen: boolean; items: readonly { href: string; label: string }[]; label: string; pathname: string };

export const AdminSidebarNavGroup = ({ icon: Icon, isOpen, items, label, pathname }: AdminSidebarNavGroupProps) => <details open={isOpen} className='group'><summary className={cn('flex h-11 cursor-pointer list-none items-center gap-3 rounded-md px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950', isOpen && 'text-zinc-950')}><Icon className='size-4' />{label}<ChevronDown className='ml-auto size-4 transition-transform duration-200 group-open:rotate-180' /></summary><div className='grid grid-rows-[0fr] opacity-0 transition-all duration-200 ease-out group-open:grid-rows-[1fr] group-open:opacity-100'><div className='ml-5 overflow-hidden border-l border-zinc-200'><div className='flex flex-col py-1'>{items.map((item) => <Link key={item.href} href={item.href} className={cn('px-3 py-2 text-sm transition-colors', pathname === item.href ? 'font-semibold text-zinc-950' : 'text-zinc-500 hover:text-zinc-950')}>{item.label}</Link>)}</div></div></div></details>;
