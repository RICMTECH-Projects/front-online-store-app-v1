"use client";

import { useId } from "react";
import {
	type Control,
	Controller,
	type FieldPathByValue,
	type FieldValues,
} from "react-hook-form";
import { Checkbox } from "@/modules/shared/components/ui/checkbox";

export type FormCheckboxOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export function FormCheckboxGroup<
	TValues extends FieldValues,
	TContext = unknown,
	TOutput extends FieldValues = TValues,
>({
	control,
	name,
	legend,
	options,
	disabled,
	className,
}: {
	control: Control<TValues, TContext, TOutput>;
	name: FieldPathByValue<TValues, string[]>;
	legend: string;
	options: FormCheckboxOption[];
	disabled?: boolean;
	className?: string;
}) {
	const groupId = useId();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const selected = Array.isArray(field.value)
					? (field.value as string[])
					: [];
				return (
					<fieldset
						className="grid gap-2"
						aria-describedby={fieldState.error ? `${groupId}-error` : undefined}
					>
						<legend className="text-sm font-medium">{legend}</legend>
						<div className={className ?? "grid gap-2 sm:grid-cols-2"}>
							{options.map((option) => {
								const id = `${groupId}-${option.value}`;
								return (
									<div
										key={option.value}
										className="flex min-h-10 items-center gap-3 border border-border px-3 text-sm"
									>
										<Checkbox
											id={id}
											checked={selected.includes(option.value)}
											disabled={disabled || option.disabled}
											onBlur={field.onBlur}
											onCheckedChange={(checked) => {
												const next =
													checked === true
														? [...new Set([...selected, option.value])]
														: selected.filter(
																(value) => value !== option.value,
															);
												field.onChange(next);
											}}
										/>
										<label htmlFor={id} className="cursor-pointer">
											{option.label}
										</label>
									</div>
								);
							})}
						</div>
						{fieldState.error?.message && (
							<p
								id={`${groupId}-error`}
								role="alert"
								className="text-xs text-destructive"
							>
								{fieldState.error.message}
							</p>
						)}
					</fieldset>
				);
			}}
		/>
	);
}
