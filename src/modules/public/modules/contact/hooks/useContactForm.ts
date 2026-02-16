import { useForm } from "react-hook-form";
import { ContactFormData, contactFormSchema } from "../schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useContactForm = () => {
	const { control, formState: { isValid }, handleSubmit } = useForm<ContactFormData>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			reason: '',
			message: '',
		},
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = (data: ContactFormData) => {
		console.log(data);
	};

	return {
		control,
		isValid,
		handleSubmit: handleSubmit(onSubmit),
	};
};
