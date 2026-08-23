import { Store } from "lucide-react";
import Link from "next/link";

type AdminHeaderStoreLinkProps = {
	label: string;
};

export const AdminHeaderStoreLink = ({ label }: AdminHeaderStoreLinkProps) => (
	<Link
		href="/"
		aria-label={label}
		title={label}
		className="inline-flex size-9 items-center justify-center text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
	>
		<Store className="size-5" aria-hidden="true" />
	</Link>
);
