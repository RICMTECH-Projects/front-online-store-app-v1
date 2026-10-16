export const USER_ROLES = ["ADMIN", "CUSTOMER", "SELLER"] as const;

export type UserRole = (typeof USER_ROLES)[number];

type RouteAccess = {
	path: string;
	roles: readonly UserRole[];
};

export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
	ADMIN: "/dashboard",
	CUSTOMER: "/",
	SELLER: "/vendedor",
};

export const GUEST_ONLY_ROUTES = ["/login", "/registro"] as const;

export const ADMIN_ROUTE_ACCESS: readonly RouteAccess[] = [
	{ path: "/dashboard", roles: ["ADMIN"] },
	{ path: "/productos", roles: ["ADMIN"] },
	{ path: "/marcas", roles: ["ADMIN"] },
	{ path: "/categorias", roles: ["ADMIN"] },
	{ path: "/fulfillment", roles: ["ADMIN"] },
	{ path: "/envios", roles: ["ADMIN"] },
	{ path: "/perfil", roles: ["ADMIN"] },
	{ path: "/vendedores", roles: ["ADMIN"] },
	{ path: "/usuarios", roles: ["ADMIN"] },
	{ path: "/roles", roles: ["ADMIN"] },
	{ path: "/cupones", roles: ["ADMIN"] },
];
