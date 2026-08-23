export const USER_ROLES = ["ADMIN", "CUSTOMER", "SELLER"] as const;

export type UserRole = (typeof USER_ROLES)[number];

type RouteAccess = {
	path: string;
	roles: readonly UserRole[];
};

export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
	ADMIN: "/dashboard",
	CUSTOMER: "/",
	SELLER: "/dashboard",
};

export const GUEST_ONLY_ROUTES = ["/login", "/registro"] as const;

export const ADMIN_ROUTE_ACCESS: readonly RouteAccess[] = [
	{ path: "/dashboard", roles: ["ADMIN", "SELLER"] },
	{ path: "/productos", roles: ["ADMIN", "SELLER"] },
	{ path: "/marcas", roles: ["ADMIN", "SELLER"] },
	{ path: "/categorias", roles: ["ADMIN", "SELLER"] },
	{ path: "/fulfillment", roles: ["ADMIN", "SELLER"] },
	{ path: "/envios", roles: ["ADMIN", "SELLER"] },
	{ path: "/perfil", roles: ["ADMIN"] },
	{ path: "/vendedores", roles: ["ADMIN"] },
	{ path: "/usuarios", roles: ["ADMIN"] },
	{ path: "/roles", roles: ["ADMIN"] },
	{ path: "/cupones", roles: ["ADMIN"] },
];
