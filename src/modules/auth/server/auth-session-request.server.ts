import type { NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../constants/auth-cookie.constants";

export const hasAuthSession = (request: NextRequest) =>
	request.cookies.has(AUTH_TOKEN_COOKIE);
