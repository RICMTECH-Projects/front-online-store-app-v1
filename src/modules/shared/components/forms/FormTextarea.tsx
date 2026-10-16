"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Textarea } from "@/modules/shared/components/ui/textarea";

type FormTextareaProps<
	TValues extends FieldValues,
	TContext,
	TOutput extends FieldValues,
> = Omit<
	React.ComponentProps<typeof Textarea>,
	"name" | "value" | "defaultValue" | "onChange" | "onBlur"
> & {
	control: Control<TValues, TContext, TOutput>;
	name: FieldPath<TValues>;
	label: string;
	description?: ReactNode;
};

export function FormTextarea<
	TValues extends FieldValues,
	TContext = unknown,
	TOutput extends FieldValues = TValues,
>({
	control,
	name,
	label,
	description,
	id: providedId,
	...textareaProps
}: FormTextareaProps<TValues, TContext, TOutput>) {
	const generatedId = useId();
	const id = providedId ?? generatedId;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const errorId = fieldState.error ? `${id}-error` : undefined;
				const descriptionId = description ? `${id}-description` : undefined;
				return (
					<div className="grid gap-2">
						<label htmlFor={id} className="text-sm font-medium">
							{label}
						</label>
						<Textarea
							{...textareaProps}
							id={id}
							name={field.name}
							value={typeof field.value === "string" ? field.value : ""}
							onChange={field.onChange}
							onBlur={field.onBlur}
							ref={field.ref}
							aria-invalid={fieldState.invalid || textareaProps["aria-invalid"]}
							aria-describedby={
								[descriptionId, errorId].filter(Boolean).join(" ") || undefined
							}
						/>
						{description && (
							<p id={descriptionId} className="text-xs text-muted-foreground">
								{description}
							</p>
						)}
						{fieldState.error?.message && (
							<p id={errorId} role="alert" className="text-xs text-destructive">
								{fieldState.error.message}
							</p>
						)}
					</div>
				);
			}}
		/>
	);
}
