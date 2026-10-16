"use client";

import { useId } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";

export function FormCheckbox<
	TValues extends FieldValues,
	TContext = unknown,
	TOutput extends FieldValues = TValues,
>({
	control,
	name,
	label,
	disabled,
}: {
	control: Control<TValues, TContext, TOutput>;
	name: FieldPath<TValues>;
	label: string;
	disabled?: boolean;
}) {
	const id = useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<div className="grid gap-1">
					<div className="flex min-h-10 items-center gap-3">
						<Checkbox
							id={id}
							name={field.name}
							checked={Boolean(field.value)}
							onCheckedChange={(checked) => field.onChange(checked === true)}
							onBlur={field.onBlur}
							ref={field.ref}
							disabled={disabled}
							aria-invalid={fieldState.invalid}
						/>
						<label htmlFor={id} className="text-sm font-medium">
							{label}
						</label>
					</div>
					{fieldState.error?.message && (
						<p role="alert" className="text-xs text-destructive">
							{fieldState.error.message}
						</p>
					)}
				</div>
			)}
		/>
	);
}
