import { type NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES } from "@/modules/auth/constants/auth.const";
import { AUTH_TOKEN_COOKIE } from "@/modules/auth/constants/auth-cookie.constants";
import {
	getRequestAuthUser,
	hasAuthSession,
} from "@/modules/auth/server/auth-session-request.server";
import {
	canAccessAdminRoute,
	canAccessCustomerAccount,
	canAccessPasswordChange,
	getRoleHomeRoute,
	isGuestOnlyRoute,
} from "@/modules/auth/utils/auth-authorization";

const redirectToLogin = (request: NextRequest) => {
	const response = NextResponse.redirect(new URL("/login", request.url));
	response.cookies.delete(AUTH_TOKEN_COOKIE);

	return response;
};

const continueAsGuest = () => {
	const response = NextResponse.next();
	response.cookies.delete(AUTH_TOKEN_COOKIE);

	return response;
};

export const proxy = async (request: NextRequest) => {
	const pathname = request.nextUrl.pathname;
	const isGuestRoute = isGuestOnlyRoute(pathname);

	if (!hasAuthSession(request)) {
		return isGuestRoute ? NextResponse.next() : redirectToLogin(request);
	}

	const user = await getRequestAuthUser(request);

	if (user === undefined) {
		return isGuestRoute
			? NextResponse.next()
			: NextResponse.redirect(new URL("/servicio-no-disponible", request.url));
	}

	if (!user) {
		return isGuestRoute ? continueAsGuest() : redirectToLogin(request);
	}

	if (isGuestRoute) {
		return NextResponse.redirect(
			new URL(getRoleHomeRoute(user.roles), request.url),
		);
	}

	if (pathname === `${AUTH_ROUTES.account}/seguridad`) {
		return canAccessPasswordChange(user.roles)
			? NextResponse.next()
			: NextResponse.rewrite(new URL("/_not-found", request.url));
	}

	if (
		pathname === AUTH_ROUTES.account ||
		pathname.startsWith(`${AUTH_ROUTES.account}/`)
	) {
		return canAccessCustomerAccount(user.roles)
			? NextResponse.next()
			: NextResponse.redirect(
					new URL(getRoleHomeRoute(user.roles), request.url),
				);
	}

	if (pathname === "/checkout" || pathname.startsWith("/checkout/")) {
		return canAccessCustomerAccount(user.roles)
			? NextResponse.next()
			: NextResponse.redirect(
					new URL(getRoleHomeRoute(user.roles), request.url),
				);
	}

	if (pathname === "/vendedor" || pathname.startsWith("/vendedor/")) {
		return user.roles.includes("SELLER")
			? NextResponse.next()
			: NextResponse.rewrite(new URL("/_not-found", request.url));
	}

	return canAccessAdminRoute(pathname, user.roles)
		? NextResponse.next()
		: NextResponse.rewrite(new URL("/_not-found", request.url));
};

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/productos/:path*",
		"/marcas/:path*",
		"/categorias/:path*",
		"/vendedores/:path*",
		"/usuarios/:path*",
		"/roles/:path*",
		"/cupones/:path*",
		"/fulfillment/:path*",
		"/envios/:path*",
		"/perfil/:path*",
		"/mi-cuenta/:path*",
		"/checkout/:path*",
		"/vendedor/:path*",
		"/login/:path*",
		"/registro/:path*",
	],
};
