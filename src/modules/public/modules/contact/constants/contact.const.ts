import {
	ClockIcon,
	type LucideIcon,
	MailIcon,
	MapPinHouseIcon,
	MessageCircleIcon,
	PhoneIcon,
} from "lucide-react";

type ContactItem = {
	id: number;
	icon: LucideIcon;
	label: string;
	value: string;
	helper: string;
	href?: string;
};

export const CONTACT_ITEMS: ContactItem[] = [
	{
		id: 1,
		icon: MessageCircleIcon,
		label: "WhatsApp",
		value: "+51 992 111 000",
		helper: "Respuesta rapida para pedidos y cambios.",
		href: "https://wa.me/51992111000",
	},
	{
		id: 2,
		icon: PhoneIcon,
		label: "Telefono",
		value: "22324-4222-4222",
		helper: "Atencion de lunes a sabado.",
		href: "tel:2232442224222",
	},
	{
		id: 3,
		icon: MailIcon,
		label: "Correo",
		value: "example@gmail.com",
		helper: "Soporte, colaboraciones y consultas mayoristas.",
		href: "mailto:example@gmail.com",
	},
	{
		id: 4,
		icon: MapPinHouseIcon,
		label: "Showroom",
		value: "Av. Siempre Viva, Calle 123",
		helper: "Recojo y asesoria presencial con cita.",
	},
	{
		id: 5,
		icon: ClockIcon,
		label: "Horario",
		value: "Lun - Sab, 10:00 a 19:00",
		helper: "Los mensajes fuera de horario se atienden al dia siguiente.",
	},
];
