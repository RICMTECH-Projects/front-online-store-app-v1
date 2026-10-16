import {
	ADMIN_ROUTE_ACCESS,
	GUEST_ONLY_ROUTES,
	ROLE_HOME_ROUTES,
	type UserRole,
} from "../constants/auth-authorization.constants";

const toUserRoles = (roles: string[]) =>
	roles.filter((role): role is UserRole => role in ROLE_HOME_ROUTES);

export const getRoleHomeRoute = (roles: string[]) => {
	const userRoles = toUserRoles(roles);

	return userRoles.includes("ADMIN")
		? ROLE_HOME_ROUTES.ADMIN
		: userRoles.includes("SELLER")
			? ROLE_HOME_ROUTES.SELLER
			: ROLE_HOME_ROUTES.CUSTOMER;
};

export const canAccessAdminRoute = (pathname: string, roles: string[]) => {
	const rule = ADMIN_ROUTE_ACCESS.find(
		({ path }) => pathname === path || pathname.startsWith(`${path}/`),
	);

	return rule
		? roles.some((role) => rule.roles.includes(role as UserRole))
		: false;
};

export const canAccessCustomerAccount = (roles: string[]) =>
	roles.includes("CUSTOMER");

export const canAccessPasswordChange = (roles: string[]) =>
	roles.includes("CUSTOMER") || roles.includes("ADMIN");

export const isGuestOnlyRoute = (pathname: string) =>
	GUEST_ONLY_ROUTES.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`),
	);
