import { Eye, Pencil, Trash2 } from "lucide-react";

type AdminRowActionsProps = { onView?: () => void; onEdit?: () => void; onDelete?: () => void };

export const AdminRowActions = ({ onView, onEdit, onDelete }: AdminRowActionsProps) => (
	<div className="flex justify-end gap-1">
		<button
			type="button"
			aria-label="Ver registro"
			title="Ver registro"
			className="inline-flex size-8 items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
			onClick={onView}
		>
			<Eye className="size-4" />
		</button>
		<button
			type="button"
			aria-label="Editar registro"
			title="Editar registro"
			className="inline-flex size-8 items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
			onClick={onEdit}
		>
			<Pencil className="size-4" />
		</button>
		<button
			type="button"
			aria-label="Eliminar registro"
			title="Eliminar registro"
			className="inline-flex size-8 items-center justify-center text-zinc-500 hover:bg-red-50 hover:text-red-700"
			onClick={onDelete}
		>
			<Trash2 className="size-4" />
		</button>
	</div>
);
