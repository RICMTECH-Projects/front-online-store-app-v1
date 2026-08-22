import { UserRound } from "lucide-react";
import Link from "next/link";

type AdminHeaderProfileLinkProps = {
	label: string;
};

export const AdminHeaderProfileLink = ({ label }: AdminHeaderProfileLinkProps) => (
	<Link
		href="/perfil"
		aria-label={label}
		title={label}
		className="inline-flex size-9 items-center justify-center text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
	>
		<UserRound className="size-5" />
	</Link>
);
