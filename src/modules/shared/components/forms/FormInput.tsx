"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Input } from "@/modules/shared/components/ui/input";

type FormInputProps<
	TValues extends FieldValues,
	TContext,
	TOutput extends FieldValues,
> = Omit<
	React.ComponentProps<typeof Input>,
	"name" | "value" | "defaultValue" | "onChange" | "onBlur"
> & {
	control: Control<TValues, TContext, TOutput>;
	name: FieldPath<TValues>;
	label: string;
	description?: string;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
};

export function FormInput<
	TValues extends FieldValues,
	TContext = unknown,
	TOutput extends FieldValues = TValues,
>({
	control,
	name,
	label,
	description,
	startAdornment,
	endAdornment,
	id: providedId,
	...inputProps
}: FormInputProps<TValues, TContext, TOutput>) {
	const generatedId = useId();
	const id = providedId ?? generatedId;
	const descriptionId = description ? `${id}-description` : undefined;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const errorId = fieldState.error ? `${id}-error` : undefined;
				const describedBy =
					[descriptionId, errorId].filter(Boolean).join(" ") || undefined;
				const value =
					typeof field.value === "string" || typeof field.value === "number"
						? field.value
						: "";

				return (
					<div className="grid gap-2">
						<label htmlFor={id} className="text-sm font-medium">
							{label}
						</label>
						<div className="relative">
							{startAdornment}
							<Input
								{...inputProps}
								id={id}
								name={field.name}
								value={value}
								onChange={field.onChange}
								onBlur={field.onBlur}
								ref={field.ref}
								aria-invalid={fieldState.invalid || inputProps["aria-invalid"]}
								aria-describedby={describedBy}
							/>
							{endAdornment}
						</div>
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
