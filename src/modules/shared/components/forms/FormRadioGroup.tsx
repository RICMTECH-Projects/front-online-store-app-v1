"use client";

import { useId } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import {
	RadioGroup,
	RadioGroupItem,
} from "@/modules/shared/components/ui/radio-group";

export type FormRadioOption = {
	value: string;
	label: string;
	description?: string;
};

export function FormRadioGroup<
	TValues extends FieldValues,
	TContext = unknown,
	TOutput extends FieldValues = TValues,
>({
	control,
	name,
	label,
	options,
}: {
	control: Control<TValues, TContext, TOutput>;
	name: FieldPath<TValues>;
	label: string;
	options: FormRadioOption[];
}) {
	const id = useId();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<fieldset aria-invalid={fieldState.invalid}>
					<legend className="text-sm font-medium">{label}</legend>
					<RadioGroup
						value={String(field.value ?? "")}
						onValueChange={field.onChange}
						onBlur={field.onBlur}
						className="mt-3"
					>
						{options.map((option) => (
							<label
								key={option.value}
								htmlFor={`${id}-${option.value}`}
								className="flex cursor-pointer items-start gap-3 border p-4 has-data-[state=checked]:border-foreground has-data-[state=checked]:bg-muted/50"
							>
								<RadioGroupItem
									id={`${id}-${option.value}`}
									value={option.value}
									className="mt-0.5"
								/>
								<span>
									<span className="block font-medium">{option.label}</span>
									{option.description && (
										<span className="mt-1 block text-sm text-muted-foreground">
											{option.description}
										</span>
									)}
								</span>
							</label>
						))}
					</RadioGroup>
					{fieldState.error?.message && (
						<p role="alert" className="mt-2 text-sm text-destructive">
							{fieldState.error.message}
						</p>
					)}
				</fieldset>
			)}
		/>
	);
}
