import { cn } from "@/modules/shared/lib/utils";

type AdminTableStatusBadgeProps = {
	children: string;
};

export const AdminTableStatusBadge = ({ children }: AdminTableStatusBadgeProps) => (
	<span
		className={cn(
			"inline-flex border px-2 py-1 text-xs font-medium",
			children === "Activo"
				? "border-emerald-200 bg-emerald-50 text-emerald-800"
				: "border-zinc-200 bg-zinc-100 text-zinc-700",
		)}
	>
		{children}
	</span>
);
