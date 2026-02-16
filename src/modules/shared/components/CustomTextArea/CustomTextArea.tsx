import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

interface CustomTextAreaProps<
	TFieldValues extends FieldValues,
> extends React.ComponentPropsWithoutRef<'textarea'> {
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
	label?: string;
}

export const CustomTextArea = <TFieldValues extends FieldValues>({
	control,
	name,
	label,
	...props
}: CustomTextAreaProps<TFieldValues>) => {
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
					<Textarea
						{...field}
						{...props}
						id='form-rhf-textarea-about'
						aria-invalid={fieldState.invalid}
						className='min-h-30 resize-none'
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};
