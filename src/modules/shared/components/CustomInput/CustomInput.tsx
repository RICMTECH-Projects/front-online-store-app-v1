import {
	Control,
	Controller,
	FieldValues,
	Path
} from 'react-hook-form';
import {
	Field,
	FieldError,
	FieldLabel,
} from '@/modules/shared/components/ui/field';
import { Input } from '@/modules/shared/components/ui/input';

interface CustomInputProps<
	TFieldValues extends FieldValues,
> extends React.ComponentPropsWithoutRef<'input'> {
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
	label?: string;
}

export const CustomInput = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	...props
}: CustomInputProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					{label && (
						<FieldLabel
							htmlFor={field.name}
							className='font-semibold'>
							{label}
						</FieldLabel>
					)}
					<Input
						{...field}
						{...props}
						id={field.name}
						aria-invalid={fieldState.invalid}
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};
