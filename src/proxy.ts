import { type NextRequest, NextResponse } from "next/server";
import { hasAuthSession } from "@/modules/auth/server/auth-session-request.server";

export const proxy = (request: NextRequest) => {
	if (hasAuthSession(request)) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/login", request.url));
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
	],
};
