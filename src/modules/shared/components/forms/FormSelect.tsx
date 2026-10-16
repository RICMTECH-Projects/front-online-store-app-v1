"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/modules/shared/components/ui/select";

export type FormSelectOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export function FormSelect<
	TValues extends FieldValues,
	TContext = unknown,
	TOutput extends FieldValues = TValues,
>({
	control,
	name,
	label,
	options,
	placeholder = "Selecciona una opción",
	disabled,
	emptyValue,
	id: providedId,
	description,
	triggerClassName,
}: {
	control: Control<TValues, TContext, TOutput>;
	name: FieldPath<TValues>;
	label: string;
	options: FormSelectOption[];
	placeholder?: string;
	disabled?: boolean;
	emptyValue?: string;
	id?: string;
	description?: ReactNode;
	triggerClassName?: string;
}) {
	const generatedId = useId();
	const id = providedId ?? generatedId;
	const emptyOptionValue = "__form-select-empty__";

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<div className="grid gap-2">
					<label htmlFor={id} className="text-sm font-medium">
						{label}
					</label>
					<Select
						value={
							field.value === emptyValue || field.value === undefined
								? emptyOptionValue
								: String(field.value)
						}
						onValueChange={(value) =>
							field.onChange(
								value === emptyOptionValue ? (emptyValue ?? "") : value,
							)
						}
						disabled={disabled}
					>
						<SelectTrigger
							id={id}
							aria-invalid={fieldState.invalid}
							aria-describedby={description ? `${id}-description` : undefined}
							className={triggerClassName}
						>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							{emptyValue !== undefined && (
								<SelectItem value={emptyOptionValue}>{placeholder}</SelectItem>
							)}
							{options.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									disabled={option.disabled}
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{description && (
						<p
							id={`${id}-description`}
							className="text-xs text-muted-foreground"
						>
							{description}
						</p>
					)}
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
