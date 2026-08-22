import { NextResponse } from "next/server";
import { clearAuthSession } from "@/modules/auth/server/auth-session.server";

export const POST = () => {
	const response = NextResponse.json({
		data: null,
		message: "Sesion cerrada correctamente.",
		status: "SUCCESS",
	});

	return clearAuthSession(response);
};
