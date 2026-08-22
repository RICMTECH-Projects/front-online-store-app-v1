import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Input } from "@/modules/shared/components/ui/input";
import { cn } from "@/modules/shared/lib/utils";

type NativeInputProps = Omit<
	ComponentProps<typeof Input>,
	"name" | "value" | "defaultValue"
>;

type FormInputProps<TFieldValues extends FieldValues> = NativeInputProps & {
	control: Control<TFieldValues>;
	containerClassName?: string;
	endAdornment?: ReactNode;
	errorClassName?: string;
	inputClassName?: string;
	label?: ReactNode;
	labelClassName?: string;
	name: FieldPath<TFieldValues>;
	passwordToggle?: boolean;
};

export const FormInput = <TFieldValues extends FieldValues>({
	className,
	control,
	containerClassName,
	endAdornment,
	errorClassName,
	id,
	inputClassName,
	label,
	labelClassName,
	name,
	onBlur,
	onChange,
	passwordToggle = true,
	type,
	...inputProps
}: FormInputProps<TFieldValues>) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const inputId = id ?? name;
	const canTogglePassword = type === "password" && passwordToggle;
	const hasAdornment = Boolean(endAdornment) || canTogglePassword;
	const inputType = canTogglePassword && isPasswordVisible ? "text" : type;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<div className={cn("flex flex-col gap-2", containerClassName)}>
					{label && (
						<label
							htmlFor={inputId}
							className={cn(
								"text-sm font-medium text-foreground",
								labelClassName,
							)}
						>
							{label}
						</label>
					)}

					<div className={cn(hasAdornment && "relative")}>
						<Input
							{...inputProps}
							{...field}
							id={inputId}
							type={inputType}
							value={field.value ?? ""}
							className={cn(
								className,
								inputClassName,
								canTogglePassword && "pr-12",
							)}
							aria-invalid={Boolean(fieldState.error)}
							onBlur={(event) => {
								field.onBlur();
								onBlur?.(event);
							}}
							onChange={(event) => {
								field.onChange(event.target.value);
								onChange?.(event);
							}}
						/>
						{endAdornment}
						{canTogglePassword && (
							<button
								type="button"
								onClick={() => setIsPasswordVisible((visible) => !visible)}
								className="absolute right-3 top-1/2 min-h-10 min-w-10 -translate-y-1/2 p-2 text-muted-foreground transition-colors"
								aria-label={
									isPasswordVisible
										? "Ocultar contraseña"
										: "Mostrar contraseña"
								}
							>
								{isPasswordVisible ? (
									<EyeOff className="size-4" />
								) : (
									<Eye className="size-4" />
								)}
							</button>
						)}
					</div>

					{fieldState.error?.message && (
						<p className={cn("text-xs text-destructive", errorClassName)}>
							{fieldState.error.message}
						</p>
					)}
				</div>
			)}
		/>
	);
};
