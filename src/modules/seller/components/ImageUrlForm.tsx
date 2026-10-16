"use client";

import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { Button } from "@/modules/shared/components/ui/button";
import { useImageUrlForm } from "../hooks/use-image-url-form";

export function ImageUrlForm({
	disabled,
	pending,
	onAdd,
}: {
	disabled: boolean;
	pending: boolean;
	onAdd: (
		body: { url: string; altText?: string; position: number; primary: boolean },
		onSuccess: () => void,
	) => void;
}) {
	const { form, submit } = useImageUrlForm(onAdd);
	return (
		<form className="mt-7 border-t border-zinc-200 pt-5" onSubmit={submit}>
			<h4 className="font-medium">Añadir imagen por URL</h4>
			<div className="mt-4">
				<FormInput
					control={form.control}
					name="url"
					label="URL pública"
					type="url"
					required
					maxLength={1000}
					placeholder="https://…"
					disabled={disabled}
				/>
			</div>
			<div className="mt-4">
				<FormInput
					control={form.control}
					name="altText"
					label="Texto alternativo"
					maxLength={250}
					disabled={disabled}
				/>
			</div>
			<Button
				className="mt-4 w-full"
				variant="outline"
				type="submit"
				disabled={disabled}
			>
				{pending ? "Añadiendo…" : "Añadir imagen"}
			</Button>
		</form>
	);
}
