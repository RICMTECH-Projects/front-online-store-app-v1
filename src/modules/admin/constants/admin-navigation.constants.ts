import {
	BadgePercent,
	Boxes,
	ShieldCheck,
	Store,
	Truck,
	UsersRound,
} from "lucide-react";

export const ADMIN_NAVIGATION = [
	{ href: "/dashboard", label: "Resumen", icon: Boxes },
	{
		label: "Catalogo",
		icon: Store,
		items: [
			{ href: "/productos", label: "Productos" },
			{ href: "/marcas", label: "Marcas" },
			{ href: "/categorias", label: "Categorias" },
		],
	},
	{ href: "/vendedores", label: "Vendedores", icon: Truck },
	{
		label: "Identidad",
		icon: UsersRound,
		items: [
			{ href: "/usuarios", label: "Usuarios" },
			{ href: "/roles", label: "Roles" },
		],
	},
	{
		label: "Comercial",
		icon: BadgePercent,
		items: [{ href: "/cupones", label: "Cupones" }],
	},
	{
		label: "Operaciones",
		icon: ShieldCheck,
		items: [
			{ href: "/fulfillment", label: "Fulfillment" },
			{ href: "/envios", label: "Envios" },
		],
	},
] as const;
