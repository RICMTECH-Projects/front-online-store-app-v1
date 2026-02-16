import {
	PhoneIcon,
	MailIcon,
	MapPinHouseIcon,
} from 'lucide-react';

type ContactItem = {
	id: number;
	icon: React.ElementType;
	label: string;
};

export const CONTACT_ITEMS: ContactItem[] = [
	{
		id: 1,
		icon: PhoneIcon,
		label: '22324-4222-4222',
	},
	{
		id: 2,
		icon: PhoneIcon,
		label: '+51 992 111 000',
	},
	{
		id: 3,
		icon: MailIcon,
		label: 'example@gmail.com',
	},
	{
		id: 4,
		icon: MapPinHouseIcon,
		label: 'Av. Siempre Viva, Calle 123',
	},
];